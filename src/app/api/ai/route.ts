// /app/api/ai/route.ts (Next.js 13+ App Router)
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const body = await req.json();
  const prompt = body.prompt;

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return Response.json({ text });
}
