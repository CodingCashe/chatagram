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

// import { NextResponse } from "next/server"
// import puppeteer from "puppeteer"
// import { generateText } from "ai"
// import { openai } from "@ai-sdk/openai"

// export async function POST(request: Request) {
//   try {
//     const { url } = await request.json()

//     if (!url) {
//       return NextResponse.json({ error: "URL is required" }, { status: 400 })
//     }

//     // Launch headless browser
//     const browser = await puppeteer.launch({
//       headless: true as any, // Use type assertion to avoid TypeScript error
//     })

//     const page = await browser.newPage()

//     // Set viewport size
//     await page.setViewport({ width: 1280, height: 800 })

//     // Navigate to the URL
//     await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 })

//     // Take a screenshot
//     const screenshot = await page.screenshot({
//       encoding: "base64",
//       type: "jpeg",
//       quality: 80,
//     })

//     // Extract page content
//     const pageContent = await page.evaluate(() => {
//       // Get meta description
//       const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || ""

//       // Get main content text
//       const bodyText = document.body.innerText.substring(0, 5000) // Limit to 5000 chars

//       // Get headings
//       const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
//         .map((h) => h.textContent)
//         .filter(Boolean)
//         .join("\n")

//       return {
//         title: document.title,
//         metaDescription,
//         headings,
//         bodyText,
//       }
//     })

//     await browser.close()

//     // Analyze the website content with OpenAI
//     const analysisPrompt = `
//       Analyze this website content and provide the following information:
      
//       Website Title: ${pageContent.title}
//       Meta Description: ${pageContent.metaDescription}
//       Main Headings: ${pageContent.headings}
//       Page Content: ${pageContent.bodyText.substring(0, 2000)}...
      
//       Based on this information:
//       1. What type of business is this website for? (e.g., E-commerce, SaaS, Restaurant, etc.)
//       2. Generate a list of 7-10 relevant keywords that customers might use when asking about this business.
//       3. Create a helpful automated response template (150-200 words) that this business could use to respond to customer inquiries.
      
//       Format your response as JSON with the following structure:
//       {
//         "businessType": "string",
//         "suggestedKeywords": ["string", "string", ...],
//         "suggestedResponse": "string"
//       }
//     `

//     const { text } = await generateText({
//       model: openai("gpt-4o"),
//       prompt: analysisPrompt,
//     })

//     // Parse the JSON response from OpenAI
//     const analysisResult = JSON.parse(text)

//     // Convert the screenshot to a data URL
//     const screenshotDataUrl = `data:image/jpeg;base64,${screenshot}`

//     // Return the analysis results
//     return NextResponse.json({
//       businessType: analysisResult.businessType,
//       suggestedKeywords: analysisResult.suggestedKeywords,
//       suggestedResponse: analysisResult.suggestedResponse,
//       screenshot: screenshotDataUrl,
//     })
//   } catch (error) {
//     console.error("Error analyzing website:", error)
//     return NextResponse.json({ error: "Failed to analyze website" }, { status: 500 })
//   }
// }

// import { NextResponse } from "next/server";
// // import puppeteer from "puppeteer";
// import puppeteer from 'puppeteer-core';
// import chrome from '@sparticuz/chrome-aws-lambda';
// import { generateText } from "ai";
// import { openai } from "@ai-sdk/openai";
// import { JSDOM } from "jsdom";
// // import { Readability } from "readability-dom";
// import { Readability } from '@mozilla/readability';
// import natural from "natural";

// // Initialize NLP tools
// const { WordTokenizer, PorterStemmer } = natural;
// const tokenizer = new WordTokenizer();
// const stemmer = PorterStemmer;

// export async function POST(request: Request) {
//   try {
//     const { url } = await request.json();

//     if (!url) {
//       return NextResponse.json({ error: "URL is required" }, { status: 400 });
//     }

  
//     const browser = await puppeteer.launch({
//       args: chrome.args,
//       executablePath: await chrome.executablePath,
//       headless: chrome.headless,
//     });

//     const page = await browser.newPage();
//     await page.setViewport({ width: 1280, height: 800 });
//     await page.setExtraHTTPHeaders({
//       'Accept-Language': 'en-US,en;q=0.9',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//     });

//     // Navigate to page with error handling
//     try {
//       await page.goto(url.startsWith('http') ? url : `https://${url}`, {
//         waitUntil: "networkidle2",
//         timeout: 30000
//       });
//     } catch (navError) {
//       console.warn("Navigation timeout, proceeding with available content");
//     }

//     // Capture screenshot
//     const screenshot = await page.screenshot({
//       encoding: "base64",
//       type: "jpeg",
//       quality: 80,
//     });
//     const screenshotDataUrl = `data:image/jpeg;base64,${screenshot}`;

//     // Extract content with multiple methods
//     const pageContent = await page.evaluate(() => {
//       const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
//       const bodyText = document.body.innerText.substring(0, 5000);
//       const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
//         .map((h) => h.textContent)
//         .filter(Boolean)
//         .join("\n");

//       return {
//         title: document.title,
//         metaDescription,
//         headings,
//         bodyText,
//         html: document.documentElement.innerHTML,
//       };
//     });

//     // Enhanced content extraction using Readability
//     const dom = new JSDOM(pageContent.html);
//     const reader = new Readability(dom.window.document);
//     const article = reader.parse()?.textContent || pageContent.bodyText;

//     // Extract business information
//     const businessInfo = extractBusinessInfo(pageContent, article);

//     // Generate basic analysis (works without OpenAI)
//     const basicAnalysis = generateBasicAnalysis(pageContent, businessInfo);

//     // Try OpenAI analysis if available, otherwise use basic
//     let enhancedAnalysis = null;
//     try {
//       enhancedAnalysis = await generateOpenAIAnalysis(pageContent);
//     } catch (aiError) {
//       console.warn("OpenAI analysis failed, using basic analysis:", aiError);
//     }

//     await browser.close();

//     // Return combined results
//     return NextResponse.json({
//       // Basic analysis (always available)
//       ...basicAnalysis,
//       // Enhanced analysis (if available)
//       ...(enhancedAnalysis || {}),
//       // Raw data
//       screenshot: screenshotDataUrl,
//       metadata: {
//         title: pageContent.title,
//         description: pageContent.metaDescription,
//         headings: pageContent.headings,
//       },
//       businessInfo,
//       // Status indicators
//       analysisSource: enhancedAnalysis ? "openai+local" : "local",
//     });

//   } catch (error) {
//     console.error("Error analyzing website:", error);
//     return NextResponse.json(
//       { error: "Failed to analyze website" }, 
//       { status: 500 }
//     );
//   }
// }

// // Business information extraction
// function extractBusinessInfo(pageContent: any, articleText: string) {
//   // Phone and email patterns
//   const phoneRegex = /(\+?\d{1,2}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/g;
//   const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  
//   // Extract contact info
//   // const phones = [...new Set([
//   //   ...(pageContent.bodyText.match(phoneRegex) || []),
//   //   ...(articleText.match(phoneRegex) || [])
//   // ])];

//   // const emails = [...new Set([
//   //   ...(pageContent.bodyText.match(emailRegex) || []),
//   //   ...(articleText.match(emailRegex) || [])
//   // ])];
//   // For phones
// const phoneMatches = [
//   ...(pageContent.bodyText.match(phoneRegex) || []),
//   ...(articleText.match(phoneRegex) || [])
// ];
// const phones = Array.from(new Set(phoneMatches));

// // For emails
// const emailMatches = [
//   ...(pageContent.bodyText.match(emailRegex) || []),
//   ...(articleText.match(emailRegex) || [])
// ];
// const emails = Array.from(new Set(emailMatches));

//   // Extract services using NLP
//   const services = extractServices(pageContent.bodyText + " " + articleText);

//   return {
//     phones,
//     emails,
//     services,
//     contentSummary: articleText.substring(0, 1000) + (articleText.length > 1000 ? "..." : ""),
//   };
// }

// // NLP-based service extraction
// function extractServices(text: string) {
//   const tokens = tokenizer.tokenize(text) || [];
//   const stems = tokens.map(token => stemmer.stem(token));
  
//   const businessTerms = [
//     'service', 'product', 'solution', 'offer', 
//     'provide', 'deliver', 'create', 'build'
//   ];
  
//   const serviceKeywords = [
//     'design', 'develop', 'consult', 'manage',
//     'install', 'repair', 'sell', 'market'
//   ];

//   const services: string[] = [];
  
//   stems.forEach((stem, i) => {
//     if (businessTerms.includes(stem) || serviceKeywords.includes(stem)) {
//       const start = Math.max(0, i - 3);
//       const end = Math.min(stems.length, i + 4);
//       const phrase = tokens.slice(start, end).join(' ');
      
//       if (!services.includes(phrase)) {
//         services.push(phrase);
//       }
//     }
//   });

//   return services.slice(0, 10); // Limit to top 10 services
// }

// // Generate basic analysis without OpenAI
// function generateBasicAnalysis(pageContent: any, businessInfo: any) {
//   const domain = new URL(pageContent.url || '').hostname.replace('www.', '');
//   const name = pageContent.title.split('|')[0].split('-')[0].trim();

//   // Generate basic keywords from content
//   const contentWords = (pageContent.bodyText + " " + pageContent.headings).toLowerCase();
//   const wordCounts: Record<string, number> = {};
//   contentWords.split(/\s+/).forEach(word => {
//     if (word.length > 4) { // Ignore short words
//       wordCounts[word] = (wordCounts[word] || 0) + 1;
//     }
//   });
  
//   const suggestedKeywords = Object.entries(wordCounts)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 10)
//     .map(([word]) => word);

//   // Generate basic response template
//   let suggestedResponse = `Thank you for your interest in ${name || 'our business'}. `;
//   if (businessInfo.services.length > 0) {
//     suggestedResponse += `We specialize in ${businessInfo.services.slice(0, 3).join(', ')}. `;
//   }
//   suggestedResponse += `Please feel free to contact us at ${businessInfo.emails[0] || 'our contact email'} `;
//   suggestedResponse += `or call us at ${businessInfo.phones[0] || 'our phone number'} for more information.`;

//   return {
//     businessType: guessBusinessType(pageContent, businessInfo),
//     suggestedKeywords,
//     suggestedResponse,
//     isBasicAnalysis: true,
//   };
// }

// // Simple business type classifier
// function guessBusinessType(pageContent: any, businessInfo: any) {
//   const content = (pageContent.bodyText + pageContent.headings).toLowerCase();
  
//   const indicators = {
//     ecommerce: ['shop', 'store', 'cart', 'checkout', 'buy now'],
//     saas: ['software', 'subscription', 'pricing', 'free trial'],
//     restaurant: ['menu', 'reservation', 'delivery', 'cuisine'],
//     service: ['service', 'repair', 'install', 'maintenance'],
//   };

//   for (const [type, terms] of Object.entries(indicators)) {
//     if (terms.some(term => content.includes(term))) {
//       return type;
//     }
//   }

//   return "general business";
// }

// // OpenAI-enhanced analysis (optional)
// async function generateOpenAIAnalysis(pageContent: any) {
//   try {
//     const analysisPrompt = `
//       Analyze this website content and provide the following information:
      
//       Website Title: ${pageContent.title}
//       Meta Description: ${pageContent.metaDescription}
//       Main Headings: ${pageContent.headings}
//       Page Content: ${pageContent.bodyText.substring(0, 2000)}...
      
//       Based on this information:
//       1. What type of business is this website for? (e.g., E-commerce, SaaS, Restaurant, etc.)
//       2. Generate a list of 7-10 relevant keywords that customers might use when asking about this business.
//       3. Create a helpful automated response template (150-200 words) that this business could use to respond to customer inquiries.
      
//       Format your response as JSON with the following structure:
//       {
//         "businessType": "string",
//         "suggestedKeywords": ["string", "string", ...],
//         "suggestedResponse": "string"
//       }
//     `;

//     const { text } = await generateText({
//       model: openai("gpt-4o"),
//       prompt: analysisPrompt,
//     });

//     return JSON.parse(text);
//   } catch (error) {
//     console.error("OpenAI analysis failed:", error);
//     return null;
//   }
// }


import { NextResponse } from "next/server";
import puppeteer from 'puppeteer-core';
import chrome from '@sparticuz/chrome-aws-lambda';
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { JSDOM } from "jsdom";
import { Readability } from '@mozilla/readability';
import natural from "natural";

// Initialize NLP tools
const { WordTokenizer, PorterStemmer } = natural;
const tokenizer = new WordTokenizer();
const stemmer = PorterStemmer;

export const runtime = 'nodejs'; // Required for Vercel
export const maxDuration = 30; // Vercel's maximum

export async function POST(request: Request) {
  let browser;
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Configure browser for Vercel
    const isVercel = process.env.VERCEL === '1';
    browser = await puppeteer.launch({
      args: [
        ...chrome.args,
        '--disable-gpu',
        '--single-process',
        '--no-zygote',
        '--no-sandbox'
      ],
      executablePath: isVercel 
        ? await chrome.executablePath 
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    // Navigation with timeout
    try {
      await Promise.race([
        page.goto(url.startsWith('http') ? url : `https://${url}`, {
          waitUntil: "networkidle2",
          timeout: 20000 // 20s timeout
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Navigation timeout")), 25000)
      )
      ]);
    } catch (navError) {
      console.warn("Navigation warning:", navError);
    }

    // Capture screensho
    const screenshot = await page.screenshot({
      encoding: "base64",
      type: "jpeg",
      quality: 80,
    });
    const screenshotDataUrl = `data:image/jpeg;base64,${screenshot}`;

    // Extract content
    const pageContent = await page.evaluate(() => ({
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      headings: Array.from(document.querySelectorAll("h1, h2, h3"))
        .map((h) => h.textContent)
        .filter(Boolean)
        .join("\n"),
      bodyText: document.body.innerText.substring(0, 5000),
      html: document.documentElement.innerHTML,
    }));

    // Enhanced content extraction
    const dom = new JSDOM(pageContent.html);
    const article = new Readability(dom.window.document).parse()?.textContent || pageContent.bodyText;

    // Business info extraction
    const businessInfo = extractBusinessInfo(pageContent, article);

    // Generate analysis
    const basicAnalysis = generateBasicAnalysis(pageContent, businessInfo);
    let enhancedAnalysis = null;
    
    try {
      enhancedAnalysis = await generateOpenAIAnalysis(pageContent);
    } catch (aiError) {
      console.warn("OpenAI analysis failed:", aiError);
    }

    return NextResponse.json({
      ...basicAnalysis,
      ...(enhancedAnalysis || {}),
      screenshot: screenshotDataUrl,
      metadata: {
        title: pageContent.title,
        description: pageContent.metaDescription,
        headings: pageContent.headings,
      },
      businessInfo,
      analysisSource: enhancedAnalysis ? "openai+local" : "local",
    });

  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed"},
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close().catch(e => console.error("Browser close error:", e));
  }
}

// Helper functions (unchanged but included for completeness)
function extractBusinessInfo(pageContent: any, articleText: string) {
  const phoneRegex = /(\+?\d{1,2}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/g;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  
  const phoneMatches = [
    ...(pageContent.bodyText.match(phoneRegex) || []),
    ...(articleText.match(phoneRegex) || [])
  ];
  const phones = Array.from(new Set(phoneMatches));

  const emailMatches = [
    ...(pageContent.bodyText.match(emailRegex) || []),
    ...(articleText.match(emailRegex) || [])
  ];
  const emails = Array.from(new Set(emailMatches));

  return {
    phones,
    emails,
    services: extractServices(pageContent.bodyText + " " + articleText),
    contentSummary: articleText.substring(0, 1000) + (articleText.length > 1000 ? "..." : ""),
  };
}

function extractServices(text: string) {
  const tokens = tokenizer.tokenize(text) || [];
  const stems = tokens.map(token => stemmer.stem(token));
  const businessTerms = ['service', 'product', 'solution', 'offer', 'provide'];
  const serviceKeywords = ['design', 'develop', 'consult', 'manage', 'install'];
  const services: string[] = [];

  stems.forEach((stem, i) => {
    if (businessTerms.includes(stem) || serviceKeywords.includes(stem)) {
      const start = Math.max(0, i - 3);
      const end = Math.min(stems.length, i + 4);
      const phrase = tokens.slice(start, end).join(' ');
      if (!services.includes(phrase)) services.push(phrase);
    }
  });
  return services.slice(0, 10);
}

function generateBasicAnalysis(pageContent: any, businessInfo: any) {
  const name = pageContent.title.split('|')[0].split('-')[0].trim();
  const contentWords = (pageContent.bodyText + " " + pageContent.headings).toLowerCase();
  const wordCounts: Record<string, number> = {};

  contentWords.split(/\s+/).forEach(word => {
    if (word.length > 4) wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  const suggestedKeywords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);

  let suggestedResponse = `Thank you for your interest in ${name || 'our business'}. `;
  if (businessInfo.services.length > 0) {
    suggestedResponse += `We specialize in ${businessInfo.services.slice(0, 3).join(', ')}. `;
  }
  suggestedResponse += `Contact us at ${businessInfo.emails[0] || 'our email'} or ${businessInfo.phones[0] || 'our phone'}.`;

  return {
    businessType: guessBusinessType(pageContent, businessInfo),
    suggestedKeywords,
    suggestedResponse,
    isBasicAnalysis: true,
  };
}

function guessBusinessType(pageContent: any, _businessInfo: any) {
  const content = (pageContent.bodyText + pageContent.headings).toLowerCase();
  const indicators = {
    ecommerce: ['shop', 'cart', 'checkout'],
    saas: ['software', 'subscription', 'pricing'],
    restaurant: ['menu', 'reservation'],
    service: ['repair', 'maintenance']
  };

  for (const [type, terms] of Object.entries(indicators)) {
    if (terms.some(term => content.includes(term))) return type;
  }
  return "general business";
}

async function generateOpenAIAnalysis(pageContent: any) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Analyze this website content:
        Title: ${pageContent.title}
        Description: ${pageContent.metaDescription}
        Content: ${pageContent.bodyText.substring(0, 2000)}...
        Return JSON with businessType, suggestedKeywords, and suggestedResponse.`
    });
    return JSON.parse(text);
  } catch (error) {
    throw error;
  }
}