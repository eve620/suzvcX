"use client"
import showMessage from "@/app/components/Message";
import {redirect} from "next/navigation";
import {useEffect} from "react";

interface AuthMessageProps {
    path?: string
    message?: string
}

const AuthMessage: React.FC<AuthMessageProps> = ({message, path}) => {
    useEffect(() => {
        if (message) {
            showMessage(message)
        }
        redirect(`${path ? path : "/"}`)
    },[message,path])
    return (<></>)
}
export default AuthMessage;