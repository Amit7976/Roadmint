import { AskAIParams } from "@/utils/types";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const askAI = async ({ topic, setLoading, setResult }: AskAIParams) => {
  if (!topic.trim()) return alert("Please enter a topic!");

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  const prompt = `I want to learn ${topic}. 
Act like a subject matter expert and curriculum architect for [TOPIC].

Your task is to generate a **deeply detailed and exhaustive list of subtopics**, structured strictly as a **JSON object**, for the complete mastery of [TOPIC].

**Rules**:
- The output must be in **valid JSON** format.
- Each major category should be a **key** (string), and its value should be a **list of atomic subtopic strings**.
- Do **not explain**, define, or describe anything.
- Do **not include any text or headings before or after the JSON** — output should only be a clean JSON object.
- Each subtopic must be **precise and self-contained** (e.g., "JavaScript closures" not just "Closures").
- No duplicate or overlapping subtopics.
- Do **not** combine multiple sub-concepts into one line.
- Go as deep as reasonably possible. Include both fundamental and advanced concepts.

**IMPORTANT**:  
Do **not** include any extra explanation, introduction, summary, learning plans, durations, or formatting.  
Just a raw JSON object of cleanly grouped subtopics for [TOPIC].

    `;

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
  setLoading(false);
};

export default askAI;