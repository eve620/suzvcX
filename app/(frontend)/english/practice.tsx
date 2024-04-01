"use client"
import React, {useEffect, useRef, useState} from "react";
import Question from "@/app/(frontend)/english/component/Question";
import Answer from "@/app/(frontend)/english/component/Answer";

const courseDate = [
    {
        name: "第一节课",
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

export default function Practice() {
    const [currentCourse, setCurrentCourse] = useState(courseDate[0])
    const statementIndex = useRef(0)
    const {chinese, english, soundmark} = currentCourse.statements[statementIndex.current]

    let failedCount = useRef(0)
    const failedCountLimit: number = 3

    const [currentMode, setCurrentMode] =
        useState<"question" | "answer" | "correct">("question")
    const [inputValue, setInputValue] = useState<string>("")

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (inputValue === english) {
                handleAnswer()
            } else {
                setInputValue("")
                failedCount.current++
                if (failedCount.current === failedCountLimit) {
                    handleAnswer()
                }
            }
        }
    }

    function handleAnswer() {
        setInputValue("")
        setCurrentMode("answer")
        if (failedCount.current !== failedCountLimit) {
            setCurrentMode("correct")
        }
        failedCount.current = 0;
    }

    function handleNext() {
        if (statementIndex.current < currentCourse.statements.length - 1) {
            setCurrentMode("question")
            statementIndex.current++
        } else alert("No more words in this course")
    }

    return (
        <div className={"absolute flex flex-col h-full w-full"}>
            <div className={"flex justify-between px-32 py-4 border-t border-b"}>
                <p>{currentCourse.name}</p>
                <button>排行榜</button>
            </div>
            <div className={"flex flex-1 flex-col justify-center items-center"}>
                {currentMode === "question" ?
                    (<Question word={chinese}/>) : (<Answer word={english} soundMark={soundmark}/>)}
                <div>
                    {currentMode === "correct" ?
                        (<button onClick={handleNext}
                                 className={"bg-amber-300 p-1 border-2 border-amber-400 rounded-xl hover:bg-amber-200"}>Next
                            Word</button>)
                        : (<input type="text" value={inputValue}
                                  onChange={handleInputValue}
                                  onKeyDown={handleKeyDown}
                                  className={"border-b-4 focus:border-black dark:focus:border-blue-800/80 bg-transparent outline-0 caret-transparent text-center"}
                        />)}
                </div>
            </div>
            <div className={"flex justify-around px-32 py-4"}>
                <button>播放发音</button>
                <button>显示答案</button>
            </div>
        </div>
    )
}