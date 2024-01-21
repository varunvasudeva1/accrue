"use client";
import { RxChevronLeft } from "react-icons/rx";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex flex-row m-4 p-2 bg-zinc-800 rounded-md hover:bg-purple-400 hover:bg-opacity-30 transition duration-150 ease-in-out"
    >
      <RxChevronLeft className="text-purple-200 text-2xl lg:text-3xl transition duration-150 ease-in-out" />
      <p className="text-purple-200 text-md lg:text-lg">back</p>
    </button>
  );
}
