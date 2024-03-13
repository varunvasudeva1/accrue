import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Accrue",
  description: "Supercharge and centralize your project planning with Accrue.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-start w-screen min-h-screen pt-12">
      <BackButton />
      <div className="px-8 pb-8 space-y-8 w-full min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
