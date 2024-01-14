import Card from "@/components/Card";
import { TbSparkles } from "react-icons/tb";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center">
      <section className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
        <h1 className="font-extrabold text-6xl lg:text-8xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-300 m-2">
          accrue
        </h1>
        <p className="text-gray-300 text-center text-2xl lg:text-3xl max-w-2xl font-medium mb-4 w-3/4">
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-900 to-violet-300 font-bold">
            supercharge{" "}
          </span>
          projects with generative AI and
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-violet-900 to-pink-300 font-bold">
            {" "}
            centralize{" "}
          </span>
          resources in one place
        </p>
        <Link
          href="/projects/create"
          className="flex flex-row items-center bg-gradient-to-tr from-purple-950 to-purple-500 hover:opacity-60 font-semibold m-4 p-4 rounded-lg text-white text-lg lg:text-xl transition ease-in-out duration-200 transform-110"
        >
          <TbSparkles className="inline-block mr-2" />
          Get Started
        </Link>
      </section>
      <div className="w-screen h-5 bg-gradient-to-r from-purple-900 to-purple-300"></div>
      <section className="flex flex-col items-center justify-center w-screen py-10">
        <h2 className="font-bold text-4xl lg:text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-300 m-2">
          how it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mt-10">
          <Card>
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-400 text-2xl lg:text-4xl text-center m-2 font-semibold">
              create a project
            </h3>
            <p className="text-gray-300 text-center text-lg lg:text-xl font-medium mb-4 w-3/4">
              It can help you plan your project (complete with milestones and
              deadlines), give suggestions for a tech stack, create names,
              logos, and slogans.
            </p>
          </Card>
          <Card>
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-400 text-2xl lg:text-4xl text-center m-2 font-semibold">
              integrate your resources
            </h3>
            <p className="text-gray-300 text-center text-lg lg:text-xl font-medium mb-4 w-3/4">
              Add notes and files to your project and keep track of your
              progress. Accrue uses retrieval-augmented generation (RAG) to help
              you find what you need.
            </p>
          </Card>
          <Card>
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-400 text-2xl lg:text-4xl text-center m-2 font-semibold">
              chat with your data
            </h3>
            <p className="text-gray-300 text-center text-lg lg:text-xl font-medium mb-4 w-3/4">
              Using Accrue's natural language interface, powered by GPT-3.5 and
              GPT-4, you can ask Accrue questions about your project
              suggestions, gather new insights, and more.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
