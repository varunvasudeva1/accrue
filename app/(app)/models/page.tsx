import { getApiKeys } from "@/actions";
import Button from "@/components/Button";
import Models from "@/components/Models";
import { APIKey } from "@/types";
import { getAvailableModels } from "@/utils";
import { Metadata } from "next";
import { Suspense } from "react";
import { BsPlusCircle } from "react-icons/bs";

export const metadata: Metadata = {
  title: "Models | Accrue",
  description:
    "Select the model you'd like to use for generating project suggestions.",
};

export default async function Index() {
  const availableApiKeys: APIKey[] | null = await getApiKeys();
  const availableModels = await getAvailableModels(availableApiKeys);
  const modelsByProvider = availableModels.reduce((acc, model) => {
    const provider = model.provider || "Local AI";
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(model);
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between w-full">
        <h3 className="font-bold text-4xl lg:text-5xl text-center text-purple-200">
          models
        </h3>
        <div className="flex flex-col space-y-2 self-end place-items-end">
          <Button>
            <BsPlusCircle className="text-white text-xl lg:text-2xl" />
            <h3 className="font-normal text-md lg:text-lg text-white font-mono ml-2">
              add
            </h3>
          </Button>
        </div>
      </div>
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <Models
          modelsByProvider={modelsByProvider}
          availableApiKeys={availableApiKeys}
        />
      </Suspense>
    </div>
  );
}
