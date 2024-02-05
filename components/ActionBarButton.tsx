"use client";

export default function ActionBarButton({
  onClick,
  children,
  className,
  disabled,
  alt,
}: {
  onClick?: (e: any) => Promise<void>;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  alt?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row relative items-center justify-center p-2 bg-zinc-800 bg-opacity-70 hover:bg-opacity-50
      disabled:bg-zinc-700 disabled:cursor-not-allowed group transition duration-150 ease-in-out font-medium text-white text-xl md:text-2xl font-mono ${className}`}
      disabled={disabled}
    >
      <div className="absolute -top-10 hidden group-hover:flex md:group-hover:hidden flex-row items-center justify-center p-1 bg-zinc-800 text-gray-100 text-sm md:text-md rounded-md">
        {alt}
      </div>
      <div className="flex flex-row items-center justify-center">
        <p className="hidden md:flex text-sm mr-1">{alt}</p>
        {children}
      </div>
    </button>
  );
}
