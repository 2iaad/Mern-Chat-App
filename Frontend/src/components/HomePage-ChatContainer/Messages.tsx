import { useChatStore } from "@/store/useChatStore";

export default function Messages() {

  const messages = useChatStore((state) => state.messages)
  const getMessages = useChatStore((state) => state.getMessages)
  const selectedUser = useChatStore((state) => state.selectedUser)

  useEffect(() => {
    getMessages();
  }, [getMessages, selectedUser]) 

  messages.map((element) => {
    if (element._id === )
  })
  
  return (
    <div className="">
      messages
    </div>
  );
};
