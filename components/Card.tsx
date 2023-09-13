export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-start rounded-md shadow-md p-4 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
