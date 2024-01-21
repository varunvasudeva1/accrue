import BackButton from "@/components/BackButton";
import { RxChevronLeft } from "react-icons/rx";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-start w-screen min-h-screen py-20">
      <BackButton />
      <div className="px-8 space-y-8 w-full">{children}</div>
    </div>
  );
}
