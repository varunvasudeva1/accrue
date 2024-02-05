"use client";
import { Project, Suggestions } from "@/types";
import ActionBar from "./ActionBar";
import { updateSuggestions } from "@/actions";
import { useRouter } from "next/navigation";

export default function SuggestionBoxActions({
  project,
}: {
  project: Project;
}) {
  const router = useRouter();
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

  const handleRegenerate = async () => {
    const generatedSuggestions = await generateSuggestions(project);
    await updateSuggestions({
      project_id: project.project_id,
      suggestions: generatedSuggestions,
    });
    router.refresh();
  };

  const handleDelete = async () => {
    await updateSuggestions({
      project_id: project.project_id,
      suggestions: null,
    });
    router.refresh();
  };

  return (
    <div className="flex flex-row items-center justify-between w-full">
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
  );
}
