import { AskAIParams } from "@/utils/types";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const askAI = async ({ topic, setLoading, setResult }: AskAIParams) => {
  if (!topic.trim()) return alert("Please enter a topic!");

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  const prompt = `I want to learn ${topic}.
Act like a subject matter expert and curriculum architect for [TOPIC].

Your task is to generate a **deeply detailed and exhaustive list of subtopics**, structured as a JSON object grouped by **logical subject categories** (e.g., JavaScript, React, etc.), **not difficulty levels**.

**Rules**:
- The output must be in **valid JSON** format.
- Each subject area should be a **key** (string), and its value should be a **list of objects**, each with:
  - "subtopic": a precise and self-contained subtopic string.
  - "difficulty": an integer from 1 (easy) to 5 (very hard).
- Do **not** group the content by "Fundamentals", "Intermediate", or "Advanced".
- Do **not** include any explanation, summary, heading, or extra text.
- Do **not** combine multiple concepts into a single subtopic.
- Go as deep and detailed as possible, covering both beginner and expert-level topics — but group only by actual subject/category.

**IMPORTANT**:  
Only return a clean JSON object. No extra text or markdown.`;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  setLoading(true);
  const res = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  const data = await res.json();
  setResult(data.text);
  if (!data.text) {
    setLoading(false);
    return alert("Failed to generate subtopics. Please try again.");
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  setLoading(false);
};

export default askAI;
