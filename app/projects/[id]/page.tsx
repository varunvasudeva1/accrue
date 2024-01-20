"use server";
import { getProject } from "@/actions";
import { Suspense } from "react";

export default async function Index({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  return (
    <div className="flex flex-col items-start justify-start w-screen min-h-screen py-20 px-8 space-y-4">
      <h3 className="font-bold text-xl lg:text-2xl text-purple-200 pt-4">
        project / {params.id}
      </h3>
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <h3 className="font-extrabold text-3xl lg:text-4xl text-purple-400">
          {project?.project_name}
        </h3>
        <p className="text-xl text-white">{project?.project_description}</p>
      </Suspense>
    </div>
  );
}
