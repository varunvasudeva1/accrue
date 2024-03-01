"use client";
import Button from "./Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { APIKey } from "@/types";
import { getCurrentUser } from "@/actions";
import { useRouter } from "next/navigation";
import { modelProviders } from "@/constants";

export default function AddAPIKey({
  availableApiKeys,
}: {
  availableApiKeys: APIKey[] | null;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [providerOptions, setProviderOptions] = useState<string[]>([]);
  const [provider, setProvider] = useState<string>("");
  const [providerApiKey, setProviderApiKey] = useState<string>("");

  useEffect(() => {
    const existingProviders =
      availableApiKeys?.map((key) => key.key_name) || [];
    const providerOptions = modelProviders
      .map((provider) => {
        if (!provider || provider.includes("LocalAI")) {
          return "";
        }
        const formattedProvider = `${provider.toUpperCase()}_API_KEY`;
        if (existingProviders.includes(formattedProvider)) {
          return "";
        }
        return provider;
      })
      .filter((provider) => provider !== "");
    setProviderOptions(providerOptions);
  }, []);

  const handleAddApiKey = async () => {
    const user = await getCurrentUser();
    if (!user) {
      toast.error("No user found");
      return;
    }
    if (!provider || provider === "") {
      toast.error("No provider found");
      return;
    }
    if (!providerApiKey) {
      toast.error("No API Key found");
      return;
    }

    const keyName = `${provider.toUpperCase()}_API_KEY`;
    const apiKey = {
      user_id: user?.id,
      key_name: keyName,
      key_value: providerApiKey,
    };

    // Insert the key into the database
    const { error } = await supabase.from("api_keys").insert([apiKey]);
    if (error) {
      toast.error(`Something went wrong. Details: ${error.message}`);
    }

    setProviderApiKey("");
    toast.success(`${provider} API Key added`);
    router.refresh();
  };

  return (
    <div className="flex flex-col items-start w-full h-full bg-zinc-900 bg-opacity-50 p-2 rounded-md space-y-2 self-center">
      <h3 className="font-bold text-xl lg:text-2xl text-gray-200 pb-2">
        add API key
      </h3>
      <div className="flex flex-row justify-between items-center w-full space-x-2">
        <label className="text-white">Provider</label>
        <select
          onChange={(e) => {
            setProvider(e.target.value);
          }}
          className="w-full p-2 bg-zinc-800 bg-opacity-50 rounded-md text-white max-w-md font-mono text-sm lg:text-md"
        >
          {providerOptions.map(
            (provider) =>
              provider && (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              )
          )}
        </select>
      </div>

      <div className="flex flex-row justify-between items-center w-full space-x-2">
        <label className="text-white">Value</label>
        <input
          type="text"
          onChange={(e) => {
            setProviderApiKey(e.target.value);
          }}
          placeholder="my-api-key"
          className="w-full p-2 bg-zinc-800 bg-opacity-50 rounded-md text-white max-w-md font-mono text-sm lg:text-md"
        />
      </div>
      <div className="flex flex-row justify-end items-end w-full h-full">
        <Button onClick={handleAddApiKey}>
          <p className="text-white text-sm">Add API Key</p>
        </Button>
      </div>
    </div>
  );
}
