export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-start w-screen max-h-screen pt-16 pb-2">
      {children}
    </div>
  );
}
