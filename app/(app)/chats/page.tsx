import { getChats } from "@/actions";
import Chats from "@/components/Chats";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Chats | Accrue",
  description:
    "View and manage your chats. Create new chats and view chat history.",
};

export default async function Index() {
  const chats = await getChats();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-start space-y-4 w-full sm:w-3/4 lg:w-2/3">
        <h3 className="font-bold text-3xl text-center text-purple-200">
          chats
        </h3>
        <Suspense
          fallback={<p className="text-xl text-white m-4">Loading...</p>}
        >
          <Chats chats={chats} />
        </Suspense>
      </div>
    </div>
  );
}
