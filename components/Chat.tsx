"use client";
import { Chat, Message } from "@/types";
import React, { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import { BsSend } from "react-icons/bs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";

export default function Index({
  chat,
  messages,
}: {
  chat: Chat | null;
  messages: Message[] | null;
}) {
  const supabase = createClientComponentClient();
  const [message, setMessage] = useState<string>("");
  const [chatName, setChatName] = useState<string>(chat?.chat_name || "");
  const [currentMessages, setCurrentMessages] = useState<Message[] | null>(
    messages
  );

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
    setCurrentMessages((prevMessages) => {
      if (prevMessages) {
        return [...prevMessages, newMessage];
      }
      return [newMessage];
    });
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
  };

  if (!chat) {
    return (
      <p className="text-xl text-white m-4">
        No chat found. Please try again later.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <input
        className="font-semibold text-2xl lg:text-3xl text-white bg-zinc-800 bg-opacity-0 rounded-md w-full focus:p-2 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60"
        type="text"
        name="chatName"
        value={chatName}
        placeholder="(untitled)"
        onChange={(e) => setChatName(e.target.value)}
        onBlur={updateChatName}
      />
      <p className="font-medium text-md lg:text-lg text-purple-200">
        {chat.chat_id}
      </p>
      <div className="flex flex-col items-center justify-between w-full sm:w-3/4 lg:w-2/3 space-y-2 self-center">
        <div className="flex flex-col items-start justify-start w-full space-y-1">
          {currentMessages?.map((message, index) => (
            <div
              key={index}
              className={`flex flex-row items-start justify-start w-fit p-4 bg-zinc-800 bg-opacity-50 rounded-md ${
                message.role === "user" ? "self-end" : ""
              }
              `}
            >
              <div
                className={`flex flex-col items-start justify-start w-full ${
                  message.role === "user" ? "text-end items-end" : ""
                }
                `}
              >
                <h3 className="font-bold text-md lg:text-lg text-purple-200">
                  {message.role}
                </h3>
                <p className="text-white text-md lg:text-lg">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-between w-full space-x-2">
          <input
            multiple
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 bg-zinc-800 bg-opacity-50 rounded-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60"
          />
          <Button className="flex h-10" onClick={sendMessage}>
            <BsSend className="text-white text-xl lg:text-2xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}
