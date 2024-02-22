import Card from "@/components/Card";
import { TbSparkles } from "react-icons/tb";
import { Metadata } from "next";
import Button from "@/components/Button";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiLock2Fill } from "react-icons/ri";
import { PiLightningFill } from "react-icons/pi";

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
          Accrue is an open-source, chat + project management platform. Utilize
          generative AI to help you plan projects, consolidate notes, files, and
          chats in one place, and talk to your data using RAG.
        </p>
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <p className="text-gray-200 text-md px-4 py-2">
            Currently in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-200 to-violet-400 font-semibold">
              alpha
            </span>
          </p>
          <Button href="/projects/create" className="w-44">
            <TbSparkles className="text-white text-xl lg:text-2xl mr-2" />
            Get Started
          </Button>
        </div>
      </section>
      <div className="h-32 bg-gradient-to-b from-black via-purple-950 to-black -rotate-3 mt-10 w-[120%]"></div>
      <section className="flex flex-col items-center justify-center w-screen md:w-1/2 xl:w-1/3 py-20 lg:py-40 px-10 space-y-6">
        <div className="flex flex-col items-start justify-center w-full">
          <BsFillPeopleFill className="text-4xl lg:text-6xl text-purple-200" />
          <h3 className="font-bold text-2xl lg:text-3xl text-white pb-2">
            open-source
          </h3>
          <p className="text-md lg:text-lg text-gray-200 leading-relaxed">
            Accrue is open-source and free to use for individuals. We offer
            premium features for teams and organizations for a monthly
            subscription.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center w-full">
          <RiLock2Fill className="text-4xl lg:text-6xl text-purple-200" />
          <h3 className="font-bold text-2xl lg:text-3xl text-white pb-2">
            private
          </h3>
          <p className="text-md lg:text-lg text-gray-200 leading-relaxed">
            All of your data is encrypted and stored securely. We do not sell
            your data to third parties and we do not use your data for
            advertising or training language models.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center w-full">
          <PiLightningFill className="text-4xl lg:text-6xl text-purple-200" />
          <h3 className="font-bold text-2xl lg:text-3xl text-white pb-2">
            performant
          </h3>
          <p className="text-md lg:text-lg text-gray-200 leading-relaxed">
            Accrue is built with performance in mind. We use NextJS for the
            frontend to utilize server-side rendering and Supabase for the
            backend. Generative AI features run on the edge to minimize latency
            and give you the fastest experience.
          </p>
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
            <p className="text-gray-300 text-center text-md lg:text-lg font-medium mb-4 max-w-md">
              Accrue can help you plan your project (complete with milestones
              and deadlines), give suggestions for a tech stack, create names,
              logos, and slogans.
            </p>
          </Card>
          <Card className="bg-zinc-900 max-w-md border border-gray-200 border-opacity-30">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-400 text-2xl lg:text-3xl text-center m-2 font-semibold">
              integrate your resources
            </h3>
            <p className="text-gray-300 text-center text-md lg:text-lg font-medium mb-4 max-w-md">
              Add notes and files to your project and keep track of your
              progress. Accrue will help you keep track of your deadlines and
              milestones.
            </p>
          </Card>
          <Card className="bg-zinc-900 max-w-md border border-gray-200 border-opacity-30">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-400 text-2xl lg:text-3xl text-center m-2 font-semibold">
              chat with your data
            </h3>
            <p className="text-gray-300 text-center text-md lg:text-lg font-medium mb-4 max-w-md">
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
