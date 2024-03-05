import { getChat, getMessages } from "@/actions";
import Chat from "@/components/Chat";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const chat = await getChat(id);

  return {
    title: `${
      !chat || !chat.chat_name || chat.chat_name === ""
        ? "Untitled chat"
        : chat.chat_name
    } | Accrue`,
  };
}

export default async function Index({ params }: { params: { id: string } }) {
  const chat = await getChat(params.id);
  const messages = await getMessages(params.id);

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <Suspense
        fallback={<p className="text-xl text-white m-4">Loading chat...</p>}
      >
        <Chat chat={chat} messages={messages} />
      </Suspense>
    </div>
  );
}
