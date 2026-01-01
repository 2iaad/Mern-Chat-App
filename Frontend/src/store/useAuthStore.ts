import type { User } from "../store/useChatStore"
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

type AuthUser = {
    _id: string
    email: string
    fullName: string
    profilePicture: string
    createdAt: string
    updatedAt: string
}
type loginData = { email: string, password: string }
type signupData = loginData & { fullName: string }

interface AuthStore {
    authUserObj: AuthUser | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: User[];

    checkAuth: () => Promise<void>;
    signup: (data: signupData) => Promise<void>;
    login: (data: loginData) => Promise<void>;
    logout: (data: AuthUser) => Promise<void>;
    updateProfile: (data: string | ArrayBuffer | null) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({

    // data we are tracking on each browser refresh:
    authUserObj: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            // in controller i return (req.user), but Axios receives that JSON, and puts it in res.data.
            set({ authUserObj: res.data });
        } catch (error) { // triggered if backend responds with error status code (anything outside 200–299).
            console.log("Error in checkAuth: ", error)
            set({ authUserObj: null });
        } finally {
            set({ isCheckingAuth: false }) // disable spinner: this will be run regardless of success or failure
        }
    },

    signup: async (data) => {

        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUserObj: res.data })

            console.log("success")
            toast.success("Account created successfully")
        } catch (error) {
            console.log("error")
            toast.error((error as any).response?.data?.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {

        set({ isLoggingIn: true })

        try {

            const res = await axiosInstance.post("/auth/login", data);
            set({ authUserObj: res.data })

            toast.success("Logged to account successfully")
        } catch (error) {
            toast.error("Failed to login")
        } finally {
            set({ isLoggingIn: false })
        }
    },
    
    logout: async (data) => {

        try {
            axiosInstance.post("/auth/logout", data)
            set({authUserObj: null})

            toast.success("Logged out successfully")
        } catch (error) {
            toast.error("Can't logout user");
        } 
    },

    updateProfile: async (data) => {

        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/edit-profile", data);
            set({authUserObj: res.data})
            toast.success("Profile photo updated!")

        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}))