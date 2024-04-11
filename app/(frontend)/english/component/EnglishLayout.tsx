"use client"
import React, {useEffect, useState} from "react";
import Answer from "@/app/(frontend)/english/component/Answer";
import {Summary} from "@/app/(frontend)/english/component/Summary";
import Question from "@/app/(frontend)/english/component/Question";
import Tool from "@/app/(frontend)/english/component/Tool";
import Tips from "@/app/(frontend)/english/component/Tips";
import Progress from "@/app/(frontend)/english/component/Progress";

// TODO:利用防抖定时存储数据

interface EnglishLayoutProps {
    currentUserId?: number
}

const EnglishLayout: React.FC<EnglishLayoutProps> = ({currentUserId}) => {
    const [progress, setProgress] = useState({
            course: "01",
            wordIndex: 0
        }
    )
    const [currentCourseId, setCurrentCourseId] = useState<string | null>(null)
    const [currentCourse, setCurrentCourse] = useState({
        title: "",
        statements: [{chinese: "", english: "", soundmark: ""}]
    })
    const [statementIndex, setStatementIndex] = useState(progress.wordIndex)
    const [failedCount, setFailedCount] = useState(0);
    const [currentMode, setCurrentMode] =
        useState<"Question" | "Answer" | "Summary">("Question")
    const word = currentCourse.statements[statementIndex]
    const percent = ((statementIndex / currentCourse.statements.length) * 100).toFixed(2)


    useEffect(() => {
        const getUserProgress = async () => {
            const response = await fetch(`/api/course/progress?id=${currentUserId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json()
            setProgress({
                course: data.data.course,
                wordIndex: data.data.wordIndex
            })
        }
        getUserProgress()
    }, [currentUserId])

    useEffect(() => {
        async function initProgress() {
            await handleCourse(progress.course)
            setStatementIndex(progress.wordIndex)
        }

        initProgress()
    }, [progress])

    useEffect(() => {
        async function updateProgress() {
            const update = await fetch("http://localhost:3000/api/course/progress", {
                method: "PUT",
                body: JSON.stringify({
                    course: currentCourseId,
                    wordIndex: statementIndex,
                    userId: currentUserId
                })
            })
        }

        const timeoutId = setTimeout(() => {
            updateProgress()
            console.log("定时器被执行")
        }, 5000)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [currentCourseId, statementIndex, currentUserId])


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
            setCurrentCourse(data)
            setCurrentCourseId(id)
            setStatementIndex(0)
            setFailedCount(0)
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
        setFailedCount(0)
        setCurrentMode("Answer")
    }

    function handleWord(index: number) {
        if (index < currentCourse.statements.length && index >= 0) {
            setStatementIndex(index)
            setFailedCount(0)
            setCurrentMode("Question")
        }
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
            <Progress currentMode={currentMode} percent={percent}/>
            <div className={"flex flex-1 flex-col justify-center items-center"}>
                {CurrentView}
            </div>
            <Tips statementIndex={statementIndex} handleWord={handleWord} showAnswer={showAnswer}
                  english={word.english}/>
        </div>
    )
}

export default EnglishLayout