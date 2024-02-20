import { getCurrentUserTier, getProject } from "@/actions";
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
        ? "(untitled)"
        : project.project_name
    } | Accrue`,
  };
}

export default async function Index({ params }: { params: { id: string } }) {
  const project: Project = (await getProject(params.id)) as Project;
  const userTier = await getCurrentUserTier();

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <div className="flex flex-col items-center justify-center w-full">
        <Suspense
          fallback={<p className="text-xl text-white m-4">Loading form...</p>}
        >
          <EditableForm project={project} />
        </Suspense>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <SuggestionBox tier={userTier} project={project} />
      </div>
    </div>
  );
}
