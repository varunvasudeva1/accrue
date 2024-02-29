import { Model, Tier } from "./types";

export const modelProviders = ["OpenAI", "AnyScale", "LocalAI"];

export const defaultModels: Model[] = [
  {
    model_name: "GPT-3.5 Turbo",
    model_endpoint: "gpt-3.5-turbo-1106",
    model_provider: "OpenAI",
  },
  {
    model_name: "GPT-4 Turbo",
    model_endpoint: "gpt-4-turbo-preview",
    model_provider: "OpenAI",
  },
  {
    model_name: "Mistral Tiny",
    model_endpoint: "mistral-tiny",
    model_provider: "AnyScale",
  },
  {
    model_name: "Mistral Small",
    model_endpoint: "mistral-small",
    model_provider: "AnyScale",
  },
  {
    model_name: "Mistral Medium",
    model_endpoint: "mistral-medium",
    model_provider: "AnyScale",
  },
];

export const tiers: Tier[] = [
  {
    name: "individual",
    monthlyPrice: 0,
    yearlyPrice: 0,
    numberOfProjectsAllowed: 10,
    numberOfTeamsAllowed: 0,
    numberOfTeamMembersAllowed: 1,
    bestFor: "individuals working on personal projects",
    description: "10 project limit, no collaboration features",
  },
  {
    name: "team",
    monthlyPrice: 4.99,
    yearlyPrice: 49.99,
    numberOfProjectsAllowed: 100,
    numberOfTeamsAllowed: 5,
    numberOfTeamMembersAllowed: 5,
    bestFor: "small teams collaborating on projects",
    description: "100 project limit, up to 5 team members",
  },
  {
    name: "enterprise",
    monthlyPrice: 19.99,
    yearlyPrice: 179.99,
    numberOfProjectsAllowed: 300,
    numberOfTeamsAllowed: 10,
    numberOfTeamMembersAllowed: 40,
    bestFor: "larger teams and businesses with heavier requirements",
    description: "Unlimited projects, up to 20 team members, SSO support",
  },
];
