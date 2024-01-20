"use server";
import { getProject } from "@/actions";
import { Suspense } from "react";

export default async function Index({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  return (
    <div className="flex flex-col items-start justify-start w-screen min-h-screen py-20 px-8 space-y-8">
      <h1 className="font-bold text-4xl lg:text-5xl text-center text-purple-200 pb-2">
        project / {params.id}
      </h1>
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <h3 className="font-extrabold text-6xl lg:text-8xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-300 m-2">
          {project?.project_name}
        </h3>
        <p className="text-xl text-white">{project?.project_description}</p>
      </Suspense>
    </div>
  );
}
