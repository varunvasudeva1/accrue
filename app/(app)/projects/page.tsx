import { getCurrentUserTier, getProjects } from "@/actions";
import Button from "@/components/Button";
import Projects from "@/components/Projects";
import { tiers } from "@/constants";
import { Project, Tier } from "@/types";
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
  const userTier = (await getCurrentUserTier()) as Tier["name"];
  const projectLimit = tiers.find((t) => t.name === userTier)
    ?.numberOfProjectsAllowed as number;

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <div className="flex flex-col items-start w-full">
        <h3 className="font-bold text-4xl lg:text-5xl text-center text-purple-200">
          projects
        </h3>
        <div className="flex flex-col space-y-2 self-end place-items-end">
          <Button
            href="/projects/create"
            disabled={projects.length >= projectLimit}
          >
            <BsPlusCircle className="text-white text-xl lg:text-2xl" />
            <h3 className="font-normal text-md lg:text-lg text-white font-mono ml-2">
              create
            </h3>
          </Button>
          <p className="text-sm lg:text-md text-gray-200 font-mono text-end">
            {projects.length} of {projectLimit} projects used
            {projects.length >= projectLimit ? (
              <span>
                .{" "}
                <Link
                  href="/upgrade"
                  className="text-purple-200 hover:underline"
                >
                  Upgrade to create more
                </Link>
              </span>
            ) : null}
          </p>
        </div>
      </div>
      <Suspense fallback={<p className="text-xl text-white m-4">Loading...</p>}>
        <Projects projects={projects} />
      </Suspense>
    </div>
  );
}
