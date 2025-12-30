import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import ChatHeader from "./HomePage-ChatContainer/ChatHeader";
import MessageInput from "./HomePage-ChatContainer/MessageInput";
import Messages from "./HomePage-ChatContainer/Messages";
import MessagesSkeleton from "./skeletons/MessagesSkeleton";


export default function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();

  useEffect(() => {
    if (selectedUser)
      getMessages(selectedUser._id)
  }, [selectedUser?._id])
  
  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessagesSkeleton />
        <MessageInput />
      </div>
    )
  }
  
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <Messages />
      <MessageInput />
    </div>
  );
};
