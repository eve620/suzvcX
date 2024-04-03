import React, {useRef} from "react";

export default function Answer({word, soundMark,handleNext}: { word: string, soundMark: string, handleNext: () => void }) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const handlePlayClick = async () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
            await audioElement.play();
        }
    };
    return (
        <div className={"flex flex-col items-center"}>
            <div className={"flex"}>
                <div>{word}</div>
                <svg
                    className="w-7 h-7 inline-block ml-1 cursor-pointer"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handlePlayClick}>
                    <path
                        d="M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z"
                        fill="#666666"></path>
                </svg>
            </div>
            <div>{soundMark}</div>
            <audio autoPlay ref={audioRef}>
                <source src={`https://dict.youdao.com/dictvoice?audio=${word}&type=1`}/>
            </audio>
            <button onClick={handleNext}
                    className={"bg-amber-300 p-1 border-2 border-amber-400 rounded-xl hover:bg-amber-200"}>Next
                Word
            </button>
        </div>
    )
}