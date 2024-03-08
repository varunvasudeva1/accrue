"use client";
import { Project } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RxChevronRight } from "react-icons/rx";
import { formatDistance } from "date-fns";
import { BsPlusCircle } from "react-icons/bs";
import Button from "./Button";

export default function Projects({
  projects,
  projectLimit,
}: {
  projects: Project[];
  projectLimit?: number | undefined;
}) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  const showDescription = (description: string) => {
    if (description.length > 50) {
      return description.slice(0, 50) + "...";
    }
    return description;
  };

  const lastUpdated = projects.map((project) =>
    formatDistance(new Date(project.updated_at), new Date(), {
      addSuffix: true,
    })
  );

  return (
    <div className="flex flex-col items-center justify-start self-center w-full sm:w-3/4 lg:w-2/3 space-y-2">
      <Button className="self-end" href="/projects/create">
        <BsPlusCircle className="text-white text-md sm:text-lg" />
        <h3 className="font-normal text-sm sm:text-md text-white font-mono ml-2">
          project
        </h3>
      </Button>
      {projectLimit && (
        <p className="text-sm lg:text-md text-gray-200 font-mono text-end self-end">
          {projects.length} of {projectLimit} projects used
          {projects.length >= projectLimit ? (
            <span>
              .{" "}
              <Link href="/upgrade" className="text-purple-200 hover:underline">
                Upgrade to create more
              </Link>
            </span>
          ) : null}
        </p>
      )}
      {projects &&
        projects?.map((project: Project, index: number) => (
          <Link
            key={index}
            className="flex flex-row items-center justify-between w-full p-3 bg-zinc-800 bg-opacity-50 rounded-md hover:bg-purple-400 hover:bg-opacity-30 transition duration-150 ease-in-out"
            href={`/projects/${project.project_id}`}
          >
            <div className="flex flex-col items-start justify-start w-full">
              <h3 className="font-bold text-lg lg:text-xl text-purple-200">
                {project.project_name || "(untitled)"}
              </h3>
              <p className="text-white text-sm lg:text-md">
                {showDescription(project.project_description)}
              </p>
              <p className="text-gray-300 text-sm lg:text-md">
                last updated {lastUpdated[index]}
              </p>
            </div>
            <RxChevronRight className="text-purple-200 text-2xl lg:text-3xl" />
          </Link>
        ))}
    </div>
  );
}
