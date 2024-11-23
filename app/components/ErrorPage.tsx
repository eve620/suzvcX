'use client' // ErrorPage components must be Client Components

import {useEffect} from 'react'
import MyButton from "@/app/components/MyButton";
import {useRouter} from "next/navigation";

export default function ErrorPage({error}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div
            className="
        flex-1
        flex
        flex-col
        items-center
        justify-center
        gap-2
      "
        >
            <div className={'text-center'}>
                <div className="text-2xl font-bold">
                    {"Uh Oh"}
                </div>
                <div className="text-neutral-500 mt-2 mb-4">
                    {"Something went wrong!"}
                </div>
            </div>
            <MyButton
                label="点击返回首页"
                onClick={() => router.push('/')}
            />
        </div>
    )
}