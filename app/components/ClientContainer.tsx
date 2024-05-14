"use client"

import {SafeUser} from "@/types";
import {useEffect} from "react";
import useUserStore from "@/app/hooks/useUserStore";

interface ContainerProps {
    children: React.ReactNode
    currentUser?: SafeUser | null
}

const ClientContainer: React.FC<ContainerProps> = ({children, currentUser}) => {
    const useUser = useUserStore()
    useEffect(() => {
        if (currentUser) {
            useUser.setUser(currentUser)
        }
    }, [currentUser]);
    return (
        <div>
            {children}
        </div>
    );
}

export default ClientContainer;