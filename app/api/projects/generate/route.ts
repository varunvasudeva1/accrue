import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const runtime = "edge";

export async function POST(req: Request) {
  const project = await req.json();
  const messages: {
    content: string;
    role: "user" | "system";
  }[] = [
    {
      content:
        "You are a helpful AI assistant whose job is to help users plan, iterate on, and build their tech side projects. Given a list of things to help with, you should provide a JSON object containing the following fields: `name_suggestions`, `logo_suggestions`, `slogan_suggestions`, `tech_stack_suggestions`, and `action_plan_suggestions`.",
      role: "system",
    },
    {
      content: `Hello, Assistant! I'm building a new project. Here are the details:\n
      Name: ${
        project.project_name ? project.project_name : "No name provided."
      }\n
      Description: ${
        project.project_description
          ? project.project_description
          : "No description provided."
      }\n
      Here are the things I need help with:\n
      ${
        project.logo_needed
          ? "Design a logo for my project. Keywords: " + project.logo_keywords
          : ""
      }\n
      ${
        project.slogan_needed
          ? "Come up with a slogan for my project. Keywords: " +
            project.slogan_keywords
          : ""
      }\n
      ${
        project.tech_stack_needed
          ? "Recommend a tech stack for my project. Keywords: " +
            project.tech_stack_keywords
          : ""
      }\n
      ${
        project.action_plan_needed
          ? "Create an action plan with concrete development goals and a timeline for executing them based on my experience level. Experience level: " +
            project.experience_level
          : ""
      }\n
          `,
      role: "user",
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    stream: true,
    response_format: {
      type: "json_object",
    },
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
