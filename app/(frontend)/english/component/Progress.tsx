import React from "react";

interface ProgressProps {
    currentMode: string,
    progress: number
}

const Progress: React.FC<ProgressProps> = ({currentMode, progress}) => {

    return (
        <div className={"h-3 bg-green-500 rounded rounded-l-none duration-200"}
             style={{width: `${currentMode === "Summary" ? "100%" : progress * 100 + "%"}`}}/>
    )
}

export default Progress;