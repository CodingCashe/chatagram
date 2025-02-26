import * as cheerio from "cheerio"

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    // Fetch the website content
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract basic information
    const title = $("title").text()
    const description = $('meta[name="description"]').attr("content") || ""
    const h1s = $("h1")
      .map((_, el) => $(el).text())
      .get()
    const paragraphs = $("p")
      .map((_, el) => $(el).text())
      .get()

    // Analyze the content
    const analysis = {
      name: title.split("|")[0].trim(),
      description: description || paragraphs[0] || "Business description not found",
      type: determineBusinessType(html),
      highlights: extractHighlights($),
    }

    return Response.json(analysis)
  } catch (error) {
    return Response.json({ error: "Failed to analyze website" }, { status: 500 })
  }
}

function determineBusinessType(html: string): string {
  const lowercase = html.toLowerCase()

  if (lowercase.includes("shop") || lowercase.includes("store") || lowercase.includes("product")) {
    return "E-commerce"
  } else if (lowercase.includes("course") || lowercase.includes("learn") || lowercase.includes("training")) {
    return "Education"
  } else if (lowercase.includes("service") || lowercase.includes("consulting")) {
    return "Service Provider"
  } else if (lowercase.includes("blog") || lowercase.includes("content") || lowercase.includes("influencer")) {
    return "Creator/Influencer"
  } else {
    return "General Business"
  }
}

function extractHighlights($: cheerio.CheerioAPI): string[] {
  const highlights: string[] = []

  // Extract features/benefits from lists
  $("ul li, ol li").each((_, el) => {
    const text = $(el).text().trim()
    if (text.length > 10 && text.length < 100) {
      highlights.push(text)
    }
  })

  // Extract key phrases from headings
  $("h2, h3").each((_, el) => {
    const text = $(el).text().trim()
    if (text.length > 10 && text.length < 100) {
      highlights.push(text)
    }
  })

  // Limit to 5 most relevant highlights
  return highlights
    .filter((highlight) => !highlight.toLowerCase().includes("cookie") && !highlight.toLowerCase().includes("privacy"))
    .slice(0, 5)
}

