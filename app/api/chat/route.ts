import { Message, Model } from "@/types";
import { NextResponse } from "next/server";
import { openai, mistral, ollama, llamacpp, streamText } from "modelfusion";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { StreamingTextResponse } from "ai";
import { ModelFusionTextStream } from "@modelfusion/vercel-ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });
  const {
    messages,
    endpoint,
    url,
    provider,
  }: {
    messages: Message[];
    endpoint: Model["model_endpoint"];
    url: Model["model_url"];
    provider: Model["model_provider"];
  } = await req.json();

  const system =
    "You are a helpful AI assistant whose job is to help users plan, iterate on, and build their projects. If given project details, answer the user's questions and provide suggestions to help them specific to their project. Otherwise, be ready to answer general questions about the project planning process.";

  try {
    switch (provider) {
      case "OpenAI":
        const openaiApiKey = await supabase
          .from("api_keys")
          .select("key_value")
          .eq("key_name", "OPENAI_API_KEY")
          .single()
          .then((res) => res?.data?.key_value);
        if (!openaiApiKey) {
          return NextResponse.json(
            { error: "No OpenAI API key found" },
            { status: 400 }
          );
        }
        const openaiApiConfig = openai.Api({
          apiKey: openaiApiKey,
        });
        const openaiSuggestions = await streamText({
          model: openai
            .ChatTextGenerator({
              api: openaiApiConfig,
              model: endpoint as "gpt-3.5-turbo-1106" | "gpt-4-turbo-preview",
              temperature: 0,
              maxGenerationTokens: 1024,
            })
            .withChatPrompt(),
          prompt: {
            system,
            messages,
          },
        });
        return new StreamingTextResponse(
          ModelFusionTextStream(openaiSuggestions)
        );

      case "Mistral":
        const mistralApiKey = await supabase
          .from("api_keys")
          .select("key_value")
          .eq("key_name", "MISTRAL_API_KEY")
          .single()
          .then((res) => res?.data?.key_value);
        if (!mistralApiKey) {
          return NextResponse.json(
            { error: "No Mistral API key found" },
            { status: 400 }
          );
        }
        const mistralApiConfig = mistral.Api({
          apiKey: mistralApiKey,
        });
        const mistralStream = await streamText({
          model: mistral
            .ChatTextGenerator({
              api: mistralApiConfig,
              model: endpoint as
                | "mistral-tiny"
                | "mistral-small"
                | "mistral-medium",
              maxGenerationTokens: 1024,
            })
            .withChatPrompt(),
          prompt: {
            system,
            messages,
          },
        });
        return new StreamingTextResponse(ModelFusionTextStream(mistralStream));

      case "LocalAI":
        if (!url) {
          return NextResponse.json(
            { error: "No model URL provided" },
            { status: 400 }
          );
        }
        const localaiRequest = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages,
            max_tokens: 2048,
          }),
        }).then((res) => res.json());
        const localaiSuggestions = JSON.parse(
          localaiRequest.choices[0].message.content
        );
        return NextResponse.json(localaiSuggestions);

      case "LocalAI:llamacpp":
        const llamacppStream = await streamText({
          model: llamacpp
            .CompletionTextGenerator({
              maxGenerationTokens: 1024,
              temperature: 0,
              promptTemplate: llamacpp.prompt.ChatML,
            })
            .withChatPrompt(),
          prompt: {
            system,
            messages,
          },
        });
        return new StreamingTextResponse(ModelFusionTextStream(llamacppStream));

      case "LocalAI:ollama":
        if (!endpoint) {
          return NextResponse.json(
            { error: "No model endpoint provided" },
            { status: 400 }
          );
        }
        const ollamaSuggestions = await streamText({
          model: ollama
            .CompletionTextGenerator({
              model: endpoint,
              maxGenerationTokens: 1024,
              temperature: 0,
            })
            .withChatPrompt(),
          prompt: {
            system,
            messages,
          },
        });
        return new StreamingTextResponse(
          ModelFusionTextStream(ollamaSuggestions)
        );

      default:
        return NextResponse.json(
          { error: "Invalid model provider" },
          { status: 400 }
        );
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
