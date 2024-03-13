import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-between items-center w-screen bg-zinc-900 text-center p-5 font-mono">
      <div className="flex flex-col sm:flex-row justify-start items-start sm:justify-between sm:items-center w-full space-y-4 sm:space-y-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          <Link href="/about" className="text-gray-200 text-sm text-start">
            About
          </Link>
          <Link href="/pricing" className="text-gray-200 text-sm text-start">
            Pricing
          </Link>
          <Link href="/privacy" className="text-gray-200 text-sm text-start">
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
            Designed with <span className="text-purple-300 font-bold">♥</span>{" "}
            by Momenta Labs
          </span>
        </div>
      </div>
    </footer>
  );
}
