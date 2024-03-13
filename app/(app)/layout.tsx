import BackButton from "@/components/BackButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-start w-screen min-h-screen py-12">
      <BackButton />
      <div className="px-8 space-y-8 w-full">{children}</div>
    </div>
  );
}
