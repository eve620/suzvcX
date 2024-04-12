'use client' // ErrorPage components must be Client Components

import ErrorPage from "@/app/components/ErrorPage";

export default function Error({error, reset,}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <ErrorPage error={error} reset={reset}/>
    )
}