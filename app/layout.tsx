import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import { getCurrentUser } from "@/actions";
import { Metadata, Viewport } from "next";

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
      </body>
    </html>
  );
}
