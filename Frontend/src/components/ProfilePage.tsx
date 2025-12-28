import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const staticImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0QDRANDw0ODQ0NDQ0NDQ4NDRAODw8NFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LjcBCgoKDg0OFQ8QFSsZFRktKzcrKysrLSsrKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUCAwQGB//EADIQAQACAAMFBQcEAwEAAAAAAAABAgMEEQUhMUFREmFxgZEiMjOCobHRI0JSwWJy8BP/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAgED/8QAGREBAQEBAQEAAAAAAAAAAAAAAAEREjEC/9oADAMBAAIRAxEAPwD6YAtyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABLZXL4k8KW9JGtY2zl8SONLektUx13eIIEgxAAAAAAAAAAAAAAAAAAAAAJgB25TZ82jtW1rHTnLPZ2U1j/0tH+sT91nCbVyNeFgUr7tYjv03+rYkYpDDEwa296InxbAFXmdnab6TM/4yr5h6RX7RymsTevGOMdYVKmxVoShqQAYAAAAAAAAAAAAAAAANuWwu3eK8p4+DW79kU32t0iIgrYs4jSNI4QyBDoAAAAImEgKPP4PYxJ5RO+HMtdr03Vt0nRVKjnQBrAAAAAAAAAAAAAAAAErPZHC3jH2Vjv2TfS016xrHky+Ki1EJSsAAAAABxbV+H80KdZ7XxN1a9+qsVEfXoA1IAAAAAAAAAAAAAAACWeDiTW0W6Tr4taYB6LDvFoi0b4mNYZKjZ+b7E9m3uzw7pW1ZRXSVIA0AARM/TiTKs2jm9f06zu/dMfaG4y1y5vG7d5ty4R4NJqKQgAYAAAAAAAAAAAAAAAAJQAl05bOXpu416S5Qbq7ws9h259mekuiLRymPJ5xOs9ZZjenoptEcZiGjGzuHXnrPSN6km09Z9Qw6deaz1rbo9mvPrLkBrBADAAAAAAAAAAAAAAAAAAaDPDpa06VjWe53YGzed507o/JpIr9G2mVxLcKz9l1hZeleFYjv5trNVyp67NxOfZjz1Zxsu3849FqM1vMVU7Lt/OPRhbZuJHCYn6LgNOYob5XErxpPlvaZjru8XpGrEwKW41ifI1nLz4s8bZnOk6d0/lX4mHas6WiYn/uDdTjABrAAAAAAAAAAAAAAaOvKZK198+zXrznwbcjktfbtG7lXr4rSIZaqRhg4VaxpWNIbASoAAAAAAAAYYmHFo0tETDMBT5vIzXW1dbV+sfmHE9KrM9kv30jvmv8AcNlTYrQFIAAAAAAAAASA69n5Xtz2p92s+sufCw5taKxxn6d6+wcOK1iscIjRlqpGUJBKwAAAAAAAAAAAAAFTtHK9n26x7M8Y6S4Ho70iYmJjWJjSVDmMGaXms8uHfCpUfUagGpAAAAAAATALLZWDxxOu6P7lZNWXp2aVjpDaiukABoAAAAAAAAAAAAAA4Nq4OtYvHGvHwd7DEprEx1iYCvOjK8aTp0mY9GK3IAAAAAAbctTW9Y74anTs+P1a+cjYu0kCHQAAAAAAAAAAAAAAAABAKPPV0xbR36ud2bVj9X5Yca4530AGAAAADq2d8WPCQGxdgIdAAAAAAAAAAAAAAAABAAqNq/E+WHEC4530AGAAP//Z"

export default function ProfilePage() {
    const { authUserObj, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>(null); // m3a t updatea photo me3a tre-rendrea component otban new Picture

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = async () => {
            const base64data = reader.result;
            setSelectedImg(base64data); // update state to render new image
            await updateProfile({profilePicture: base64data}) // update MongoDB
        }
    }
    console.log(authUserObj.profilePicture)

    return (
        <div className="h-screen pt-20 bg-gray-800">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-gray-100 rounded-xl p-6 space-y-8">
                    {/* header section*/}
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold ">Profile</h1>
                        <p className="mt-2">Your profile information</p>
                    </div>

                    {/* avatar upload section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImg || authUserObj.profilePicture || staticImage}
                                className="size-32 rounded-full object-cover border-4 "
                            />
                            <label
                                htmlFor="avatar-upload" className={`
                                                            absolute bottom-0 right-0 
                                                            bg-base-content hover:scale-105
                                                            p-2 rounded-full cursor-pointer 
                                                            transition-all duration-200
                                                            ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                                        `} >
                                <Camera className="w-5 h-5 text-base-200" />
                                <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile} />
                            </label>
                        </div>

                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                        </p>
                    </div>

                    {/* user infos section */}
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <User className="w-4 h-4" />Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-gray-300 rounded-lg border-2 border-red-200">{authUserObj?.fullName}</p>
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="w-4 h-4" />Email Address
                            </div>
                            <p className="px-4 py-2.5 bg-gray-300 rounded-lg border-2 border-red-200">{authUserObj?.email}</p>
                        </div>
                    </div>

                    {/* account infos section */}
                    <div className="mt-6 bg-gray-300 rounded-xl p-6 border-2 border-red-200">
                        <h2 className="text-lg font-medium  mb-4">Account Information</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>Member Since</span>
                                <span>{authUserObj.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-red-500">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
