import React from "react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex-1 flex justify-center items-center">
            <span className="animate-ping inline-flex h-12 w-12 rounded-full bg-sky-400 opacity-75"></span>
        </div>
    )
}