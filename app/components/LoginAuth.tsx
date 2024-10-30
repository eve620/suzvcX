'use client'

import {useRouter} from "next/navigation";
import showMessage from "@/app/components/Message";
import {useEffect} from "react";

export default function LoginAuth() {
    const router = useRouter()
    useEffect(() => {
        router.push('/login')
        showMessage("请先登录以访问~")
    }, []);
    return (
        <></>
    );
}