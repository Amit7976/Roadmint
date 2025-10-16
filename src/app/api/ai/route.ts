export async function POST(req: Request) {
  const body = await req.json();
  const prompt = body.prompt;

  // Add multiple fallback keys here
  const apiKeys = [
    process.env.AI_API_KEY,
    process.env.AI_API_KEY_2,
    process.env.AI_API_KEY_3,
    process.env.AI_API_KEY_4,
    process.env.AI_API_KEY_5,
  ].filter(Boolean); // remove undefined keys

  if (apiKeys.length === 0) {
    return Response.json({ text: "No API keys configured" }, { status: 500 });
  }

  // Try each API key until success
  for (const key of apiKeys) {
    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
          }),
        }
      );

      if (!res.ok) {
        console.warn(`Key failed: ${key}`);
        continue; // try next key
      }

      const data = await res.json();

      return Response.json({
        text: data?.choices?.[0]?.message?.content || "No response",
      });
    } catch (error) {
      console.warn(`Error using key ${key}:`, error);
      continue;
    }
  }

  // If all keys failed
  return Response.json({
    text: "All AI providers are currently busy. Try again later.",
  });
}
