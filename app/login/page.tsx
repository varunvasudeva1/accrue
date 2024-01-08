import Link from "next/link";
import Messages from "./messages";

export default function Login({ searchParams }: { searchParams: any }) {
  let {
    mode,
    email,
  }: {
    mode: "sign-in" | "sign-up";
    email?: string;
  } = searchParams;
  if (!mode) {
    mode = "sign-up";
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen px-4 lg:px-8 py-20">
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
          {mode === "sign-up" && (
            <>
              <label
                className="text-md lg:text-lg font-semibold text-white"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border border-gray-300"
                name="name"
                placeholder="John Doe"
                required
              />
            </>
          )}
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
          <button
            formAction={`/auth/${mode}`}
            className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-6 mx-4 my-1 rounded-lg font-semibold text-lg hover:scale-110 hover:bg-opacity-80 transition-all ease-in-out duration-300"
          >
            {mode === "sign-in" ? "Sign In" : "Sign Up"}
          </button>
          <Messages />
        </form>
      </div>
    </div>
  );
}
