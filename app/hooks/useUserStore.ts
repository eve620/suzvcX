import {create} from 'zustand';
import {SafeUser} from "@/types";


interface useUserStoreProps {
    user: SafeUser | null;
    setUser: (user: SafeUser | null) => void;
    clearUser: () => void;
}

const useUserStore = create<useUserStoreProps>((set) => ({
    user: null,
    setUser: (user) => set({user: user}),
    clearUser: () => set({user: null}),
}));


export default useUserStore;
