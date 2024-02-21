import { Model, Tier } from "./types";

export const models: Model[] = [
  {
    name: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo-1106",
    tier: "pro",
  },
  {
    name: "GPT-4 Turbo",
    value: "gpt-4-turbo-preview",
    tier: "premium",
  },
  {
    name: "Mistral Tiny",
    value: "mistral-tiny",
    tier: "free",
  },
  {
    name: "Mistral Small",
    value: "mistral-small",
    tier: "pro",
  },
  {
    name: "Mistral Medium",
    value: "mistral-medium",
    tier: "premium",
  },
];

export const tiers: Tier[] = [
  {
    name: "free",
    subscription: true,
    monthlyPrice: 0,
    yearlyPrice: 0,
    oneTimePrice: 0,
    numberOfProjectsAllowed: 4,
    numberOfGenerationsPerProjectAllowed: 10,
    numberOfTeamMembers: 1,
    description:
      "10 suggestion limit per project, 4 project limit, no model choice",
  },
  {
    name: "local",
    subscription: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    oneTimePrice: 19.99,
    numberOfProjectsAllowed: 100,
    numberOfGenerationsPerProjectAllowed: Infinity,
    numberOfTeamMembers: 1,
    description:
      "Unlimited suggestions, 20 project limit, local model compatibility",
  },
  {
    name: "pro",
    subscription: true,
    monthlyPrice: 4.99,
    yearlyPrice: 49.99,
    oneTimePrice: 0,
    numberOfProjectsAllowed: 300,
    numberOfGenerationsPerProjectAllowed: 500,
    numberOfTeamMembers: 5,
    description:
      "Unlimited suggestions, unlimited projects, choice of models like GPT-3.5 Turbo and Mistral Medium, local model compatibility, RAG for project data, up to 5 team members",
  },
  {
    name: "premium",
    subscription: true,
    monthlyPrice: 14.99,
    yearlyPrice: 149.99,
    oneTimePrice: 0,
    numberOfProjectsAllowed: Infinity,
    numberOfGenerationsPerProjectAllowed: Infinity,
    numberOfTeamMembers: 20,
    description:
      "Unlimited suggestions, unlimited projects, choice of models like GPT-4 Turbo and Mistral Medium, local model compatibility, RAG for project data, up to 20 team members, SSO support",
  },
];
