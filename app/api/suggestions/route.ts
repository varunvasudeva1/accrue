import OpenAI from "openai";
import { Model, Project } from "@/types";
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
    model = "mistral-tiny",
  }: {
    project: Project;
    model: Model["value"];
  } = await req.json();
  const messages: {
    content: string;
    role: "user" | "system";
  }[] = [
    {
      content: `You are a helpful AI assistant whose job is to help users plan, iterate on, and build their projects. Given a list of tasks, you should provide a JSON containing the following possible fields: "name_suggestions", "logo_suggestions", "slogan_suggestions", "tech_stack_suggestion", and "action_plan_suggestion". 
      
      For "name_suggestions", "logo_suggestions", and "slogan_suggestions", provide an array of strings. For "tech_stack_suggestion", provide a string. For "action_plan_suggestion", provide an array of objects, each containing "action", "plan", and "deadline" keys.

      Only respond with what's needed. For example, if asked only for slogan suggestions, only include the "slogan_suggestions" key in the response object.`,
      role: "system",
    },
    {
      content: `Hello, Assistant! I'm building a new project. Here's the details. \nName: ${
        project.project_name ? project.project_name : "No name provided."
      }\nDescription: ${
        project.project_description
          ? project.project_description
          : "No description provided."
      }`,
      role: "user",
    },
    {
      content: `
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
      }Thanks!`,
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

      default:
        const defaultResponse = await anyscale.chat.completions.create({
          model: "mistralai/Mistral-7B-Instruct-v0.1",
          messages,
          stream: true,
          response_format: {
            type: "json_object",
          },
          max_tokens: 800,
        });
        const defaultStream = OpenAIStream(defaultResponse);
        return new StreamingTextResponse(defaultStream);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
