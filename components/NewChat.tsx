"use client";
import { createChat } from "@/actions";
import { BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { Message, Project } from "@/types";

export default function NewChat({ project }: { project?: Project }) {
  const router = useRouter();
  const messages: Message[] = [
    {
      role: "user",
      content: `Hello, Assistant! Here are the details of my project.\nName: ${
        project?.project_name ?? "No name provided."
      }\nDescription: ${
        project?.project_description ?? "No description provided."
      }\nSuggestions: ${JSON.stringify(project?.suggestions)}`,
    },
  ];

  const startNewChat = async () => {
    try {
      let chatId: string | null = null;
      if (!project) {
        chatId = await createChat({});
      } else {
        chatId = await createChat({
          messages,
          projectId: project.project_id,
        });
      }

      if (!chatId) {
        toast.error(
          "Failed to create chat. Please try again later. Details: No chat ID found."
        );
        return;
      }
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create chat. Please try again later.");
    }
  };

  return (
    <Button className="self-end" onClick={startNewChat}>
      <BsPlusCircle className="text-white text-md sm:text-lg" />
      <h3 className="font-normal text-sm sm:text-md text-white font-mono ml-2">
        chat
      </h3>
    </Button>
  );
}
