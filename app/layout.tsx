import "./globals.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import { getCurrentUser } from "@/actions";
import { Metadata, Viewport } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accrue",
  description: "Supercharge and centralize your project planning with Accrue.",
};

export const viewport: Viewport = {
  themeColor: "rgb(24 24 27)", // zinc-900, color of header and footer
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className="bg-zinc-950">
        <Header user={user} />
        <main className="flex flex-col justify-start items-start w-screen min-h-screen">
          {children}
        </main>
        <ToastContainer
          toastClassName="border-2 border-purple-300 rounded-md m-4"
          bodyClassName="text-md lg:text-lg text-white font-light"
          autoClose={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
        <footer className="flex flex-row justify-between items-center w-screen bg-zinc-900 text-center p-5 font-mono">
          <div className="flex flex-col sm:flex-row justify-start items-start sm:justify-between sm:items-center w-full space-y-4 sm:space-y-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <Link href="/about" className="text-gray-200 text-sm text-start">
                About
              </Link>
              <Link
                href="/pricing"
                className="text-gray-200 text-sm text-start"
              >
                Pricing
              </Link>
              <Link
                href="/privacy"
                className="text-gray-200 text-sm text-start"
              >
                Privacy
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-200 text-sm text-start"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex flex-col items-start sm:items-end text-end">
              <p className="text-purple-300 font-semibold text-sm">
                © 2024 Accrue. All rights reserved.
              </p>
              <span className="text-gray-200 text-xs">
                Designed with{" "}
                <span className="text-purple-300 font-bold">♥</span> by Momenta
                Labs
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
