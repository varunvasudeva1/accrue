import { updateSuggestions } from "@/actions";
import { Project, Suggestions } from "@/types";
import { headers } from "next/headers";
import SuggestionBoxActions from "./SuggestionBoxActions";

export default async function SuggestionBox({ project }: { project: Project }) {
  const headersList = headers();
  const domain = headersList.get("host");

  const generateSuggestions = async (project: Project) => {
    const data = await fetch(
      `${
        domain === "localhost:3000" ? "http" : "https"
      }://${domain}/api/suggestions`,
      {
        method: "POST",
        body: JSON.stringify({ project }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const suggestions: Suggestions = await data.json();
    return suggestions;
  };

  let suggestions = project.suggestions;

  // If suggestions are not generated or not of type Suggestions, generate them
  if (!suggestions || !(suggestions satisfies Suggestions)) {
    const generatedSuggestions = await generateSuggestions(project);
    await updateSuggestions({
      project_id: project.project_id,
      suggestions: generatedSuggestions,
    });
    suggestions = generatedSuggestions;
  }

  const {
    name_suggestions,
    slogan_suggestions,
    tech_stack_suggestion,
    action_plan_suggestion,
  } = suggestions;

  return (
    <div className="flex flex-col items-start justify-center w-full sm:w-3/4 lg:w-2/3">
      <SuggestionBoxActions project={project} />
      <div className="flex flex-col items-center justify-center w-full space-y-2">
        {name_suggestions && name_suggestions.length > 0 ? (
          <div className="flex flex-col items-start justify-start w-full space-y-1">
            <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
              name
            </h3>
            <div className="flex flex-row items-start justify-start space-x-4">
              {name_suggestions.map((suggestion, index) => (
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

        {slogan_suggestions && slogan_suggestions.length > 0 ? (
          <div className="flex flex-col items-start justify-start w-full space-y-1">
            <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
              slogan
            </h3>
            <div className="flex flex-row items-start justify-start space-x-4">
              {slogan_suggestions.map((suggestion, index) => (
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

        {tech_stack_suggestion ? (
          <div className="flex flex-col items-start justify-start w-full space-y-1">
            <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
              tech stack
            </h3>
            <div className="flex flex-col items-start justify-start w-full">
              <p className="font-medium text-md lg:text-lg text-gray-200">
                {tech_stack_suggestion}
              </p>
            </div>
          </div>
        ) : null}

        {action_plan_suggestion && action_plan_suggestion.length > 0 ? (
          <div className="flex flex-col items-start justify-start w-full space-y-1">
            <h3 className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold">
              action plan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
              {action_plan_suggestion.map((suggestion, index) => (
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
    </div>
  );
}
