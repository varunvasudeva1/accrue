import { getChats, getProjects } from "@/actions";
import Chats from "@/components/Chats";
import Projects from "@/components/Projects";
import { Chat, Project } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Accrue",
  description: "View and manage your projects and chats.",
};

export default async function Index() {
  const projects = (await getProjects()) as Project[];
  const chats = (await getChats()) as Chat[];

  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <h1 className="font-bold text-3xl text-center text-purple-200">
        dashboard
      </h1>
      <div className="flex flex-col xl:flex-row justify-center items-center xl:justify-between xl:items-start space-y-4 xl:space-y-0 xl:space-x-4 w-full">
        <div className="flex flex-col items-start space-y-2 w-full sm:w-3/4 lg:w-2/3">
          <h3 className="font-bold text-2xl text-center text-gray-200">
            projects
          </h3>
          <Suspense
            fallback={<p className="text-xl text-white m-4">Loading...</p>}
          >
            <Projects projects={projects} />
          </Suspense>
        </div>

        <div className="flex flex-col items-start space-y-2 w-full sm:w-3/4 lg:w-2/3">
          <h3 className="font-bold text-2xl text-center text-gray-200">
            chats
          </h3>
          <Suspense
            fallback={<p className="text-xl text-white m-4">Loading...</p>}
          >
            <Chats chats={chats} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
