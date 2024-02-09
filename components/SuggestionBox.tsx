"use client";
import { Project, Suggestions } from "@/types";
import ActionBar from "./ActionBar";
import { useEffect, useState } from "react";
import { updateSuggestions } from "@/actions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SuggestionBox({ project }: { project: Project }) {
  const supabase = createClientComponentClient();
  const [suggestions, setSuggestions] = useState<Suggestions | null>(
    project.suggestions || null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const setSuggestionsNeeded = async (value: boolean) => {
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
    const data = await fetch(`/api/suggestions`, {
      method: "POST",
      body: JSON.stringify({
        project,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const suggestions: Suggestions = await data.json();
    return suggestions;
  };

  /**
   * Effect to set suggestions from project if available
   * or generate them and update project if not available
   */
  useEffect(() => {
    if (!project) {
      return;
    }
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
      generateSuggestions(project).then(async (suggestions) => {
        setSuggestions(suggestions);
        await updateSuggestions({
          project_id: project.project_id,
          suggestions: suggestions,
        });
        setLoading(false);
      });
    }
  }, []);

  const handleRegenerate = async () => {
    setLoading(true);
    setSuggestions(null);
    setSuggestionsNeeded(true);
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
    setSuggestionsNeeded(false);
  };

  return (
    <div className="flex flex-col items-start justify-center w-full sm:w-3/4 lg:w-2/3">
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

      {suggestions ? (
        <div>
          {suggestions.name_suggestions &&
          suggestions.name_suggestions.length > 0 ? (
            <div className="flex flex-col items-start justify-start w-full space-y-1 my-2 lg:my-4">
              <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
                name
              </h3>
              <div className="flex flex-row items-start justify-start space-x-4">
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

          {suggestions.slogan_suggestions &&
          suggestions.slogan_suggestions.length > 0 ? (
            <div className="flex flex-col items-start justify-start w-full space-y-1 my-2 lg:my-4">
              <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
                slogan
              </h3>
              <div className="flex flex-row items-start justify-start space-x-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
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
