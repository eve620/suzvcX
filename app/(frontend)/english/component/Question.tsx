import React, {useEffect, useState} from "react";
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
    const words = english.split(" ");
    const [inputWords, setInputWords] = useState<string[]>([""])
    const tipAudio = new Audio();

    useEffect(() => {
        setInputValue("")
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [chinese, english, soundmark]);

    useEffect(() => {
        // 当 inputValue 发生变化时，触发此回调函数
        const words = inputValue.split(" ");
        setInputWords(words);
    }, [inputValue]);

    const validateInput = (value: string) => {
        return !(value.startsWith(" ") || value.endsWith("  ") || countSpaces(value) > english.split(" ").length - 1);

    };

    function countSpaces(str: string) {
        // 使用正则表达式匹配字符串中的空格，并返回匹配结果的数量
        return (str.match(/ /g) || []).length;
    }

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (validateInput(event.target.value)) {
            setInputValue(event.target.value);
            if (tipAudio) {
                tipAudio.src = "/sounds/typing.mp3"
                tipAudio.load()
                tipAudio.play()
            }
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
                if (tipAudio) {
                    tipAudio.src = "/sounds/right.mp3"
                    tipAudio.load()
                    tipAudio.play()
                }
                handleAnswer()
            } else {
                setInputValue("")
                if (tipAudio) {
                    tipAudio.src = "/sounds/error.mp3"
                    tipAudio.load()
                    tipAudio.play()
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
                    <audio autoPlay ref={audioRef}>
                        <source src={`https://dict.youdao.com/dictvoice?audio=${english}&type=1`}/>
                    </audio>
                </div> :
                <div className={"text-2xl"}>{chinese}</div>
            }
            <div className={"relative flex flex-wrap justify-center gap-2 transition-all"}>
                {words.map((word, index) => (
                    <div key={index}
                         className={`h-[4rem] text-center min-w-16 leading-none border-solid rounded-[2px] border-b-2 text-[3rem] transition-all ${inputWords.length - 1 === index && "border-fuchsia-500"}`}
                    >
                        {inputWords[index]}
                    </div>
                ))}
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