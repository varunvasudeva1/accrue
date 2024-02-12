import OpenAI from "openai";
import { Model, Project, Suggestions } from "@/types";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

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
    project,
    model = "gpt-3.5-turbo-1106",
  }: {
    project: Project;
    model: Model["value"];
  } = await req.json();
  const suggestionsExample: Suggestions = {
    name_suggestions: ["Project name 1", "Project name 2"],
    slogan_suggestions: ["Project slogan 1", "Project slogan 2"],
    tech_stack_suggestion: "Tech stack",
    action_plan_suggestion: [
      {
        action: "Action 1",
        plan: "Plan",
        deadline: "2 days",
      },
      {
        action: "Action 2",
        plan: "Plan",
        deadline: "3 weeks",
      },
    ],
  };
  const messages: {
    content: string;
    role: "user" | "system";
  }[] = [
    {
      content: `You are a helpful AI assistant whose job is to help users plan, iterate on, and build their tech side projects. Given a list of things to help with, you should provide a JSON containing the following possible fields: "name_suggestions", "logo_suggestions", "slogan_suggestions", "tech_stack_suggestion", and "action_plan_suggestion". An example response: ${JSON.stringify(
        suggestionsExample
      )}. Only provide suggestions for things that are needed. If available, order the action plan suggestions by deadline.`,
      role: "system",
    },
    {
      content: `Hello, Assistant!\nI'm building a new project.\nName: ${
        project.project_name ? project.project_name : "No name provided."
      }\nDescription: ${
        project.project_description
          ? project.project_description
          : "No description provided."
      }\nHere are the things I need help with:\n`,
      role: "user",
    },
    {
      content: `${project.name_needed ? `Come up with a name.\n` : ""}${
        project.logo_needed
          ? `Design a logo. Keywords: ${project.logo_keywords}\n`
          : ""
      }${
        project.slogan_needed
          ? `Come up with a slogan. Keywords: ${project.slogan_keywords}\n`
          : ""
      }${
        project.tech_stack_needed
          ? `Recommend a tech stack. Keywords: ${project.tech_stack_keywords}\n`
          : ""
      }${
        project.action_plan_needed
          ? `Create an action plan with concrete development goals and a timeline for executing them based on my experience level. Experience level: ${project.experience_level}.\n`
          : ""
      }`,
      role: "user",
    },
  ];

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
        });
        const mistralStream = OpenAIStream(mistralResponse);
        return new StreamingTextResponse(mistralStream);

      default:
        const defaultResponse = await anyscale.chat.completions.create({
          model: "mistralai/Mistral-7B-Instruct-v0.1",
          messages,
          stream: true,
          response_format: {
            type: "json_object",
          },
        });
        const defaultStream = OpenAIStream(defaultResponse);
        return new StreamingTextResponse(defaultStream);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
