import { getCurrentUserTier, getProjects } from "@/actions";
import Projects from "@/components/Projects";
import { tiers } from "@/constants";
import { Project, Tier } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-start space-y-4 w-full sm:w-3/4 lg:w-2/3">
        <h3 className="font-bold text-3xl text-center text-purple-200">
          projects
        </h3>
        <Suspense
          fallback={<p className="text-xl text-white m-4">Loading...</p>}
        >
          <Projects projects={projects} projectLimit={projectLimit} />
        </Suspense>
      </div>
    </div>
  );
}
