"use client";
import { Chat } from "@/types";
import Link from "next/link";
import { RxChevronRight } from "react-icons/rx";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NewChat from "./NewChat";

export default function Chats({ chats }: { chats: Chat[] | null }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  if (!chats) {
    return <p className="text-xl text-white m-4">No chats found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full space-y-2">
      <NewChat />
      {chats &&
        chats
          ?.sort((a, b) => {
            return a.updated_at < b.updated_at ? 1 : -1;
          })
          ?.map((chat, index) => (
            <Link
              key={index}
              className="flex flex-row items-center justify-between w-full p-3 bg-zinc-800 bg-opacity-50 rounded-md hover:bg-purple-400 hover:bg-opacity-30 transition duration-150 ease-in-out"
              href={`/chat/${chat.chat_id}`}
            >
              <div className="flex flex-col items-start justify-start w-full">
                <h3 className="font-bold text-lg lg:text-xl text-purple-200">
                  {chat.chat_name || "(untitled)"}
                </h3>
                <p className="text-gray-300 text-sm lg:text-md">
                  last updated{" "}
                  {formatDistance(new Date(chat.updated_at), new Date())} ago
                </p>
              </div>
              <RxChevronRight className="text-purple-200 text-2xl lg:text-3xl" />
            </Link>
          ))}
    </div>
  );
}
