"use client";

import { Input } from "@/components/ui/input";
import { IconMessageChatbot } from "@tabler/icons-react";
import { MessageCircle, MessageCircleIcon } from "lucide-react";
import { useState } from "react";
import TextField from "./TextField";

export default function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Bubble Button */}
      <button
        onClick={toggleChat}
        className="w-10 h-10 bg-green text-white hover:text-green rounded-full shadow-lg flex items-center justify-center hover:bg-green60 transition duration-150 ease-in-out"
      >
        <IconMessageChatbot />
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div
          className={`absolute bottom-12 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
            isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Chat with us
            </h3>
            <p className="text-sm text-gray-500">How can we help you today?</p>
          </div>
          <div className="p-4 border-t border-gray-200">
            <TextField
              id={"nama"}
              type={"textarea"}
              placeholder={"Masukkan Nama Penanggung Jawab"}
              //   values={values.nama_diri}
              //   onChange={handleValuesChange("nama_diri")}
            />
            <button className="mt-2 w-full bg-green text-white hover:text-green py-2 rounded-lg hover:bg-green60 transition duration-150 ease-in-out">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
