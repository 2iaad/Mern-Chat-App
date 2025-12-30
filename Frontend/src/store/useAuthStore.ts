import type { User } from "../store/useChatStore"
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface AuthStore {
    authUserObj: any;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: User[];

    checkAuth: () => Promise<void>;
    signup: (data: userDataType) => Promise<void>;
    login: (data: userDataType) => Promise<void>;
    logout: (data: userDataType) => Promise<void>;
    updateProfile: (payload: UpdateProfilePayload) => Promise<void>; // ? 
}

interface UpdateProfilePayload {
    profilePicture?: string | ArrayBuffer | null;
}

type userDataType = {
    fullName?: String,
    email: String,
    password: String,
    profilePicture: String,
}

{/*
    -> export const useAuthStore = create<AuthStore>(...)
        * create returns a React hook (useAuthStore) that components call to read/update a shared, global state.
    -> (set) => ({ ... })
        * This initializer runs once when the page refreshs.
        * set is Zustand’s updater. we call set({ key: value }) to update state and trigger re-renders.

    States: (authUserObj, isSigningUp, isLoggingIn, isUpdatingProfile)

    Actions: (checkAuth, signup)
*/}

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

    signup: async (data: userDataType) => {

        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUserObj: res.data })

            console.log("success")
            toast.success("Account created successfully")
        } catch (error) {
            console.log("error")
            toast.error((error as any).Response?.data?.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data: userDataType) => {

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
    
    logout: async (data: userDataType) => {

        try {
            axiosInstance.post("/auth/logout", data)
            set({authUserObj: null})

            toast.success("Logged out successfully")
        } catch (error) {
            toast.error("Can't logout user");
        } 
    },

    updateProfile: async (data: UpdateProfilePayload) => {

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