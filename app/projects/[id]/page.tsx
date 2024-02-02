import { getProject, updateSuggestions } from "@/actions";
import EditableForm from "@/components/EditableForm";
import SuggestionBox from "@/components/SuggestionBox";
import { Project } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const project: Project = (await getProject(id)) as Project;

  return {
    title: `${
      !project.project_name || project.project_name === ""
        ? "Untitled Project"
        : project.project_name
    } | Accrue`,
  };
}

export default async function Index({ params }: { params: { id: string } }) {
  const project: Project = (await getProject(params.id)) as Project;

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <Suspense
        fallback={<p className="text-xl text-white m-4">Loading project...</p>}
      >
        <div className="flex flex-col items-start justify-start w-full border-b border-gray-300 border-opacity-40 py-2">
          <h3 className="font-bold text-3xl lg:text-4xl text-white items-center">
            {project.project_name}
          </h3>
          <p className="font-medium text-md lg:text-lg text-purple-200">
            {params.id}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <Suspense
            fallback={<p className="text-xl text-white m-4">Loading form...</p>}
          >
            <EditableForm project={project} />
          </Suspense>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <Suspense
            fallback={
              <p className="text-xl text-white m-4">Loading suggestions...</p>
            }
          >
            <SuggestionBox project={project} />
          </Suspense>
        </div>
      </Suspense>
    </div>
  );
}
