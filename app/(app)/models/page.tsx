import { getApiKeys } from "@/actions";
import AddModel from "@/components/AddModel";
import Models from "@/components/Models";
import { APIKey } from "@/types";
import { getAvailableModels } from "@/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Models | Accrue",
  description:
    "Select the model you'd like to use for generating project suggestions.",
};

export default async function Index() {
  const availableApiKeys: APIKey[] | null = await getApiKeys();
  const availableModels = await getAvailableModels(availableApiKeys);
  const modelsByProvider = availableModels.reduce((acc, model) => {
    const provider = model.model_provider || "Local AI";
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(model);
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <h3 className="font-bold text-4xl lg:text-5xl text-center text-purple-200">
        models
      </h3>
      <AddModel availableApiKeys={availableApiKeys} />
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <Models
          modelsByProvider={modelsByProvider}
          availableApiKeys={availableApiKeys}
        />
      </Suspense>
    </div>
  );
}
