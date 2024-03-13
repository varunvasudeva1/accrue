import { getApiKeys, getUserModels } from "@/actions";
import AddAPIKey from "@/components/AddAPIKey";
import AddModel from "@/components/AddModel";
import Models from "@/components/Models";
import { APIKey } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Models | Accrue",
  description:
    "Select the model you'd like to use for generating project suggestions.",
};

export default async function Index() {
  const availableApiKeys: APIKey[] | null = await getApiKeys();
  const models = await getUserModels();
  const modelsByProvider = models?.reduce((acc, model) => {
    const provider = model.model_provider.includes("LocalAI")
      ? "LocalAI"
      : model.model_provider;
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(model);
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <h3 className="font-bold text-3xl text-center text-purple-200">models</h3>
      <div className="grid grid-cols sm:grid-cols-2 gap-4 w-full">
        <AddAPIKey availableApiKeys={availableApiKeys} />
        <AddModel availableApiKeys={availableApiKeys} />
      </div>
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <Models
          modelsByProvider={modelsByProvider || {}}
          availableApiKeys={availableApiKeys}
        />
      </Suspense>
    </div>
  );
}
