import { defaultModels } from "./constants";
import { APIKey } from "./types";

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
