import { Model, Tier } from "./types";

export const models: Model[] = [
  {
    name: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo-1106",
  },
  {
    name: "GPT-4 Turbo",
    value: "gpt-4-turbo-preview",
  },
  {
    name: "Mistral Tiny",
    value: "mistral-tiny",
  },
  {
    name: "Mistral Small",
    value: "mistral-small",
  },
  {
    name: "Mistral Medium",
    value: "mistral-medium",
  },
];

export const tiers: Tier[] = [
  {
    name: "individual",
    monthlyPrice: 0,
    yearlyPrice: 0,
    numberOfProjectsAllowed: 4,
    numberOfGenerationsPerProjectAllowed: 10,
    numberOfTeamsAllowed: 0,
    numberOfTeamMembersAllowed: 1,
    bestFor: "individuals working on personal projects",
    description: "4 project limit, no collaboration features",
  },
  {
    name: "team",
    monthlyPrice: 4.99,
    yearlyPrice: 49.99,
    numberOfProjectsAllowed: 100,
    numberOfGenerationsPerProjectAllowed: 50,
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
    numberOfGenerationsPerProjectAllowed: 100,
    numberOfTeamsAllowed: 10,
    numberOfTeamMembersAllowed: 40,
    bestFor: "larger teams and businesses with heavier requirements",
    description: "Unlimited projects, up to 20 team members, SSO support",
  },
];
