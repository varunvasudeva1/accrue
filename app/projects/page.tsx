"use server";
import { getProjects } from "@/actions";
import { Project } from "@/types";
import Link from "next/link";
import { Suspense } from "react";
import { RxChevronRight } from "react-icons/rx";

export default async function Index() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col items-start justify-start w-screen min-h-screen py-20 px-8 space-y-8">
      <h3 className="font-bold text-4xl lg:text-5xl text-center text-purple-200 pb-2">
        projects
      </h3>
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <div className="flex flex-col items-start justify-start w-full rounded-md overflow-clip">
          {projects &&
            projects?.map((project: Project, index: number) => (
              <Link
                key={index}
                className={`flex flex-row items-center justify-between w-full ${
                  index !== projects.length - 1
                    ? "border-b border-purple-200"
                    : ""
                } px-2 py-4 md:px-4 md:py-6 ${
                  index % 2 === 0 ? "bg-zinc-900" : "bg-transparent"
                }
                hover:bg-purple-400 hover:bg-opacity-30 transition duration-150 ease-in-out
                `}
                href={`/projects/${project.project_id}`}
              >
                <div className="flex flex-col items-start justify-start w-full">
                  <h3 className="font-bold text-xl md:text-2xl text-purple-200">
                    {project.project_name}
                  </h3>
                  <p className="text-purple-200 text-lg md:text-xl">
                    {project.project_description}
                  </p>
                </div>

                <RxChevronRight className="text-purple-200 text-2xl md:text-3xl" />
              </Link>
            ))}
        </div>
      </Suspense>
    </div>
  );
}
