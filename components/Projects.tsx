"use client";
import { Project } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { RxChevronRight } from "react-icons/rx";

export default function Projects({ projects }: { projects: Project[] }) {
  const router = useRouter();
  useLayoutEffect(() => {
    router.refresh();
  });

  return (
    <div className="flex flex-col items-center justify-start w-full space-y-2">
      {projects &&
        projects?.map((project: Project, index: number) => (
          <Link
            key={index}
            className={`flex flex-row items-center justify-between w-full sm:w-3/4 lg:w-2/3 px-4 py-4 lg:py-6 bg-zinc-800 bg-opacity-50 rounded-md
                hover:bg-purple-400 hover:bg-opacity-30 transition duration-150 ease-in-out
                `}
            href={`/projects/${project.project_id}`}
          >
            <div className="flex flex-col items-start justify-start w-full">
              <h3 className="font-bold text-lg lg:text-xl text-purple-400">
                {project.project_name || "(untitled)"}
              </h3>
              <p className="text-purple-200 text-md lg:text-lg">
                {project.project_description}
              </p>
            </div>
            <RxChevronRight className="text-purple-200 text-2xl lg:text-3xl" />
          </Link>
        ))}
    </div>
  );
}
