// import * as cheerio from "cheerio"

// export async function POST(req: Request) {
//   try {
//     const { url } = await req.json()

//     // Fetch the website content
//     const response = await fetch(url)
//     const html = await response.text()
//     const $ = cheerio.load(html)

//     // Extract basic information
//     const title = $("title").text()
//     const description = $('meta[name="description"]').attr("content") || ""
//     const h1s = $("h1")
//       .map((_, el) => $(el).text())
//       .get()
//     const paragraphs = $("p")
//       .map((_, el) => $(el).text())
//       .get()

//     // Analyze the content
//     const analysis = {
//       name: title.split("|")[0].trim(),
//       description: description || paragraphs[0] || "Business description not found",
//       type: determineBusinessType(html),
//       highlights: extractHighlights($),
//     }

//     return Response.json(analysis)
//   } catch (error) {
//     return Response.json({ error: "Failed to analyze website" }, { status: 500 })
//   }
// }

// function determineBusinessType(html: string): string {
//   const lowercase = html.toLowerCase()

//   if (lowercase.includes("shop") || lowercase.includes("store") || lowercase.includes("product")) {
//     return "E-commerce"
//   } else if (lowercase.includes("course") || lowercase.includes("learn") || lowercase.includes("training")) {
//     return "Education"
//   } else if (lowercase.includes("service") || lowercase.includes("consulting")) {
//     return "Service Provider"
//   } else if (lowercase.includes("blog") || lowercase.includes("content") || lowercase.includes("influencer")) {
//     return "Creator/Influencer"
//   } else {
//     return "General Business"
//   }
// }

// function extractHighlights($: cheerio.CheerioAPI): string[] {
//   const highlights: string[] = []

//   // Extract features/benefits from lists
//   $("ul li, ol li").each((_, el) => {
//     const text = $(el).text().trim()
//     if (text.length > 10 && text.length < 100) {
//       highlights.push(text)
//     }
//   })

//   // Extract key phrases from headings
//   $("h2, h3").each((_, el) => {
//     const text = $(el).text().trim()
//     if (text.length > 10 && text.length < 100) {
//       highlights.push(text)
//     }
//   })

//   // Limit to 5 most relevant highlights
//   return highlights
//     .filter((highlight) => !highlight.toLowerCase().includes("cookie") && !highlight.toLowerCase().includes("privacy"))
//     .slice(0, 5)
// }

import { NextResponse } from "next/server"
import puppeteer from "puppeteer"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Launch headless browser
    const browser = await puppeteer.launch({
      headless: true as any, // Use type assertion to avoid TypeScript error
    })

    const page = await browser.newPage()

    // Set viewport size
    await page.setViewport({ width: 1280, height: 800 })

    // Navigate to the URL
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 })

    // Take a screenshot
    const screenshot = await page.screenshot({
      encoding: "base64",
      type: "jpeg",
      quality: 80,
    })

    // Extract page content
    const pageContent = await page.evaluate(() => {
      // Get meta description
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || ""

      // Get main content text
      const bodyText = document.body.innerText.substring(0, 5000) // Limit to 5000 chars

      // Get headings
      const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
        .map((h) => h.textContent)
        .filter(Boolean)
        .join("\n")

      return {
        title: document.title,
        metaDescription,
        headings,
        bodyText,
      }
    })

    await browser.close()

    // Analyze the website content with OpenAI
    const analysisPrompt = `
      Analyze this website content and provide the following information:
      
      Website Title: ${pageContent.title}
      Meta Description: ${pageContent.metaDescription}
      Main Headings: ${pageContent.headings}
      Page Content: ${pageContent.bodyText.substring(0, 2000)}...
      
      Based on this information:
      1. What type of business is this website for? (e.g., E-commerce, SaaS, Restaurant, etc.)
      2. Generate a list of 7-10 relevant keywords that customers might use when asking about this business.
      3. Create a helpful automated response template (150-200 words) that this business could use to respond to customer inquiries.
      
      Format your response as JSON with the following structure:
      {
        "businessType": "string",
        "suggestedKeywords": ["string", "string", ...],
        "suggestedResponse": "string"
      }
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: analysisPrompt,
    })

    // Parse the JSON response from OpenAI
    const analysisResult = JSON.parse(text)

    // Convert the screenshot to a data URL
    const screenshotDataUrl = `data:image/jpeg;base64,${screenshot}`

    // Return the analysis results
    return NextResponse.json({
      businessType: analysisResult.businessType,
      suggestedKeywords: analysisResult.suggestedKeywords,
      suggestedResponse: analysisResult.suggestedResponse,
      screenshot: screenshotDataUrl,
    })
  } catch (error) {
    console.error("Error analyzing website:", error)
    return NextResponse.json({ error: "Failed to analyze website" }, { status: 500 })
  }
}

