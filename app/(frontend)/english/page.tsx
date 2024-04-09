"use client"
import React, {useState} from "react";
import Answer from "@/app/(frontend)/english/component/Answer";
import {Summary} from "@/app/(frontend)/english/component/Summary";
import Question from "@/app/(frontend)/english/component/Question";
import Tool from "@/app/(frontend)/english/component/Tool";
import Tips from "@/app/(frontend)/english/component/Tips";
import Progress from "@/app/(frontend)/english/component/Progress";

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
    const [failedCount, setFailedCount] = useState(0);
    const [currentMode, setCurrentMode] =
        useState<"Question" | "Answer" | "Summary">("Question")
    const word = currentCourse.statements[statementIndex]
    const progress = statementIndex / currentCourse.statements.length

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
            throw new Error('Error');
        }
    }

    function showAnswer() {
        if (currentMode === "Question" && failedCount < 3) {
            setFailedCount(3)
        }
    }

    function handleFailedCount() {
        setFailedCount(failedCount + 1)
    }

    function handleAnswer() {
        setCurrentMode("Answer")
    }

    function handleWord(index: number) {
        setStatementIndex(index)
        setCurrentMode("Question")
    }

    const viewMap = {
        Summary: <Summary handleWord={handleWord}></Summary>,
        Question: <Question word={word} failedCount={failedCount} handleFailedCount={handleFailedCount}
                            handleAnswer={handleAnswer}/>,
        Answer: <Answer word={word} handleNext={handleNext}/>,
    };

    const CurrentView = viewMap[currentMode];


    return (
        <div className={"absolute h-full w-full flex flex-col"}>
            <Tool currentCourse={currentCourse} statementIndex={statementIndex} handleCourse={handleCourse}
                  handleWord={handleWord}/>
            <Progress currentMode={currentMode} progress={progress}/>
            <div className={"flex flex-1 flex-col justify-center items-center"}>
                {CurrentView}
            </div>
            <Tips showAnswer={showAnswer} english={word.english}/>
        </div>
    )
}