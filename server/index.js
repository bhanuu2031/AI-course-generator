// server/index.js
import express from "express";
import cors from "cors";
import ollama from "ollama";

const app = express();

// --- Config ---
const PORT = process.env.PORT || 5000;
// prefer smaller model on 4GB VRAM GPUs
const MODEL = process.env.OLLAMA_MODEL || "llama3";
const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";

// CORS + JSON
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, model: MODEL, host: OLLAMA_HOST });
});

// ---- Helpers ----
function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

// =====================================================
// ============  Generate Course (JSON)  ===============
// =====================================================
app.post("/api/generate-course", async (req, res) => {
  const {
    topic,
    level,
    duration,
    learningObjectives,
    preferredStyle,
    targetAudience,
  } = req.body;

  try {
    const response = await ollama.chat({
      model: MODEL,
      stream: false,            // one complete message
      format: "json",           // nudge model to output JSON
      options: { temperature: 0.2 },
      messages: [
        {
          role: "system",
          content: `You are an expert course designer.
Return ONLY a valid JSON object (no markdown, no extra text) using this schema:

{
  "overview": "short summary",
  "modules": [
    { "title": "Module 1 Title", "topics": ["subtopic1", "subtopic2"] },
    { "title": "Module 2 Title", "topics": ["subtopic1", "subtopic2"] }
  ],
  "resources": [
    { "title": "Book or Video", "url": "https://..." }
  ]
}`,
        },
        {
          role: "user",
          content: `
Create a detailed syllabus for the course with the following inputs:
- Topic: ${topic}
- Level: ${level}
- Duration: ${duration} weeks
- Learning Objectives: ${learningObjectives || "default to key skills"}
- Teaching Style: ${preferredStyle}
- Target Audience: ${targetAudience || "general learners"}

Ensure the content is realistic and actionable. Return JSON only.
          `.trim(),
        },
      ],
    });

    const text = response?.message?.content?.trim() || "";
    let data = safeParseJSON(text);

    // final fallback
    if (!data) {
      data = {
        overview:
          "Could not strictly parse JSON. Returning text fallback as overview.",
        modules: [],
        resources: [],
        _raw: text,
      };
    }

    return res.json({ course: data });
  } catch (err) {
    console.error("Error generating course:", err);
    return res.status(500).json({ error: err.message });
  }
});

// =====================================================
// ===============  Chatbot (JSON)  ====================
// =====================================================
app.post("/api/chat", async (req, res) => {
  // accept both shapes: { question } or { message }
  const question = req.body?.question ?? req.body?.message ?? "";

  try {
    const response = await ollama.chat({
      model: MODEL,
      stream: false,            // simpler parsing
      format: "json",           // ask for JSON
      options: { temperature: 0.2 },
      messages: [
        {
          role: "system",
          content: `You are a helpful AI tutor.
Return ONLY a valid JSON object (no markdown, no extra text) with this exact shape:

{
  "answer": "concise explanation tailored to the question",
  "suggestedTopics": ["short topic", "short topic"]
}`,
        },
        { role: "user", content: question },
      ],
    });

    const text = response?.message?.content?.trim() || "";
    let data = safeParseJSON(text);

    // graceful fallback when model returns plain text
    if (!data) {
      data = { answer: text || "Sorry, I couldn't parse a response.", suggestedTopics: [] };
    }

    // safety: enforce types
    if (typeof data.answer !== "string") data.answer = String(data.answer ?? "");
    if (!Array.isArray(data.suggestedTopics)) data.suggestedTopics = [];

    return res.json(data);
  } catch (err) {
    console.error("Error in chatbot:", err);
    return res.status(500).json({
      answer: "There was an error reaching the tutor service.",
      suggestedTopics: [],
      _error: err.message,
    });
  }
});

// ---- Start server ----
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   Using model: ${MODEL}`);
});
