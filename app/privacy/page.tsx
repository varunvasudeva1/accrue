import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | Accrue",
  description: "Supercharge and centralize your project planning with Accrue.",
};

export default async function Index() {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <h3 className="font-bold text-4xl lg:text-5xl text-purple-200 pb-2">
        privacy
      </h3>
      <div className="flex flex-col items-start self-center max-w-3xl space-y-4">
        <p className="text-lg text-white leading-relaxed">
          We don't think using a product means the company whose product it is
          should know everything about you. We collect only the information we
          need to provide our services, and we don't share it with or sell it to
          any third parties, for any reason. We encourage you to{" "}
          <Link href="/privacy-policy" className="text-purple-200 font-mono">
            read our Privacy Policy
          </Link>{" "}
          to understand how we handle your data.
        </p>
        <div className="flex flex-col items-start bg-zinc-900 rounded-md p-6">
          <h3 className="font-bold text-xl lg:text-2xl text-purple-200 pb-2">
            summary
          </h3>
          <ul className="list-disc list-inside text-white text-lg font-mono">
            <li>no PII collected</li>
            <li>anonymous analytics</li>
            <li>only functional cookies</li>
            <li>no tracking</li>
            <li>no sharing data with third parties</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
