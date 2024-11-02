"use client"

import {SafeUser} from "@/types";
import {useCallback, useEffect} from "react";
import useUserStore from "@/app/hooks/useUserStore";

interface ContainerProps {
    children: React.ReactNode
    currentUser?: SafeUser | null
}

const ClientContainer: React.FC<ContainerProps> = ({children, currentUser}) => {
    const {setUser} = useUserStore()

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser)
        }
    }, [setUser, currentUser]);
    return (
        <div>
            {children}
        </div>
    );
}

export default ClientContainer;