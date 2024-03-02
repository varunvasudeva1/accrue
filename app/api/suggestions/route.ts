import { Model, Project } from "@/types";
import { NextResponse } from "next/server";
import {
  openai,
  mistral,
  ollama,
  llamacpp,
  jsonObjectPrompt,
  zodSchema,
  streamText,
  generateObject,
} from "modelfusion";
import { z } from "zod";

export const runtime = "edge";

export async function POST(req: Request) {
  const {
    project,
    endpoint,
    provider,
  }: {
    project: Project;
    endpoint: Model["model_endpoint"];
    provider: Model["model_provider"];
  } = await req.json();

  if (!project) {
    return NextResponse.json({ error: "No project provided" }, { status: 400 });
  }

  if (!endpoint) {
    return NextResponse.json(
      { error: "No model endpoint provided" },
      { status: 400 }
    );
  }

  const system = `You are a helpful AI assistant whose job is to help users plan, iterate on, and build their projects. Only respond with what's needed. For example, if asked only for slogan suggestions, only include the "slogan_suggestions" key in the response object.`;

  const instruction = `Hello, Assistant! I'm building a new project. Here's the details. \nName: ${
    project.project_name ? project.project_name : "No name provided."
  }\nDescription: ${
    project.project_description
      ? project.project_description
      : "No description provided."
  } Here are the suggestions I need for my project:
    ${project.name_needed ? `Names.\n` : ""}${
    project.logo_needed
      ? `Logos: provide prompts describing the logo that a designer can use. Keywords: ${project.logo_keywords}\n`
      : ""
  }${
    project.slogan_needed
      ? `Slogans: using the keywords, provide slogan suggestions that capture the vision of the project. Keywords: ${project.slogan_keywords}\n`
      : ""
  }${
    project.tech_stack_needed
      ? `Tech stack: provide a description of what technologies/frameworks I should use for my entire stack. Keywords: ${project.tech_stack_keywords}\n`
      : ""
  }${
    project.action_plan_needed
      ? `Action plan: create an action plan with concrete development goals and a timeline for executing them based on my experience level. Order the actions by deadline. Experience level: ${project.experience_level}.\n`
      : ""
  }Thanks!`;

  const responseSchema = zodSchema(
    z.object({
      name_suggestions: z
        .array(z.string())
        .optional()
        .describe("Name suggestions."),
      logo_suggestions: z
        .array(z.string())
        .optional()
        .describe("Logo suggestions."),
      slogan_suggestions: z
        .array(z.string())
        .optional()
        .describe("Slogan suggestions."),
      tech_stack_suggestion: z
        .string()
        .optional()
        .describe("Tech stack suggestion."),
      action_plan_suggestion: z
        .array(
          z.object({
            action: z.string().describe("Action."),
            plan: z.string().describe("Plan."),
            deadline: z
              .string()
              .describe("Deadline (e.g. '2 days' or '4 weeks')."),
          })
        )
        .optional()
        .describe("Action plan suggestion."),
    })
  );

  try {
    switch (provider) {
      case "OpenAI":
        const oaiSuggestions = await generateObject({
          model: openai
            .ChatTextGenerator({
              model: endpoint as "gpt-3.5-turbo-1106" | "gpt-4-turbo-preview",
              temperature: 0,
              maxGenerationTokens: 1024,
            })
            .asFunctionCallObjectGenerationModel({
              fnName: "Suggestions",
              fnDescription: `Given a list of tasks, provide a JSON containing the following possible fields: "name_suggestions", "logo_suggestions", "slogan_suggestions", "tech_stack_suggestion", and "action_plan_suggestion".`,
            })
            .withInstructionPrompt(),

          schema: responseSchema,
          prompt: {
            system,
            instruction,
          },
        });
        return NextResponse.json(oaiSuggestions);

      case "Mistral":
        const mistralSuggestions = await streamText({
          model: mistral.ChatTextGenerator({
            model: "mistral-medium",
            maxGenerationTokens: 1024,
          }),
          prompt: [
            {
              role: "system",
              content: system,
            },
            {
              role: "user",
              content: instruction,
            },
          ],
        });
        for await (const response of mistralSuggestions) {
          return NextResponse.json(response);
        }
        break;

      case "LocalAI:llamacpp":
        const llamacppSuggestions = await generateObject({
          model: llamacpp
            .CompletionTextGenerator({
              promptTemplate: llamacpp.prompt.ChatML,
              maxGenerationTokens: 1024,
              temperature: 0,
            })
            .asObjectGenerationModel(jsonObjectPrompt.text()),

          schema: responseSchema,
          prompt: instruction,
        });
        return NextResponse.json(llamacppSuggestions);

      case "LocalAI:ollama":
        const ollamaSuggestions = await generateObject({
          model: ollama
            .CompletionTextGenerator({
              model: endpoint,
              maxGenerationTokens: 1024,
              temperature: 0,
              promptTemplate: ollama.prompt.ChatML,
            })
            .asObjectGenerationModel(jsonObjectPrompt.instruction()),

          schema: responseSchema,
          prompt: {
            system,
            instruction,
          },
        });
        return NextResponse.json(ollamaSuggestions);

      default:
        return NextResponse.json(
          { error: "Invalid model provider" },
          { status: 400 }
        );
    }
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
