import { useEffect } from "react";
import { type ChatStoreStateType, useChatStore } from "@/store/useChatStore";
import ChatHeader from "./HomePage-ChatContainer/ChatHeader";
import MessageInput from "./HomePage-ChatContainer/MessageInput";
import Messages from "./HomePage-ChatContainer/Messages";
import MessagesSkeleton from "./skeletons/MessagesSkeleton";

export default function ChatContainer() {

  // using selector to prevent re-render on other variable changes (optimization)
  const messages = useChatStore((s) => s.messages);
  const getMessages = useChatStore((s) => s.getMessages);
  const isMessagesLoading = useChatStore((s) => s.isMessagesLoading);
  const selectedUser = useChatStore((s) => s.selectedUser);

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
