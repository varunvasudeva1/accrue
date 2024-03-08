"use client";
import { Chat, Message } from "@/types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import { BsSend } from "react-icons/bs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Index({
  chat,
  messages,
}: {
  chat: Chat | null;
  messages: Message[] | null;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [chatName, setChatName] = useState<string>(chat?.chat_name || "");
  const [currentMessages, setCurrentMessages] = useState<Message[] | null>(
    messages
  );
  const messageContainerRef = useRef<HTMLDivElement>(null);

  if (!chat) {
    return (
      <p className="text-xl text-white m-4">
        No chat found. Please try again later.
      </p>
    );
  }

  if (!messages) {
    return (
      <p className="text-xl text-white m-4">
        No messages found. Please try again later.
      </p>
    );
  }

  const scrollToBottom = (behavior: "smooth" | "instant" = "smooth") => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current?.scrollHeight,
      behavior: behavior,
    });
  };

  const updateChatName = async () => {
    if (!chat?.chat_id) {
      toast.error("Chat not found. Please try again later.");
      return;
    }
    const {
      error,
    }: {
      data: Chat[] | null;
      error: PostgrestError | null;
    } = await supabase
      .from("chats")
      .update({
        updated_at: new Date().toISOString(),
        chat_name: chatName,
      })
      .eq("chat_id", chat.chat_id);
    if (error) {
      toast.error("Failed to update chat name. Please try again later.");
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (!message) {
      return;
    }
    if (!chat?.chat_id) {
      toast.error("Chat not found. Please try again later.");
      return;
    }
    if (!currentMessages) {
      toast.error("Messages not found. Please try again later.");
      return;
    }

    const newMessage: Message = {
      role: "user",
      content: message,
    };
    setCurrentMessages([...currentMessages, newMessage]);
    setMessage("");
    const {
      error,
    }: {
      data: Message[] | null;
      error: PostgrestError | null;
    } = await supabase.from("messages").upsert([
      {
        chat_id: chat.chat_id,
        role: "user",
        content: message,
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) {
      toast.error("Failed to send message. Please try again later.");
      console.error(error);
    }

    const updateLastUpdated = await supabase
      .from("chats")
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq("chat_id", chat.chat_id);
    if (updateLastUpdated.error) {
      console.error(updateLastUpdated.error);
    }
  };

  const deleteChat = async () => {
    if (!chat?.chat_id) {
      toast.error("Chat not found. Please try again later.");
      return;
    }
    const {
      error,
    }: {
      data: Chat[] | null;
      error: PostgrestError | null;
    } = await supabase.from("chats").delete().eq("chat_id", chat.chat_id);
    if (error) {
      toast.error("Failed to delete chat. Please try again later.");
      console.error(error);
    }
    router.push("/chats");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Enter pressed");
      sendMessage();
    }
  };

  // Scroll instantly to bottom on initial load
  useLayoutEffect(() => {
    scrollToBottom("instant");
  }, []);

  // Scroll smoothly to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  return (
    <div className="flex flex-col fixed items-center justify-center max-h-dvh w-full self-center">
      <div
        className="flex flex-col items-center w-full h-full mb-32 px-6 overflow-y-auto"
        ref={messageContainerRef}
      >
        <div className="flex flex-col w-full h-full sm:3/4 lg:w-3/5 space-y-1">
          {currentMessages?.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                message.role === "user"
                  ? "items-end self-end"
                  : "items-start self-start"
              }`}
            >
              <h3 className="font-bold text-sm text-purple-200">
                {message.role === "user" ? "you" : "accrue"}
              </h3>
              <div
                className={`flex flex-col items-start justify-start w-fit p-2 bg-zinc-800 bg-opacity-50 rounded-md ${
                  message.role === "user" ? "text-end items-end" : ""
                }`}
              >
                <p className="text-white text-md">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row fixed bottom-2 px-2 items-center justify-center w-full">
        <div className="flex flex-row w-full h-full items-center justify-between sm:3/4 lg:w-3/5 space-x-2 p-1 bg-zinc-900 rounded-lg overflow-clip">
          <input
            multiple
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full p-2 bg-zinc-800 bg-opacity-50 rounded-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60"
          />
          <Button className="flex h-10" onClick={sendMessage}>
            <BsSend className="text-white text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}
