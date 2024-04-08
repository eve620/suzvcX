"use client"
import React, {useEffect, useRef, useState} from "react";
import Answer from "@/app/(frontend)/english/component/Answer";
import {Summary} from "@/app/(frontend)/english/component/Summary";
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";
import Question from "@/app/(frontend)/english/component/Question";
import Tool from "@/app/(frontend)/english/component/Tool";

const courseDate = [
    {
        id: 1,
        title: "第一节课",
        statements: [
            {
                "chinese": "现在",
                "english": "now",
                "soundmark": "/naʊ/"
            },
            {
                "chinese": "未来",
                "english": "future",
                "soundmark": "/ˈfjuːtʃər/"
            },
            {
                "chinese": "喜欢",
                "english": "like",
                "soundmark": "/xihuan/"
            },
            {
                "chinese": "我爱你",
                "english": "I love you",
                "soundmark": "/wo ai ni/"
            }
        ]
    }
]

export default function Page() {
    const [currentCourse, setCurrentCourse] = useState(courseDate[0])
    const [statementIndex, setStatementIndex] = useState(0)
    const [currentMode, setCurrentMode] =
        useState<"Question" | "Answer" | "Summary">("Question")

    const word = currentCourse.statements[statementIndex]
    const progress = statementIndex / currentCourse.statements.length

    const courseRef = useRef<HTMLDivElement | null>(null);
    const statementRef = useRef<HTMLDivElement | null>(null);
    const courseButtonRef = useRef<HTMLButtonElement | null>(null);
    const statementButtonRef = useRef<HTMLButtonElement | null>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [failedCount, setFailedCount] = useState(0);

    function updateSource(src: string) {
        if (audioRef.current) {
            audioRef.current.src = src;
            audioRef.current.load();
        }
    }

    useEffect(() => {
        if (word) {
            updateSource(`https://dict.youdao.com/dictvoice?audio=${word.english}&type=2`)
        }
    }, [word])

    function handleNext() {
        if (statementIndex < currentCourse.statements.length - 1) {
            setCurrentMode("Question")
            setFailedCount(0)
            setStatementIndex(statementIndex + 1)
        } else {
            setFailedCount(0)
            setCurrentMode("Summary")
        }
    }

    async function handleCourse(id: string) {
        const response = await fetch(`/api/course?id=${id}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setCurrentCourse(data)
            setStatementIndex(0)
            setCurrentMode("Question")
        } else {
            // Handle error
            throw new Error('Network response was not ok');
        }
    }

    const handlePlayClick = async () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
            await audioElement.play();
        }
    };

    function showAnswer() {
        if (currentMode === "Question" && failedCount < 3) {
            console.log(111)
            setFailedCount(3)
        }
    }

    function handleFailedCount() {
        setFailedCount(failedCount + 1)
    }

    function handleAnswer() {
        setCurrentMode("Answer")
    }

    function handleFinished() {
        setCurrentMode("Question")
        setStatementIndex(0)
    }

    function handleWord(index: number) {
        setStatementIndex(index)
        setCurrentMode("Question")
    }


    const viewMap = {
        Summary: <Summary handleFinished={handleFinished}></Summary>,
        Question: <Question word={word} failedCount={failedCount} handleFailedCount={handleFailedCount}
                            handleAnswer={handleAnswer}/>,
        Answer: <Answer word={word} handleNext={handleNext}/>,
    };

    const CurrentView = viewMap[currentMode];


    return (
        <div className={"absolute h-full w-full flex flex-col"}>
            <Tool currentCourse={currentCourse} statementIndex={statementIndex} handleCourse={handleCourse}
                  handleWord={handleWord}/>
            <div className={"h-3 bg-green-500 rounded rounded-l-none duration-200"}
                 style={{width: `${currentMode === "Summary" ? "100%" : progress * 100 + "%"}`}}/>
            <div className={"flex flex-1 flex-col justify-center items-center"}>
                {CurrentView}
            </div>
            <div className={"flex justify-around px-32 py-4"}>
                <button onClick={handlePlayClick}>播放发音</button>
                <audio ref={audioRef}>
                    <source src={`https://dict.youdao.com/dictvoice?audio=${word.english}&type=1`}/>
                </audio>
                <button onClick={showAnswer}>显示答案
                </button>
            </div>
        </div>
    )
}