import OpenAI from "openai";
import { Model } from "@/types";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: process.env.ANYSCALE_API_KEY,
});
export const runtime = "edge";

export async function POST(req: Request) {
  const {
    messages,
    model = "gpt-3.5-turbo-1106",
  }: {
    messages: ChatCompletionMessageParam[];
    model: Model["model_endpoint"];
  } = await req.json();

  try {
    switch (model) {
      case "gpt-3.5-turbo-1106" || "gpt-4-turbo-preview":
        const gptResponse = await openai.chat.completions.create({
          model: model,
          messages,
          stream: true,
          response_format: {
            type: "json_object",
          },
          max_tokens: 800,
        });
        const gptStream = OpenAIStream(gptResponse);
        return new StreamingTextResponse(gptStream);

      case "mistral-tiny" || "mistral-small" || "mistral-medium":
        const mistralResponse = await anyscale.chat.completions.create({
          model:
            model === "mistral-tiny"
              ? "mistralai/Mistral-7B-Instruct-v0.1"
              : model === "mistral-small"
              ? "mistralai/Mixtral-8x7B-Instruct-v0.1"
              : "mistral-medium",
          messages,
          stream: true,
          response_format: {
            type: "json_object",
          },
          max_tokens: 800,
        });
        const mistralStream = OpenAIStream(mistralResponse);
        return new StreamingTextResponse(mistralStream);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
