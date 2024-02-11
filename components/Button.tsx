import Link from "next/link";

export default function Button({
  onClick,
  formAction,
  type,
  href,
  children,
  className,
}: {
  onClick?: () => void;
  formAction?: string;
  type?: "submit" | "reset" | "button";
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={`flex flex-row items-center justify-center px-4 py-2 bg-purple-400 bg-opacity-40 rounded-md hover:bg-opacity-30 transition duration-150 ease-in-out text-white text-md lg:text-lg font-normal font-mono ${className}`}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        onClick={onClick}
        formAction={formAction}
        type={type}
        className={`flex flex-row items-center justify-center px-4 py-2 bg-purple-400 bg-opacity-40 rounded-md hover:bg-opacity-30 transition duration-150 ease-in-out text-white text-md lg:text-lg font-normal font-mono ${className}`}
      >
        {children}
      </button>
    );
  }
}
