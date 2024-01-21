"use client";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  RxChevronRight,
  RxHamburgerMenu,
  RxCross1,
} from "react-icons/rx/index";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Transition } from "@headlessui/react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    {
      link: "/",
      title: "Home",
      loggedIn: false,
    },
    {
      link: "/projects",
      title: "Projects",
      loggedIn: true,
    },
    {
      link: "/settings",
      title: "Settings",
      loggedIn: true,
    },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) console.log("Error fetching user", error);
      setUser(user.user);
    };
    getUser();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <html lang="en">
      <body className="bg-white dark:bg-zinc-950">
        <header className="fixed w-screen justify-between items-center bg-white dark:bg-zinc-900 z-30 shadow-md p-4 max-h-20">
          <div className="flex flex-row items-center justify-start space-x-4 w-full">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-purple-800 dark:text-purple-100 text-xl hover:opacity-60 transition ease-in-out duration-150"
            >
              <RxHamburgerMenu />
            </button>
            <Link
              href="/"
              className="text-2xl lg:text-3xl font-bold text-purple-800 dark:text-purple-100 mb-1"
            >
              accrue
            </Link>
          </div>
        </header>
        <div className="flex flex-row">
          <Transition
            className="fixed z-50 top-0 left-0 w-56 h-screen bg-white dark:bg-zinc-800 shadow-lg overflow-y-auto"
            show={sidebarOpen}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-100 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <nav
              id="default-sidebar"
              className={`fixed flex flex-col justify-start items-start top-0 left-0 w-56 p-4 h-screen bg-white dark:bg-zinc-800 z-50 shadow-lg overflow-y-auto ${
                sidebarOpen
                  ? "transform translate-x-0 ease-in"
                  : "transform -translate-x-full ease-out"
              }`}
              aria-label="Sidebar"
            >
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-purple-800 dark:text-purple-100 font-medium text-xl hover:opacity-60 transition ease-in-out duration-150 mt-2"
                >
                  <RxCross1 />
                </button>
                {items.map((item, index) => {
                  if (item.loggedIn && !user) return null;
                  return (
                    <Link
                      key={index}
                      href={item.link}
                      className="flex items-center justify-between text-md lg:text-lg font-semibold text-gray-700 dark:text-gray-300 hover:opacity-40 transition-opacity ease-in-out duration-500"
                    >
                      <button onClick={() => setSidebarOpen(false)}>
                        {item.title}
                      </button>
                    </Link>
                  );
                })}
              </div>
              <div className="border-b border-gray-200 w-full my-7"></div>
              <div className="flex flex-col space-y-2">
                <p className="text-sm lg:text-md text-gray-700 dark:text-gray-300">
                  Signed in as
                  <span className="text-purple-900 dark:text-purple-100 font-bold">
                    {user ? ` ${user.email}` : " Guest"}
                  </span>
                </p>
                {user ? (
                  <button
                    className="flex flex-row justify-between items-center w-full focus:outline-none text-md lg:text-lg text-gray-700 dark:text-gray-300 hover:opacity-60 transition-opacity ease-in-out duration-500 border border-gray-700 dark:border-gray-300 rounded-md p-2 group"
                    onClick={() => {
                      setSidebarOpen(false);
                      signOut();
                    }}
                  >
                    Sign Out
                    <RxChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <Link
                    className="flex flex-row justify-between items-center w-full focus:outline-none text-md lg:text-lg text-gray-700 dark:text-gray-300 hover:opacity-60 transition-opacity ease-in-out duration-500 border border-gray-700 dark:border-gray-300 rounded-md p-2 group"
                    href={user ? "/auth/sign-out" : "/login?mode=sign-in"}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Sign In
                    <RxChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                <p className="text-sm lg:text-md text-gray-700 dark:text-gray-300">
                  Don't have an account?{" "}
                  <Link
                    href="/login?mode=sign-up"
                    onClick={() => setSidebarOpen(false)}
                    className="cursor-pointer text-purple-700 dark:text-purple-300 hover:text-opacity-70 font-bold"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </nav>
          </Transition>
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="w-screen h-screen bg-zinc-900 opacity-50 fixed top-0 left-0 z-40"
            ></div>
          )}
          <main className="flex flex-col justify-start items-start w-screen min-h-screen">
            {children}
          </main>
          <ToastContainer
            toastClassName="border-2 border-purple-300"
            bodyClassName="text-md lg:text-lg text-white font-light"
            position="bottom-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="dark"
          />
        </div>
        <footer className="flex flex-row justify-between items-center w-screen bg-zinc-900 text-center p-5 font-mono">
          <div className="flex flex-col justify-center items-start">
            <p className="text-purple-300 font-semibold text-md">
              © 2024 Accrue. All rights reserved.
            </p>
            <span className="text-gray-200 text-sm">
              Designed with <span className="text-purple-300 font-bold">♥</span>{" "}
              by Momenta Labs
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
