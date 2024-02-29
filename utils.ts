import { defaultModels } from "./constants";
import { APIKey, Project } from "./types";

export const generateMessagesForSuggestions = (project: Project) => {
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
      content: `Here are the suggestions I need for my project:
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
  return messages;
};

export const calculatePercentDelta = (oldValue: number, newValue: number) => {
  return Math.round(((newValue - oldValue) / oldValue) * 100);
};

export const getAvailableDefaultModels = (apiKeys: APIKey[] | null) => {
  if (!apiKeys) return [];
  const availableModels = defaultModels.filter((model) =>
    apiKeys?.some(
      (key) => key.key_name === `${model.model_provider?.toUpperCase()}_API_KEY`
    )
  );
  return availableModels;
};
