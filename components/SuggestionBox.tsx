"use client";
import { Model, Project, Suggestions } from "@/types";
import ActionBar from "./ActionBar";
import ModelSwitcher from "./ModelSwitcher";
import { useEffect, useState } from "react";
import { getApiKeys, getUserModels, updateSuggestions } from "@/actions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";

export default function SuggestionBox({ project }: { project: Project }) {
  const supabase = createClientComponentClient();
  const [suggestions, setSuggestions] = useState<Suggestions | null>(
    project.suggestions || null
  );
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateSuggestionsNeeded = async (value: boolean) => {
    const { error } = await supabase
      .from("projects")
      .update({
        suggestions_needed: value,
      })
      .eq("project_id", project.project_id);
    if (error) {
      console.error("Error updating project:", error);
    }
  };

  const generateSuggestions = async (project: Project) => {
    try {
      if (!model) {
        return null;
      }
      const data = await fetch(`/api/suggestions`, {
        method: "POST",
        body: JSON.stringify({
          project: project,
          endpoint: model.model_endpoint,
          provider: model.model_provider,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const suggestions: Suggestions = await data.json();
      // If suggestions are not of the right type, return null
      if (!(suggestions satisfies Suggestions)) {
        return null;
      }

      return suggestions;
    } catch (error) {
      console.error("Error generating suggestions:", error);
      return null;
    }
  };

  /**
   * Effect to set suggestions from project if available
   * or generate them and update project if not available
   */
  useEffect(() => {
    const loadAvailableModels = async () => {
      // If we already have available models, don't fetch again
      if (availableModels.length > 0 || model !== null) return;

      try {
        const availableApiKeys = await getApiKeys();
        const models = await getUserModels(availableApiKeys);
        return models;
      } catch (error) {
        toast.error(
          "Something went wrong getting available models. Please try again."
        );
      }
    };

    const processSuggestions = async (project: Project) => {
      const projectSuggestions = project.suggestions;
      if (projectSuggestions) {
        setSuggestions(projectSuggestions);
      } else {
        // If suggestions were deleted, don't regenerate
        if (project.suggestions_needed === false) {
          return;
        }
        // If no suggestions are needed, don't generate
        if (
          !project.name_needed &&
          !project.logo_needed &&
          !project.slogan_needed &&
          !project.tech_stack_needed &&
          !project.action_plan_needed
        ) {
          return;
        }
        setLoading(true);
        const generatedSuggestions = await generateSuggestions(project);
        setSuggestions(generatedSuggestions);
        await updateSuggestions({
          project_id: project.project_id,
          suggestions: generatedSuggestions,
        });
        setLoading(false);
      }
    };

    const initialize = async () => {
      if (!project) {
        toast.error("No project found. Please try again.");
        return;
      }
      const availableModels = await loadAvailableModels();
      if (availableModels && availableModels.length > 0) {
        setAvailableModels(availableModels);
        setModel(availableModels[0]);
      } else {
        toast.error(
          "No available models found. Please add an API key/local model port to use this feature."
        );
      }
      await processSuggestions(project);
    };

    initialize();
  }, []);

  const handleRegenerate = async () => {
    setLoading(true);
    setSuggestions(null);
    updateSuggestionsNeeded(true);
    const generatedSuggestions = await generateSuggestions(project);
    setSuggestions(generatedSuggestions);
    await updateSuggestions({
      project_id: project.project_id,
      suggestions: generatedSuggestions,
    });
    setLoading(false);
  };

  const handleDelete = async () => {
    setSuggestions(null);
    await updateSuggestions({
      project_id: project.project_id,
      suggestions: null,
    });
    updateSuggestionsNeeded(false);
  };

  return (
    <div className="flex relative flex-col items-start justify-center w-full sm:w-3/4 lg:w-2/3">
      <div className="flex flex-row items-center justify-between w-full border-b border-gray-300 border-opacity-40 mb-2">
        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1">
          suggestions
        </h3>
        <ActionBar
          type="suggestions"
          regenerateSuggestions={handleRegenerate}
          regenerateSuggestionsDisabled={false}
          deleteSuggestions={handleDelete}
          deleteSuggestionsDisabled={false}
        />
      </div>

      <ModelSwitcher
        model={model}
        setModel={setModel}
        availableModels={availableModels}
      />

      {suggestions ? (
        <div className="mt-2">
          {suggestions.name_suggestions &&
          suggestions.name_suggestions.length > 0 ? (
            <div className="flex flex-col items-start justify-start w-full space-y-1 my-2 lg:my-4">
              <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
                name
              </h3>
              <div className="flex flex-row flex-wrap items-start justify-start gap-2">
                {suggestions.name_suggestions.map((suggestion, index) => (
                  <div
                    className="flex flex-col items-start justify-start w-fit bg-zinc-900 rounded-md p-4"
                    key={index}
                  >
                    <p className="font-medium text-md lg:text-lg text-gray-200">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {suggestions.logo_suggestions &&
          suggestions.logo_suggestions.length > 0 ? (
            <div className="flex flex-col items-start justify-start w-full space-y-1 my-2 lg:my-4">
              <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
                logo
              </h3>
              <div className="flex flex-row flex-wrap items-start justify-start gap-2">
                {suggestions.logo_suggestions.map((suggestion, index) => (
                  <div
                    className="flex flex-col items-start justify-start w-fit bg-zinc-900 rounded-md p-4"
                    key={index}
                  >
                    <p className="font-medium text-md lg:text-lg text-gray-200">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {suggestions.slogan_suggestions &&
          suggestions.slogan_suggestions.length > 0 ? (
            <div className="flex flex-col items-start justify-start w-full space-y-1 my-2 lg:my-4">
              <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
                slogan
              </h3>
              <div className="flex flex-row flex-wrap items-start justify-start gap-2">
                {suggestions.slogan_suggestions.map((suggestion, index) => (
                  <div
                    className="flex flex-col items-start justify-start w-fit bg-zinc-900 rounded-md p-4"
                    key={index}
                  >
                    <p className="font-medium text-md lg:text-lg text-gray-200">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {suggestions.tech_stack_suggestion ? (
            <div className="flex flex-col items-start justify-start w-full space-y-1 my-2 lg:my-4">
              <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
                tech stack
              </h3>
              <div className="flex flex-col items-start justify-start w-full">
                <p className="font-medium text-md lg:text-lg text-gray-200">
                  {suggestions.tech_stack_suggestion}
                </p>
              </div>
            </div>
          ) : null}

          {suggestions.action_plan_suggestion &&
          suggestions.action_plan_suggestion.length > 0 ? (
            <div className="flex flex-col items-start justify-start w-full space-y-1 my-2 lg:my-4">
              <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
                action plan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-2 w-full">
                {suggestions.action_plan_suggestion.map((suggestion, index) => (
                  <div
                    className="flex flex-col items-start justify-start w-full bg-zinc-900 rounded-md p-4"
                    key={index}
                  >
                    <p className="font-medium text-md lg:text-lg italic text-purple-200">
                      {suggestion.action}
                    </p>
                    <p className="font-medium text-md lg:text-lg text-gray-200">
                      {suggestion.plan}
                    </p>
                    <p className="font-mono text-md lg:text-lg text-gray-200">
                      T - {suggestion.deadline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          {loading ? (
            <p className="text-lg lg:text-xl text-gray-200">Loading...</p>
          ) : (
            <p className="text-lg lg:text-xl text-gray-200">
              No suggestions available
            </p>
          )}
        </div>
      )}
    </div>
  );
}
