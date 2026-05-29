import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import * as cheerio from "cheerio";

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client with standard environment variable
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured. Please add your key in Settings > Secrets inside the AI Studio panel.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Endpoint: Analyze News Article
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url || typeof url !== "string" || !url.startsWith("http")) {
        return res.status(400).json({ error: "Please enter a valid HTTP or HTTPS article URL." });
      }

      console.log(`Analyzing URL: ${url}`);

      let html = "";
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
          },
        });

        if (!response.ok) {
          throw new Error(`Server returned status code ${response.status}`);
        }
        html = await response.text();
      } catch (fetchErr: any) {
        console.error("Failed to fetch page HTML:", fetchErr);
        return res.status(422).json({
          error: `Unable to access the URL. Please verify the link. Details: ${fetchErr?.message || "Connection refused"}`
        });
      }

      // Load into Cheerio for intelligent curation
      const $ = cheerio.load(html);

      // Clean HTML from irrelevant noise
      $("script, style, iframe, footer, nav, noscript, header, .nav, .footer, .menu, .ads").remove();

      // Retrieve article headline
      let headline = $("meta[property='og:title']").attr("content") ||
                     $("meta[name='twitter:title']").attr("content") ||
                     $("h1").first().text().trim() ||
                     $("title").text().trim();

      // Try reading generic site identifier
      let siteName = $("meta[property='og:site_name']").attr("content") ||
                     $("meta[name='twitter:site']").attr("content") ||
                     "";

      if (!siteName) {
        try {
          const u = new URL(url);
          siteName = u.hostname.replace("www.", "");
        } catch {
          siteName = "Selected News Outlet";
        }
      }

      // Collect potential body copy elements
      const paragraphs: string[] = [];
      $("article p, main p, p").each((_i, el) => {
        const txt = $(el).text().trim();
        if (txt.length > 50 && !txt.includes("Privacy Policy") && !txt.includes("cookie")) {
          paragraphs.push(txt);
        }
      });

      const bodyCopy = paragraphs.slice(0, 35).join("\n\n");

      if (bodyCopy.length < 200) {
        return res.status(422).json({
          error: "Could not retrieve comprehensive article text (commonly blocked by cookie walls or dynamic user-auth). Try selecting another URL or one of our curated article presets."
        });
      }

      // Safe lazy setup of Gemini client
      const ai = getGeminiClient();

      const systemInstruction = `You are "Bijakbaca" (The Wise Reader), a highly experienced news analyst, media literacy educator, and expert in investigative journalism, cognitive bias identification, and global regional narrative framing.
Your goal is to thoroughly deconstruct media framing and deliver independent, fair-minded evaluations that teach critical thinking.

Determine the primary language of the source article (Indonesian or English). If the article is Indonesian, respond using elegant, professional Indonesian. Otherwise, respond in objective English.

Provide:
1. headline: The original headline.
2. sourceName: The identified publication source.
3. summary: A 2-3 paragraph objective summary explaining the primary news event, timeline, and actions narrated.
4. framing: A breakdown of the publisher's editorial stance, selective wording, framing bias, narrative tone, and who is highlighted vs backgrounded.
5. claims: Extract 3-5 major explicit claims stated as fact by the publisher.
6. blindSpots: Crucial missing voices, ignored stakeholders, lack of context, or key content skipped entirely (what is glossed over).
7. globalContext: Contrast this event on a global stage. Explain how other media, regions, or histories report this issue.
8. criticalQuestions: 3-5 investigative inquiries that read past the bias, empowering citizens to investigate further.

Your responses must be highly thorough, deeply intellectual, and structured matching the strict JSON schema. Avoid basic platitudes.`;

      const prompt = `Please analyze the following article text from ${siteName} (${url}):
Headline: "${headline}"
Body paragraphs harvested:
---
${bodyCopy.substring(0, 7500)}
---

Conduct the Bijakbaca media literacy analysis.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              sourceName: { type: Type.STRING },
              summary: { type: Type.STRING },
              framing: { type: Type.STRING },
              claims: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              blindSpots: { type: Type.STRING },
              globalContext: { type: Type.STRING },
              criticalQuestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["headline", "sourceName", "summary", "framing", "claims", "blindSpots", "globalContext", "criticalQuestions"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("No analysis response returned from the Gemini AI engine.");
      }

      const cleanJson = text.trim();
      const report = JSON.parse(cleanJson);
      res.json(report);

    } catch (err: any) {
      console.error("Gemini News analysis crash error:", err);
      res.status(500).json({ error: err?.message || "Encountered a server error while parsing the article or querying the Gemini model." });
    }
  });

  // Serve static assets in production or mount Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
