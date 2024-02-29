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

  return (
    <div
      key={provider}
      className="flex flex-col items-start w-full sm:w-3/4 lg:w-2/3 space-y-2"
    >
      <div className="flex flex-col justify-start w-full border-b border-gray-300 border-opacity-40 space-y-1">
        <h3 className="font-medium text-xl lg:text-2xl text-white">
          {provider}
        </h3>
        <div className="flex overflow-scroll w-full">
          <p className="text-sm lg:text-md text-gray-200 font-mono">
            {apiKeyValue
              ? `API Key: ${displayedApiKey}`
              : "No API Key available"}
          </p>
        </div>
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
      </div>
      <div className="flex flex-col items-start w-full space-y-2">
        {models.map((model) => (
          <div
            key={model.model_name}
            className="flex flex-col items-start w-full p-4 bg-zinc-800 bg-opacity-50 rounded-md"
          >
            <h4 className="font-bold text-lg lg:text-xl text-purple-200">
              {model.model_name}
            </h4>
            <p className="font-normal text-md lg:text-lg text-gray-200">
              {model.model_url}
            </p>
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
