import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.tsx"
import { Users } from "lucide-react";
import { useEffect } from "react";

export default function Sidebar() {

  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const onlineIds = onlineUsers.map(u => u._id);

  const usersList = Array.isArray(users) ? users : [];

  useEffect(() => {
    getUsers();
  }, [getUsers])

  if (isUsersLoading) return <SidebarSkeleton/>

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Users header section */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" /> {/* icon */}
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      {/* Users section */}
      <div className="overflow-y-auto w-full py-3">
        {usersList.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-200 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePicture || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0QDRANDw0ODQ0NDQ0NDQ4NDRAODw8NFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LjcBCgoKDg0OFQ8QFSsZFRktKzcrKysrLSsrKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUCAwQGB//EADIQAQACAAMFBQcEAwEAAAAAAAABAgMEEQUhMUFREmFxgZEiMjOCobHRI0JSwWJy8BP/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAgED/8QAGREBAQEBAQEAAAAAAAAAAAAAAAEREjEC/9oADAMBAAIRAxEAPwD6YAtyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABLZXL4k8KW9JGtY2zl8SONLektUx13eIIEgxAAAAAAAAAAAAAAAAAAAAAJgB25TZ82jtW1rHTnLPZ2U1j/0tH+sT91nCbVyNeFgUr7tYjv03+rYkYpDDEwa296InxbAFXmdnab6TM/4yr5h6RX7RymsTevGOMdYVKmxVoShqQAYAAAAAAAAAAAAAAAANuWwu3eK8p4+DW79kU32t0iIgrYs4jSNI4QyBDoAAAAImEgKPP4PYxJ5RO+HMtdr03Vt0nRVKjnQBrAAAAAAAAAAAAAAAAErPZHC3jH2Vjv2TfS016xrHky+Ki1EJSsAAAAABxbV+H80KdZ7XxN1a9+qsVEfXoA1IAAAAAAAAAAAAAAACWeDiTW0W6Tr4taYB6LDvFoi0b4mNYZKjZ+b7E9m3uzw7pW1ZRXSVIA0AARM/TiTKs2jm9f06zu/dMfaG4y1y5vG7d5ty4R4NJqKQgAYAAAAAAAAAAAAAAAAJQAl05bOXpu416S5Qbq7ws9h259mekuiLRymPJ5xOs9ZZjenoptEcZiGjGzuHXnrPSN6km09Z9Qw6deaz1rbo9mvPrLkBrBADAAAAAAAAAAAAAAAAAAaDPDpa06VjWe53YGzed507o/JpIr9G2mVxLcKz9l1hZeleFYjv5trNVyp67NxOfZjz1Zxsu3849FqM1vMVU7Lt/OPRhbZuJHCYn6LgNOYob5XErxpPlvaZjru8XpGrEwKW41ifI1nLz4s8bZnOk6d0/lX4mHas6WiYn/uDdTjABrAAAAAAAAAAAAAAaOvKZK198+zXrznwbcjktfbtG7lXr4rSIZaqRhg4VaxpWNIbASoAAAAAAAAYYmHFo0tETDMBT5vIzXW1dbV+sfmHE9KrM9kv30jvmv8AcNlTYrQFIAAAAAAAAASA69n5Xtz2p92s+sufCw5taKxxn6d6+wcOK1iscIjRlqpGUJBKwAAAAAAAAAAAAAFTtHK9n26x7M8Y6S4Ho70iYmJjWJjSVDmMGaXms8uHfCpUfUagGpAAAAAAATALLZWDxxOu6P7lZNWXp2aVjpDaiukABoAAAAAAAAAAAAAA4Nq4OtYvHGvHwd7DEprEx1iYCvOjK8aTp0mY9GK3IAAAAAAbctTW9Y74anTs+P1a+cjYu0kCHQAAAAAAAAAAAAAAAABAKPPV0xbR36ud2bVj9X5Yca4530AGAAAADq2d8WPCQGxdgIdAAAAAAAAAAAAAAAABAAqNq/E+WHEC4530AGAAP//Z"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
                />
                {onlineIds.includes(user._id) && (<span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />)}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-white truncate">{user.fullName}</div>
            </div>

          </button>
        ))}

        {usersList.length === 0 && (<div className="text-center text-black py-4">No online users</div>)}
      </div>
    </aside>
  );
};
