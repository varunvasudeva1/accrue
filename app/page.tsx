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
      <section className="flex flex-col items-center justify-center w-screen h-screen">
        <h1 className="font-extrabold text-6xl lg:text-8xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-300 m-2">
          Welcome to Accrue!
        </h1>
        <p className="text-gray-300 text-center text-2xl lg:text-3xl font-medium mb-4 w-3/4">
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-900 to-violet-300 font-bold">
            Supercharge{" "}
          </span>
          projects with generative AI and
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-violet-900 to-pink-300 font-bold">
            {" "}
            centralize{" "}
          </span>
          resources in one place
        </p>
        <Link
          href="/new-project"
          className="bg-gradient-to-tr from-purple-950 to-purple-500 hover:opacity-60 font-semibold p-4 rounded-lg text-white text-lg lg:text-xl transition ease-in-out duration-300 transform hover:scale-105"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
