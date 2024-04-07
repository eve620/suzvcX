"use client"
import React, {useEffect, useRef, useState} from "react";
import Answer from "@/app/(frontend)/english/component/Answer";
import {Summary} from "@/app/(frontend)/english/component/Summary";
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";

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

export default function Page({searchParams: {id}}: { searchParams: { id: string } }) {
    const [currentCourse, setCurrentCourse] = useState(courseDate[0])
    const [courseList, setCourseList] = useState([])
    const [statementIndex, setStatementIndex] = useState(0)
    const [showCourseList, setShowCourseList] = useState(false)
    const [showWordList, setShowWordList] = useState(false)
    const failedCount = useRef(0)
    const [currentMode, setCurrentMode] =
        useState<"Question" | "Answer" | "Summary">("Question")
    const [inputValue, setInputValue] = useState<string>("")

    const failedCountLimit: number = 3
    const {chinese, english, soundmark} = currentCourse.statements[statementIndex]
    const progress = statementIndex / currentCourse.statements.length

    const courseRef = useRef<HTMLDivElement | null>(null);
    const statementRef = useRef<HTMLDivElement | null>(null);
    const courseButtonRef = useRef<HTMLButtonElement | null>(null);
    const statementButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const getCourseList = async () => {
            const response = await fetch("/api/course/files");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCourseList(data)
        }
        getCourseList()
    }, [])

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (inputValue.toLowerCase() === english.toLowerCase()) {
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
        setCurrentMode("Answer")
        failedCount.current = 0;
    }

    function handleNext() {
        if (statementIndex < currentCourse.statements.length - 1) {
            setCurrentMode("Question")
            setStatementIndex(statementIndex + 1)
        } else {
            setCurrentMode("Summary")
        }
    }

    async function handleCourse(id: string) {
        const response = await fetch(`/api/course?id=${id}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setCurrentCourse(data)
            setShowCourseList(false)
            setStatementIndex(0)
            setCurrentMode("Question")
        } else {
            // Handle error
            throw new Error('Network response was not ok');
        }
    }

    useOnClickOutside(courseRef.current, (event) => {
        if (courseButtonRef.current && !courseButtonRef.current.contains(event.target as Node)) {
            setShowCourseList(false)
        }
    })
    useOnClickOutside(statementRef.current, (event) => {
        if (statementButtonRef.current && !statementButtonRef.current.contains(event.target as Node)) {
            setShowWordList(false)
        }
    })


    const viewMap = {
        Summary: <Summary handleFinished={() => {
            setCurrentMode("Question")
            setStatementIndex(0)
        }}></Summary>,
        Question:
            <>
                <div>{chinese}</div>
                <input type="text" value={inputValue}
                       onChange={handleInputValue}
                       onKeyDown={handleKeyDown}
                       className={"border-b-4 focus:border-pink-300 dark:focus:border-blue-300/80 bg-transparent outline-0 caret-transparent text-center"}
                />
            </>,
        Answer: <Answer handleNext={handleNext} word={english} soundMark={soundmark}/>,
    };

    const CurrentView = viewMap[currentMode];


    return (
        <div className={"absolute flex flex-col h-full w-full"}>
            <div className={"relative flex justify-between px-8 py-4 border-t border-b"}>
                <div>
                    <button className={"mr-8 hover:text-blue-500"} ref={courseButtonRef}
                            onClick={() => setShowCourseList(!showCourseList)}>
                        {currentCourse.title}
                    </button>
                    <button className={"hover:text-fuchsia-400"} ref={statementButtonRef}
                            onClick={() => setShowWordList(!showWordList)}>
                        {`(${statementIndex + 1 + "/" + currentCourse.statements.length})`}
                    </button>
                </div>
                <button>排行榜</button>
                <div className={"absolute left-0 -bottom-3 h-3 bg-green-500 rounded rounded-l-none duration-200"}
                     style={{width: `${currentMode === "Summary" ? "100%" : progress * 100 + "%"}`}}/>
                <div
                    ref={courseRef}
                    className={`absolute left-0 top-20 w-80 overflow-x-hidden 
                    overflow-y-auto bg-white border-l-4 shadow select-none 
                    border-blue-800 dark:bg-slate-800 px-2
                    duration-300
                    ${showCourseList ? 'h-64' : 'h-0'}
                    ${showCourseList ? 'opacity-100' : 'opacity-0'}`}
                    style={{scrollbarWidth: "none"}}>
                    {courseList.sort().map((item, index) => {
                        return (
                            <div
                                className={"flex py-1 border-b whitespace-pre-wrap hover:text-blue-500 cursor-pointer"}
                                onClick={() => handleCourse(item)}
                                key={index}>
                                <div className={"font-semibold pl-6 font-mono"}>Lesson {item}</div>
                            </div>
                        )
                    })}
                </div>
                <div
                    ref={statementRef}
                    className={`absolute left-0 top-20 w-80 overflow-x-hidden 
                    overflow-y-auto bg-white border-l-4 shadow select-none 
                    border-fuchsia-400 dark:bg-slate-800 px-2
                    duration-300
                    ${showWordList ? 'opacity-100' : 'opacity-0'}
                    ${showWordList ? 'h-64' : 'h-0'}`}
                    style={{scrollbarWidth: "none"}}>
                    {currentCourse.statements.map((item, index) => {
                        return (
                            <div
                                className={"flex py-1 border-b whitespace-pre-wrap hover:text-fuchsia-400 cursor-pointer"}
                                onClick={() => {
                                    setStatementIndex(index)
                                    setCurrentMode("Question")
                                    setShowWordList(false)
                                }}
                                key={index}>
                                <div className={"w-12 text-center"}>{index + 1}</div>
                                <div className={"w-[17rem]"}>{item.chinese}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={"flex flex-1 flex-col justify-center items-center"}>
                {CurrentView}
            </div>
            <div className={"flex justify-around px-32 py-4"}>
                <button>播放发音</button>
                <button>显示答案</button>
            </div>
        </div>
    )
}