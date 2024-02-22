import Link from "next/link";

export default function Button({
  onClick,
  formAction,
  type,
  href,
  disabled,
  children,
  className,
}: {
  onClick?: (() => void) | ((e: any) => Promise<void>);
  formAction?: string;
  type?: "submit" | "reset" | "button";
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (href) {
    return (
      <Link
        href={disabled ? "" : href}
        className={`flex flex-row items-center justify-center px-4 py-2 w-32 bg-purple-400 bg-opacity-40 ${
          disabled ? "bg-zinc-800 bg-opacity-50" : ""
        } rounded-md hover:bg-opacity-30 transition duration-150 ease-in-out text-white text-md text-center font-normal font-mono ${className}`}
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
        className={`flex flex-row items-center justify-center px-4 py-2 w-32 bg-purple-400 bg-opacity-40 ${
          disabled ? "bg-zinc-800 bg-opacity-50" : ""
        } rounded-md hover:bg-opacity-30 transition duration-150 ease-in-out text-white text-md text-center font-normal font-mono ${className}`}
      >
        {children}
      </button>
    );
  }
}
