"use client";
import { Tab } from "@headlessui/react";
import Button from "./Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { APIKey } from "@/types";
import { useRouter } from "next/navigation";
import { modelProviders } from "@/constants";
import { getCurrentUser } from "@/actions";
import { toast } from "react-toastify";

export default function AddModel({
  availableApiKeys,
}: {
  availableApiKeys: APIKey[] | null;
}) {
  const existingProviders = availableApiKeys?.map((key) => key.key_name) || [];
  const providerOptions = modelProviders.map((provider) => {
    const formattedProvider = `${provider.toUpperCase()}_API_KEY`;
    if (existingProviders.includes(formattedProvider)) {
      return provider;
    }
  });

  const router = useRouter();
  const supabase = createClientComponentClient();
  const [cloudModelToAdd, setCloudModelToAdd] = useState({
    model_provider: providerOptions[0],
    model_name: "",
    model_endpoint: "",
  });
  const [localModelToAdd, setLocalModelToAdd] = useState({
    model_name: "",
    model_endpoint: "",
  });

  const addModel = async (model: any) => {
    const user = await getCurrentUser();
    const { error } = await supabase.from("models").insert([
      {
        user_id: user?.id,
        model_provider: model.model_provider,
        model_name: model.model_name,
        model_endpoint: model.model_endpoint,
      },
    ]);
    if (error) {
      console.error(error);
      toast.error("Error adding model");
    }
    toast.success("Model added");
    router.refresh();
  };

  const handleAddCloudModel = async () => {
    const { model_provider, model_name, model_endpoint } = cloudModelToAdd;
    if (!model_provider || !model_name || !model_endpoint) {
      return;
    }
    const model = {
      model_provider,
      model_name,
      model_endpoint,
    };
    addModel(model);
  };

  const handleAddLocalModel = async () => {
    const { model_name, model_endpoint } = localModelToAdd;
    if (!model_name || !model_endpoint) {
      toast.error("Missing model name or endpoint");
      return;
    }
    const model = {
      model_provider: "LocalAI",
      model_name,
      model_endpoint,
    };
    addModel(model);
  };

  return (
    <div className="flex flex-col items-start w-full h-full bg-zinc-900 bg-opacity-50 p-2 rounded-md space-y-2 self-center">
      <h3 className="font-bold text-xl lg:text-2xl text-gray-200 pb-2">
        add model
      </h3>
      <Tab.Group>
        <Tab.List className="flex flex-row w-full space-x-1 p-2 self-center">
          <Tab
            as="div"
            className="flex flex-row items-center justify-center w-full"
          >
            {({ selected }) => (
              <button
                className={`flex justify-center items-center w-full h-full text-sm md:text-md text-white font-semibold py-2 ${
                  selected
                    ? "bg-purple-500 bg-opacity-20"
                    : "bg-zinc-800 bg-opacity-50"
                } rounded-md overflow-clip`}
              >
                Local
              </button>
            )}
          </Tab>

          <Tab
            as="div"
            className="flex flex-row items-center justify-center w-full"
          >
            {({ selected }) => (
              <button
                className={`flex justify-center items-center w-full h-full text-sm md:text-md text-white font-semibold py-2 ${
                  selected
                    ? "bg-purple-500 bg-opacity-20"
                    : "bg-zinc-800 bg-opacity-50"
                } rounded-md overflow-clip`}
              >
                Cloud
              </button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels className="flex flex-col items-center w-full mt-2">
          <Tab.Panel className="flex flex-col items-start w-full space-y-2">
            <p className="text-xs lg:text-sm text-gray-400 font-mono">
              Only necessary for models served locally without Ollama
            </p>
            <div className="flex flex-row justify-between items-center w-full space-x-2">
              <label className="text-white">Name</label>
              <input
                type="text"
                placeholder="MyCoolModel"
                onChange={(e) =>
                  setLocalModelToAdd({
                    ...localModelToAdd,
                    model_name: e.target.value,
                  })
                }
                className="w-full p-2 bg-zinc-800 bg-opacity-50 rounded-md text-white max-w-md font-mono text-sm lg:text-md"
              />
            </div>

            <div className="flex flex-row justify-between items-center w-full space-x-2">
              <label className="text-white">URL</label>
              <input
                type="text"
                placeholder="http://localhost:12345"
                onChange={(e) =>
                  setLocalModelToAdd({
                    ...localModelToAdd,
                    model_endpoint: e.target.value,
                  })
                }
                className="w-full p-2 bg-zinc-800 bg-opacity-50 rounded-md text-white max-w-md font-mono text-sm lg:text-md"
              />
            </div>
            <Button className="self-end" onClick={handleAddLocalModel}>
              <p className="text-white text-sm">Add Model</p>
            </Button>
          </Tab.Panel>

          <Tab.Panel className="flex flex-col items-start w-full space-y-2">
            <div className="flex flex-row justify-between items-center w-full space-x-2">
              <label className="text-white">Provider</label>
              <select
                onChange={(e) => {
                  setCloudModelToAdd({
                    ...cloudModelToAdd,
                    model_provider: e.target.value,
                  });
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
              <label className="text-white">Name</label>
              <input
                type="text"
                onChange={(e) =>
                  setCloudModelToAdd({
                    ...cloudModelToAdd,
                    model_name: e.target.value,
                  })
                }
                placeholder="MyCoolModel"
                className="w-full p-2 bg-zinc-800 bg-opacity-50 rounded-md text-white max-w-md font-mono text-sm lg:text-md"
              />
            </div>

            <div className="flex flex-row justify-between items-center w-full space-x-2">
              <label className="text-white">Endpoint</label>
              <input
                type="text"
                onChange={(e) =>
                  setCloudModelToAdd({
                    ...cloudModelToAdd,
                    model_endpoint: e.target.value,
                  })
                }
                placeholder="gpt-3.5-turbo-1106"
                className="w-full p-2 bg-zinc-800 bg-opacity-50 rounded-md text-white max-w-md font-mono text-sm lg:text-md"
              />
            </div>
            <div className="flex flex-row justify-end items-end w-full h-full">
              <Button className="self-end" onClick={handleAddCloudModel}>
                <p className="text-white text-sm">Add Model</p>
              </Button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
