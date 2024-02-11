import Card from "@/components/Card";
import { TbSparkles } from "react-icons/tb";
import { Metadata } from "next";
import Button from "@/components/Button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Accrue",
  description: "Supercharge and centralize your project planning with Accrue.",
};

export default async function Index() {
  return (
    <div className="flex flex-col items-center overflow-clip bg-black">
      <section className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-black via-purple-950 to-black bg-blur-lg px-10">
        <p className="text-gray-300 text-center text-4xl sm:text-5xl md:text-6xl max-w-2xl font-medium mb-4 w-3/4">
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-300">
            Supercharged{" "}
          </span>
          and
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-violet-500 to-pink-300">
            {" "}
            centralized{" "}
          </span>
          projects
        </p>
        <p className="text-gray-300 text-center text-lg md:text-xl font-medium mb-4 max-w-md lg:max-w-lg xl:max-w-xl">
          Accrue is a combined launchpad/project management platform. Utilize
          generative AI to help you plan projects, consolidate notes and files
          in one place, and chat with your data.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 mt-10">
          <p className="text-gray-200 text-md px-4 py-2">
            Currently in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-200 to-violet-400 font-semibold">
              alpha
            </span>
          </p>
          <Button href="/projects/create">
            <TbSparkles className="inline-block mr-2" />
            Get Started
          </Button>
        </div>
      </section>
      <div className="h-32 bg-gradient-to-b from-black via-purple-950 to-black rotate-3 mt-10 w-[120%]"></div>
      <section className="flex flex-col items-center justify-center w-screen py-20 lg:py-40 px-10">
        <h2 className="font-semibold text-4xl lg:text-5xl text-center text-gray-100 m-4">
          <span className="text-gray-500">
            get things done,
            <br />
          </span>
          smarter & faster
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mt-10">
          <Card className="bg-zinc-900 max-w-md border border-gray-200 border-opacity-30">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-400 text-2xl lg:text-3xl text-center m-2 font-semibold">
              create a project
            </h3>
            <p className="text-gray-300 text-center text-lg lg:text-xl font-medium mb-4 max-w-md">
              Accrue can help you plan your project (complete with milestones
              and deadlines), give suggestions for a tech stack, create names,
              logos, and slogans.
            </p>
          </Card>
          <Card className="bg-zinc-900 max-w-md border border-gray-200 border-opacity-30">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-400 text-2xl lg:text-3xl text-center m-2 font-semibold">
              integrate your resources
            </h3>
            <p className="text-gray-300 text-center text-lg lg:text-xl font-medium mb-4 max-w-md">
              Add notes and files to your project and keep track of your
              progress. Accrue will help you keep track of your deadlines and
              milestones.
            </p>
          </Card>
          <Card className="bg-zinc-900 max-w-md border border-gray-200 border-opacity-30">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-400 text-2xl lg:text-3xl text-center m-2 font-semibold">
              chat with your data
            </h3>
            <p className="text-gray-300 text-center text-lg lg:text-xl font-medium mb-4 max-w-md">
              Using Accrue's natural language interface, you can chat with and
              question your files, notes, and project suggestions.
            </p>
          </Card>
        </div>
      </section>
      <div className="h-32 bg-gradient-to-b from-black via-purple-950 to-black -rotate-3 mt-10 w-[120%]"></div>
    </div>
  );
}
