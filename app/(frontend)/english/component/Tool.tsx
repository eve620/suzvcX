import React, {useEffect, useRef, useState} from "react";
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";

interface ToolProps {
    currentCourse: {
        id: number;
        title: string;
        statements: { chinese: string; english: string; soundmark: string; }[];
    }
    statementIndex: any,
    handleCourse: (id: string) => void,
    handleWord: (id: number) => void,
}

const Tool: React.FC<ToolProps> = ({currentCourse, statementIndex, handleCourse, handleWord}) => {
    const [showCourseList, setShowCourseList] = useState(false)
    const [showWordList, setShowWordList] = useState(false)
    const [courseList, setCourseList] = useState([])

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

    return (
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
            <>
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
                                onClick={() => {
                                    handleCourse(item)
                                    setShowCourseList(false)
                                }}
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
                                    handleWord(index)
                                    setShowWordList(false)
                                }}
                                key={index}>
                                <div className={"w-12 text-center"}>{index + 1}</div>
                                <div className={"w-[17rem]"}>{item.chinese}</div>
                            </div>
                        )
                    })}
                </div>
            </>
        </div>
    )
}
export default Tool