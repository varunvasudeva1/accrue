import { Model } from "./types";

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

export const freeTierGenerationLimit = 10;
