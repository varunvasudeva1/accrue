"use client";

export default function ActionBarButton({
  onClick,
  children,
  className,
  disabled,
  alt,
}: {
  onClick?: ((e: any) => Promise<void> | void) | (() => void);
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  alt?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row relative items-center justify-center p-2 hover:bg-opacity-50
      disabled:cursor-not-allowed disabled:hover:bg-transparent group transition duration-150 ease-in-out text-white ${className}`}
      disabled={disabled ?? false}
    >
      <div className="absolute -top-10 hidden group-hover:flex md:group-hover:hidden flex-row items-center justify-center p-1 bg-zinc-800 text-gray-100 text-sm md:text-md font-light font-mono rounded-md">
        {alt}
      </div>
      <div className="flex flex-row items-center justify-center text-lg font-light font-mono group-disabled:opacity-30">
        {children}
        <p className="hidden md:flex text-sm font-light font-mono ml-1">
          {alt}
        </p>
      </div>
    </button>
  );
}
