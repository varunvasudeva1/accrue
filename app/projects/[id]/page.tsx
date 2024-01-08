"use client";
import { Project } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

export default async function Index({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const getProject = async () => {
      const project = await fetch("api/projects/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.id }),
      }).then((res) => res.json());
      setProject(project);
    };

    const getSuggestions = async () => {
      // Send the data to the generate API route
      const suggestions = await fetch("api/projects/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const { data } = await suggestions.json();
      console.log(data);
      setSuggestions(data);
    };

    getProject();
    const {
      name_suggestions,
      logo_suggestions,
      slogan_suggestions,
      tech_stack_suggestion,
      action_plan_suggestion,
    } = project as Project;

    if (
      !name_suggestions ||
      !logo_suggestions ||
      !slogan_suggestions ||
      !tech_stack_suggestion ||
      !action_plan_suggestion
    )
      getSuggestions();
  }, []);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-start justify-start w-screen min-h-screen py-20 px-8 space-y-8">
      <h3 className="font-bold text-5xl lg:text-6xl text-center text-purple-200 pb-2 border-b border-purple-200">
        project / {params.id}
      </h3>
      <h1 className="font-extrabold text-6xl lg:text-8xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-300 m-2">
        {project.project_name}
      </h1>
    </div>
  );
}
