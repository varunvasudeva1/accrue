"use client";
import { APIKey, Model } from "@/types";
import { BsEye } from "react-icons/bs";
import ActionBarButton from "./ActionBarButton";
import { useState } from "react";
import { GoCopy, GoTrash } from "react-icons/go";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function ModelGroup({
  provider,
  models,
  apiKeyValue,
}: {
  provider: string;
  models: Model[];
  apiKeyValue: string | undefined;
}) {
  const [apiKeyShown, setApiKeyShown] = useState(false);
  const displayedApiKey = apiKeyShown ? apiKeyValue : "xxxx";
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleCopy = async (text: string | undefined) => {
    if (!text) {
      toast.error("No text to copy");
      return;
    }
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleDelete = async (keyName: string) => {
    const { error } = await supabase
      .from("api_keys")
      .delete()
      .eq("key_name", keyName);
    if (error) {
      console.error(error);
    }
    router.refresh();
  };

  const handleDeleteModel = async (model: Model) => {
    const { error } = await supabase
      .from("models")
      .delete()
      .eq("model_id", model.model_id);
    if (error) {
      console.error(error);
      toast.error("Error deleting model. Details: " + error.message);
      return;
    }
    toast.success("Model deleted");
    router.refresh();
  };

  /* Note: Only showing the delete button for those models with model_id is effectively only allowing delete for models stored in the DB and not those managed by ollama/llamacpp or
  cloud models provided by default
   */

  return (
    <div
      key={provider}
      className="flex flex-col items-start w-full sm:w-3/4 lg:w-2/3 space-y-2"
    >
      <div className="flex flex-col justify-start w-full border-b border-gray-300 border-opacity-40 space-y-1">
        <h3 className="font-medium text-xl lg:text-2xl text-white">
          {provider}
        </h3>
        <div className="flex flex-col overflow-scroll w-full space-y-1">
          {apiKeyValue && (
            <p className="text-sm lg:text-md text-gray-200 font-mono">
              API Key: {displayedApiKey}
            </p>
          )}
          {provider.includes("LocalAI") && (
            <p className="text-xs lg:text-sm text-gray-400 pb-1">
              Ollama models shown by default when server is running
            </p>
          )}
        </div>
        {!provider.includes("LocalAI") && (
          <div className="flex flex-row justify-end items-center w-full space-x-4">
            <ActionBarButton
              className="hover:bg-purple-400"
              alt="reveal"
              onClick={() => {
                setApiKeyShown(!apiKeyShown);
              }}
            >
              <BsEye />
            </ActionBarButton>
            <ActionBarButton
              className="hover:bg-purple-400"
              alt="copy"
              onClick={() => handleCopy(apiKeyValue)}
            >
              <GoCopy />
            </ActionBarButton>
            <ActionBarButton
              className="hover:bg-red-400"
              alt="delete"
              onClick={() => handleDelete(`${provider.toUpperCase()}_API_KEY`)}
            >
              <GoTrash />
            </ActionBarButton>
          </div>
        )}
      </div>
      <div className="flex flex-col items-start w-full space-y-2">
        {models.map((model) => (
          <div
            key={model.model_name}
            className="flex flex-row justify-between items-center w-full p-4 bg-zinc-800 bg-opacity-50 rounded-md"
          >
            <div className="flex flex-col items-start w-full">
              <h4 className="font-bold text-lg lg:text-xl text-purple-200">
                {model.model_name}
              </h4>
              <p className="text-sm lg:text-md text-gray-300 font-mono">
                {model.model_endpoint}
              </p>
            </div>

            <div className="flex flex-row justify-end items-center space-x-4">
              <ActionBarButton
                className="hover:bg-purple-400"
                alt="copy"
                onClick={() => handleCopy(model.model_endpoint)}
              >
                <GoCopy />
              </ActionBarButton>
              {model.model_id && (
                <ActionBarButton
                  className="hover:bg-red-400"
                  alt="delete"
                  onClick={() => handleDeleteModel(model)}
                >
                  <GoTrash />
                </ActionBarButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Models({
  modelsByProvider,
  availableApiKeys,
}: {
  modelsByProvider: Record<string, Model[]>;
  availableApiKeys: APIKey[] | null;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-4">
      {Object.keys(modelsByProvider).map((provider) => {
        const availableModels: Model[] = modelsByProvider[provider];
        const baseApiKeyValue = availableApiKeys?.find(
          (key) => key.key_name === `${provider.toUpperCase()}_API_KEY`
        )?.key_value;
        return (
          <ModelGroup
            key={provider}
            provider={provider}
            models={availableModels}
            apiKeyValue={baseApiKeyValue}
          />
        );
      })}
    </div>
  );
}
