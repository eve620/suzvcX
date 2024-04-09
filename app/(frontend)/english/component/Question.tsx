import React, {useState} from "react";
import Display from "@/app/(frontend)/english/component/Display";

interface QuestionProps {
    word: {
        chinese: string,
        english: string,
        soundmark: string,
    }
    failedCount: number,
    handleFailedCount: () => void,
    handleAnswer: () => void,
}

function Question({word: {chinese, english, soundmark}, failedCount, handleFailedCount, handleAnswer}: QuestionProps) {
    const [inputValue, setInputValue] = useState("");
    const failedCountLimit = 3;
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const rightAudio = new Audio();

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (rightAudio) {
            rightAudio.src = "/sounds/typing.mp3"
            rightAudio.load()
            rightAudio.play()
        }
    };
    const handlePlayClick = async () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
            await audioElement.play();
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (inputValue.toLowerCase() === english.toLowerCase()) {
                if (rightAudio) {
                    rightAudio.src = "/sounds/right.mp3"
                    rightAudio.load()
                    rightAudio.play()
                }
                handleAnswer()
            } else {
                setInputValue("")
                if (rightAudio) {
                    rightAudio.src = "/sounds/error.mp3"
                    rightAudio.load()
                    rightAudio.play()
                }
                handleFailedCount()
            }
        }
    }

    return (
        <>
            {failedCount >= failedCountLimit ?
                <div className={"flex flex-col items-center"}>
                    <Display chinese={chinese} soundmark={soundmark} english={english}
                             handlePlayClick={handlePlayClick}/>
                    <audio ref={audioRef} autoPlay>
                        <source src={`https://dict.youdao.com/dictvoice?audio=${english}&type=1`}/>
                    </audio>
                </div> :
                <div className={"text-2xl"}>{chinese}</div>
            }
            <div className={"relative flex flex-wrap justify-center gap-2 transition-all"}>
                {/* todo: 分词设计有思路了，将输入按照空格split成数组*/}
                <div
                    className="h-[4rem] text-center min-w-32 leading-none border-solid rounded-[2px] border-b-2 text-[3rem] transition-all"
                >
                    {inputValue}
                </div>
                <input type="text" value={inputValue}
                       onChange={handleInputValue}
                       onKeyDown={handleKeyDown}
                       onMouseDown={(event) => {
                           event.preventDefault()
                           inputRef.current && inputRef.current.focus()
                       }}
                       ref={inputRef}
                       className={"absolute h-full w-full opacity-0"}
                />
            </div>
        </>
    )
}

export default Question