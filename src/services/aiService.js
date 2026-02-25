const OpenAI = require("openai");
const Knowledge = require("../models/Knowledge");
const Reply = require("../models/Reply");

const useMockAI = process.env.USE_MOCK_AI === "true";

let openai = null;

if (!useMockAI) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

/* ---------------- HELPER: TEXT CLEANING ---------------- */

function normalizeText(text) {
  if (!text || typeof text !== "string") return [];

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3);
}

/* ---------------- HELPER: RELEVANCE SCORING ---------------- */

function calculateScore(emailWords, content) {
  if (!content) return 0;

  const contentWords = normalizeText(content);
  let score = 0;

  emailWords.forEach((word) => {
    if (contentWords.includes(word)) {
      score++;
    }
  });

  return score;
}

/* ---------------- MAIN FUNCTION ---------------- */

async function generateReply(emailText) {
  try {
    const safeEmailText = emailText || "";
    const emailWords = normalizeText(safeEmailText);

    // 🔹 Fetch all knowledge
    const knowledgeItems = await Knowledge.find();

    const rankedKnowledge = knowledgeItems
      .filter((k) => k.content)
      .map((k) => ({
        ...k.toObject(),
        score: calculateScore(emailWords, k.content),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const knowledgeText =
      rankedKnowledge.length > 0
        ? rankedKnowledge
            .map((k, i) => `${i + 1}. ${k.title}\n${k.content}`)
            .join("\n\n")
        : "No directly relevant knowledge found.";

    // 🔹 Fetch all saved replies
    const savedReplies = await Reply.find();

    const rankedReplies = savedReplies
      .filter((r) => r.content)
      .map((r) => ({
        ...r.toObject(),
        score: calculateScore(emailWords, r.content),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const savedRepliesText =
      rankedReplies.length > 0
        ? rankedReplies
            .map((r, i) => `${i + 1}. ${r.content}`)
            .join("\n\n")
        : "No relevant templates found.";

    if (useMockAI) {
      return `
Thank you for contacting us.

We have reviewed your message and will assist you accordingly.
Please let us know if you need further clarification.
      `.trim();
    }

    const prompt = `
You are a professional internal customer support AI assistant.

Generate a helpful and accurate reply using:
- Relevant Company Knowledge
- Relevant Saved Replies (tone reference)
- The Customer Email

STRICT RULES:
- WRITE ONLY THE EMAIL BODY.
- DO NOT include greeting.
- DO NOT include subject.
- DO NOT include signature.
- DO NOT invent policies.

-------------------------------
RELEVANT COMPANY KNOWLEDGE:
-------------------------------
${knowledgeText}

-------------------------------
RELEVANT SAVED REPLIES:
-------------------------------
${savedRepliesText}

-------------------------------
CUSTOMER EMAIL:
-------------------------------
${safeEmailText}

Now write a clear, polite, and context-aware response.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("AI Error:", err.message);
    return "We are currently unable to process your request. Please try again later.";
  }
}

module.exports = { generateReply };
