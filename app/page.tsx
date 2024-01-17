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
        <Link
          href="/projects/create"
          className="flex flex-row items-center bg-gradient-to-tr from-purple-950 to-purple-600 hover:opacity-60 font-semibold m-4 p-4 rounded-full text-white text-lg lg:text-xl transition ease-in-out duration-200 transform-110"
        >
          <TbSparkles className="inline-block mr-2" />
          Get Started
        </Link>
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
      <section className="flex flex-col items-center justify-center w-screen py-20 lg:py-40 px-10">
        <h2 className="font-semibold text-4xl lg:text-5xl text-center text-gray-100 m-4">
          pricing
        </h2>
        <p className="text-gray-300 text-center text-lg lg:text-xl font-medium mb-4 max-w-md lg:max-w-lg xl:max-w-xl">
          Accrue is free to use, but we offer premium features for a monthly
          subscription.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mt-10">
          <Card className="bg-zinc-900 max-w-md border border-gray-200 border-opacity-30">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-300 to-violet-200 text-2xl lg:text-4xl lg:m-1 text-center font-semibold">
              free
            </h3>
            <h4 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-300 to-violet-200 text-xl lg:text-2xl text-center mb-2 font-semibold">
              $0/mo
            </h4>
            <ul className="list-disc list-inside text-gray-300 text-md lg:text-lg font-medium max-w-md lg:max-w-lg xl:max-w-xl min-w-full font-mono space-y-2 mt-4">
              <li>Limit of 4 projects</li>
              <li>100MB storage limit</li>
              <li>Inference with Mistral 7B/8x7B</li>
            </ul>
          </Card>
          <Card className="bg-zinc-900 max-w-md border border-gray-200 border-opacity-30">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-300 text-2xl lg:text-4xl lg:m-1 text-center font-semibold">
              pro
            </h3>
            <h4 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-300 text-xl lg:text-2xl text-center mb-2 font-semibold">
              coming soon
            </h4>{" "}
            <ul className="list-disc list-inside text-gray-300 text-md lg:text-lg font-medium max-w-md lg:max-w-lg xl:max-w-xl min-w-full font-mono space-y-2 mt-4">
              <li>Unlimited projects</li>
              <li>1GB storage limit</li>
              <li>Adds model-switching capabilities</li>
              <li>Adds GPT-3.5-Turbo inference</li>
              <li>Collaborate with up to 5 people</li>
            </ul>
          </Card>
          <Card className="bg-zinc-900 max-w-md border border-gray-200 border-opacity-30">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-700 to-violet-400 text-2xl lg:text-4xl lg:m-1 text-center font-semibold">
              premium
            </h3>
            <h4 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-700 to-violet-400 text-xl lg:text-2xl text-center mb-2 font-semibold">
              coming soon
            </h4>
            <ul className="list-disc list-inside text-gray-300 text-md lg:text-lg font-medium max-w-md lg:max-w-lg xl:max-w-xl min-w-full font-mono space-y-2 mt-4">
              <li>Unlimited projects</li>
              <li>Unlimited storage</li>
              <li>Adds GPT-4-Turbo inference</li>
              <li>Access to all future models</li>
              <li>Collaborate with up to 20 people</li>
              <li>Single Sign-On (SSO)</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
