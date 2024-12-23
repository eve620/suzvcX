import React from "react";

export default function Loading() {
    return (
        <div className="flex h-screen w-full justify-center items-center">
            <span className="animate-ping inline-flex h-12 w-12 rounded-full bg-sky-400 opacity-75"></span>
        </div>
    )
}