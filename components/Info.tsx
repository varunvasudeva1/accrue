"use client";
import { BsInfoCircle } from "react-icons/bs/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Info = ({ text }: { text: string }) => {
  const notify = () => toast(text);

  return (
    <BsInfoCircle
      className="text-purple-200 hover:text-purple-300 cursor-pointer"
      onClick={() => {
        notify();
      }}
    />
  );
};

export default Info;
