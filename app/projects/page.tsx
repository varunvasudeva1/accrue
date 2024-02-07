import { getProjects } from "@/actions";
import Projects from "@/components/Projects";
import { Project } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { RxPlusCircled } from "react-icons/rx";

export const metadata: Metadata = {
  title: "Projects | Accrue",
  description: "Create and manage your projects.",
};

export default async function Index() {
  const projects = (await getProjects()) as Project[];

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between w-full">
        <h3 className="font-bold text-4xl lg:text-5xl text-center text-purple-200 pb-2">
          projects
        </h3>
        <Link
          href="/projects/create"
          className="flex flex-row items-center justify-center px-4 py-2 bg-purple-800 bg-opacity-50 rounded-md
        hover:bg-purple-400 hover:bg-opacity-30 transition duration-150 ease-in-out self-end space-x-2
        "
        >
          <RxPlusCircled className="text-purple-200 text-2xl lg:text-3xl" />
          <h3 className="font-bold text-lg lg:text-xl text-purple-200">
            create project
          </h3>
        </Link>
      </div>
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <Projects projects={projects} />
      </Suspense>
    </div>
  );
}
