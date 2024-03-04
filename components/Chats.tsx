import { Chat } from "@/types";
import Link from "next/link";
import { RxChevronRight } from "react-icons/rx";
import { formatDistance } from "date-fns";

export default function Chats({ chats }: { chats: Chat[] | null }) {
  if (!chats) {
    return <p className="text-xl text-white m-4">No chats found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full space-y-2">
      {chats &&
        chats?.map((chat: Chat, index: number) => (
          <Link
            key={index}
            className={`flex flex-row items-center justify-between w-full sm:w-3/4 lg:w-2/3 px-4 py-4 lg:py-6 bg-zinc-800 bg-opacity-50 rounded-md
                hover:bg-purple-400 hover:bg-opacity-30 transition duration-150 ease-in-out
                `}
            href={`/chats/${chat.chat_id}`}
          >
            <div className="flex flex-col items-start justify-start w-full">
              <h3 className="font-bold text-xl lg:text-2xl text-purple-200">
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
