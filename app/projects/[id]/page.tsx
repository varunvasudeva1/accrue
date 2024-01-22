import { getProject } from "@/actions";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Project | Accrue",
  description: "Supercharge and centralize your project planning with Accrue.",
};

export default async function Index({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <div className="flex flex-col items-start justify-start w-full border-b border-gray-300 border-opacity-40 py-2">
          <h3 className="font-bold text-3xl lg:text-4xl text-purple-400 items-center">
            {project?.project_name}
          </h3>
          <p className="font-medium text-md lg:text-lg text-purple-200">
            {project?.project_id}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full sm:w-3/4 lg:w-2/3">
            <div className="flex flex-col items-start justify-center w-full">
              <h3 className="font-semibold text-md lg:text-lg text-purple-200">
                description
              </h3>
              <textarea
                className="text-md lg:text-lg text-gray-100 bg-zinc-800 bg-opacity-50 rounded-md w-full p-2 my-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60"
                defaultValue={project?.project_description}
              />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
