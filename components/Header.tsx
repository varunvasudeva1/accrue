"use client";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RxChevronRight, RxCross1, RxHamburgerMenu } from "react-icons/rx";

export default function Header({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [headerBackground, setHeaderBackground] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const loggedOutItems = [
    {
      link: "/about",
      title: "about",
    },
    {
      link: "/privacy",
      title: "privacy",
    },
    {
      link: "/pricing",
      title: "pricing",
    },
  ];

  const loggedInItems = [
    {
      link: "/projects/create",
      title: "create",
    },
    {
      link: "/projects",
      title: "projects",
    },
    {
      link: "/upgrade",
      title: "upgrade",
    },
  ];

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    if (!error) {
      router.push("/");
      router.refresh();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHeaderBackground("bg-opacity-50 backdrop-blur-xl");
      } else {
        setHeaderBackground("");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed w-screen justify-center items-center px-4 py-2 z-50 bg-zinc-900 ${
          menuOpen ? "bg-opacity-100 drop-shadow-2xl" : ""
        } ${headerBackground} transition-all ease-in-out duration-500`}
      >
        <div className="flex flex-row justify-start items-center w-full space-x-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-purple-200 text-xl hover:opacity-60 transition ease-in-out duration-150"
          >
            {menuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
          </button>
          <Link
            href="/"
            className="text-2xl font-bold text-purple-200 align-middle mb-1"
          >
            accrue
          </Link>
          <div className="hidden sm:flex flex-row">
            {!user &&
              loggedOutItems.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className="flex items-center justify-between text-md font-semibold text-gray-300 hover:bg-zinc-600 hover:bg-opacity-40 px-2 py-1 rounded-md transition-opacity ease-in-out duration-500"
                  >
                    <button onClick={() => setMenuOpen(false)}>
                      {item.title}
                    </button>
                  </Link>
                );
              })}
            {user &&
              loggedInItems.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className="flex items-center justify-between text-md font-semibold text-gray-300 hover:bg-zinc-600 hover:bg-opacity-40 px-2 py-1 rounded-md transition-opacity ease-in-out duration-500"
                  >
                    <button onClick={() => setMenuOpen(false)}>
                      {item.title}
                    </button>
                  </Link>
                );
              })}
          </div>
        </div>
      </header>

      <Transition
        className="fixed shadow-md p-4 pt-16 space-y-2 bg-zinc-900 bg-opacity-90 z-40 w-screen"
        show={menuOpen}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-y-full opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in-out duration-50 transform"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-full opacity-0"
      >
        <div className="flex sm:hidden flex-row">
          {!user &&
            loggedOutItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className="flex items-center justify-between text-md font-semibold text-gray-300 hover:bg-zinc-600 hover:bg-opacity-40 px-2 py-1 rounded-md transition-opacity ease-in-out duration-500"
                >
                  <button onClick={() => setMenuOpen(false)}>
                    {item.title}
                  </button>
                </Link>
              );
            })}
          {user &&
            loggedInItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className="flex items-center justify-between text-md font-semibold text-gray-300 hover:bg-zinc-600 hover:bg-opacity-40 px-2 py-1 rounded-md transition-opacity ease-in-out duration-500"
                >
                  <button onClick={() => setMenuOpen(false)}>
                    {item.title}
                  </button>
                </Link>
              );
            })}
        </div>
        <div className="border-b border-gray-200 border-opacity-20 w-3/4 sm:hidden"></div>
        <div className="flex flex-col space-y-2">
          <p className="text-sm lg:text-md text-gray-300">
            Signed in as
            <span className="text-purple-900 dark:text-purple-100 font-bold">
              {user ? ` ${user.email}` : " Guest"}
            </span>
          </p>

          <Link
            className="flex flex-row justify-between items-center text-md lg:text-lg text-gray-300 hover:opacity-60 transition-opacity ease-in-out duration-500 group rounded-md border border-gray-200 border-opacity-50 w-fit px-4 py-2"
            href={user ? "" : "/login?mode=sign-in"}
            onClick={() => {
              setMenuOpen(false);
              if (user) signOut();
            }}
          >
            {user ? "Sign out" : "Sign in"}
            <RxChevronRight className="group-hover:translate-x-1 transition-transform ml-2" />
          </Link>
          <p className="text-sm lg:text-md text-gray-300">
            Don't have an account?{" "}
            <Link
              href="/login?mode=sign-up"
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer text-purple-700 dark:text-purple-300 hover:text-opacity-70 font-bold"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </Transition>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-30"
        ></div>
      )}
    </>
  );
}
