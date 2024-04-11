import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="absolute flex h-full w-full items-center justify-center">
            <span className="animate-ping inline-flex h-12 w-12 rounded-full bg-sky-400 opacity-75"></span>
        </div>
    )
}

export default Loading