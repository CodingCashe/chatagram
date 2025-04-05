import { type NextRequest, NextResponse } from "next/server"
import { onCurrentUser } from "@/actions/user"
import { writeFile } from "fs/promises"
import { join } from "path"
import * as XLSX from "xlsx"
import { client } from "@/lib/prisma"
import { InfluencerSource, InfluencerStatus } from "@prisma/client"

export async function POST(request: NextRequest) {
  const user = await onCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const importOption = formData.get("importOption") as string
    const enrichData = formData.get("enrichData") === "true"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Save file temporarily
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const tempPath = join("/tmp", file.name)
    await writeFile(tempPath, buffer)

    // Parse the file
    const workbook = XLSX.readFile(tempPath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet)

    // Process the data
    const importResults = {
      total: data.length,
      added: 0,
      updated: 0,
      failed: 0,
      errors: [] as string[],
    }

    for (const row of data) {
      try {
        const influencerData = {
          name: (row as any).Name || (row as any).name,
          username: ((row as any).Username || (row as any).username || (row as any).Instagram || (row as any).instagram || "").toString().replace('@', ''),
          bio: (row as any).Bio || (row as any).bio || (row as any).Description || (row as any).description,
          followers: parseInt((row as any).Followers || (row as any).followers || 0),
          following: parseInt((row as any).Following || (row as any).following || 0),
          postsCount: parseInt((row as any).Posts || (row as any).posts || (row as any)["Posts Count"] || (row as any).postsCount || 0),
          engagementRate: parseFloat((row as any)["Engagement Rate"] || (row as any).engagementRate || (row as any).engagement || 0),
          verified: Boolean((row as any).Verified || (row as any).verified),
          location: (row as any).Location || (row as any).location,
          niche: (row as any).Niche || (row as any).niche || (row as any).Category || (row as any).category,
          email: (row as any).Email || (row as any).email,
          website: (row as any).Website || (row as any).website,
          notes: (row as any).Notes || (row as any).notes,
          tags: (row as any).Tags || (row as any).tags ? ((row as any).Tags || (row as any).tags).toString().split(',').map((t: string) => t.trim()) : [],
          source: "IMPORT" as InfluencerSource,
          status: "IDENTIFIED" as InfluencerStatus,
          userId: user.id,
        }
        
        // Check if influencer already exists
        const existingInfluencer = influencerData.username
          ? await client.influencer.findFirst({
              where: {
                userId: user.id,
                username: influencerData.username,
              },
            })
          : null

        if (existingInfluencer) {
          if (importOption === "add") {
            // Skip existing influencers
            continue
          } else if (importOption === "update") {
            // Update existing influencer
            await client.influencer.update({
              where: { id: existingInfluencer.id },
              data: influencerData,
            })
            importResults.updated++
          }
        } else {
          // Add new influencer
          await client.influencer.create({
            data: influencerData,
          })
          importResults.added++
        }
      } catch (error: any) {
        console.error("Error processing row:", error)
        importResults.failed++
        importResults.errors.push(`Row ${importResults.added + importResults.updated + importResults.failed}: ${error.message}`)
      }
    }

    // Create import history record
    await client.importHistory.create({
      data: {
        userId: user.id,
        fileName: file.name,
        recordsTotal: importResults.total,
        recordsAdded: importResults.added,
        recordsUpdated: importResults.updated,
        recordsFailed: importResults.failed,
        errors: importResults.errors,
        importOption,
        enrichData,
      },
    })

    return NextResponse.json(importResults)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const user = await onCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const importHistory = await client.importHistory.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(importHistory)
  } catch (error) {
    console.error("Error fetching import history:", error)
    return NextResponse.json({ error: "Failed to fetch import history" }, { status: 500 })
  }
}

