import { getProjects } from "@/actions";
import Projects from "@/components/Projects";
import { Project } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BsPlusCircle } from "react-icons/bs";

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
          className="flex flex-row items-center justify-center px-4 py-2 bg-purple-400 bg-opacity-40 rounded-md hover:bg-opacity-30 transition duration-150 ease-in-out self-end sm:self-auto"
        >
          <BsPlusCircle className="text-white text-xl lg:text-2xl" />
          <h3 className="font-normal text-md lg:text-lg text-white font-mono ml-2">
            create
          </h3>
        </Link>
      </div>
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <Projects projects={projects} />
      </Suspense>
    </div>
  );
}
