import Link from "next/link";
import Messages from "./messages";
import { Metadata } from "next";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Login | Accrue",
  description: "Supercharge and centralize your project planning with Accrue.",
};

export default function Login({ searchParams }: { searchParams: any }) {
  let {
    mode,
  }: {
    mode: "sign-in" | "sign-up";
  } = searchParams;
  if (!mode) {
    mode = "sign-in";
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen px-4 lg:px-8 py-20 bg-gradient-to-tr from-black to-purple-950">
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-3xl lg:text-4xl text-white font-bold">
          {mode === "sign-in" ? "Welcome Back!" : "Create an Account"}
        </h1>
        <p className="text-gray-200 text-md lg:text-lg mb-4">
          {mode === "sign-in"
            ? "Sign in to your account to jump back in"
            : "Sign up for an account to get started"}
        </p>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action={`/auth/${mode}`}
          method="post"
        >
          <label
            className="text-md lg:text-lg font-semibold text-gray-300"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-gray-300"
            name="email"
            placeholder="test@example.com"
            required
          />
          <label
            className="text-md lg:text-lg font-semibold text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-gray-300"
            name="password"
            type="password"
            placeholder="********"
            required
          />
          <br />
          <Button className="self-center" formAction={`/auth/${mode}`}>
            {mode === "sign-in" ? "Sign In" : "Sign Up"}
          </Button>
          <div className="flex flex-row items-center justify-center w-full">
            <p className="text-gray-300 text-md lg:text-lg">
              {mode === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={`/login?mode=${mode === "sign-in" ? "sign-up" : "sign-in"}`}
              className="text-purple-700 dark:text-purple-300 font-bold hover:opacity-80 transition-all ease-in-out duration-300 mx-2"
            >
              {mode === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
          <Messages />
        </form>
      </div>
    </div>
  );
}
