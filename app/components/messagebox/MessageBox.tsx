"use client"

import {useEffect, useRef, useState} from "react";
import "./messageBox.css";

const MessageBox: React.FC = () => {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isMessageBoxShow, setIsMessageBoxShow] = useState(true);
    const messageDragRef = useRef<HTMLDivElement | null>(null);
    const messageContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleResize = () => {
            // 当窗口大小改变时，重新计算对话框的位置
            const maxRight = document.documentElement.clientWidth - messageContainerRef.current!.offsetWidth;
            const maxBottom = document.documentElement.clientHeight - messageContainerRef.current!.offsetHeight;
            let newX = Math.min(messageContainerRef.current!.getBoundingClientRect().x, maxRight);
            let newY = Math.min(messageContainerRef.current!.getBoundingClientRect().y, maxBottom);
            setPosition({x: newX < 0 ? 0 : newX, y: newY < 0 ? 0 : newY});
        };
        window.addEventListener('resize', handleResize)
    }, []);

    useEffect(() => {
        let isDragging = false;
        let initialX = 0;
        let initialY = 0;
        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            initialX = e.clientX - position.x;
            initialY = e.clientY - position.y;
            document.body.classList.add('noSelect');
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            let newX = Math.max(0, e.clientX - initialX);
            let newY = Math.max(0, e.clientY - initialY);

            // 如果需要，也可以限制最大值，确保不会超出窗口边界
            const maxRight = document.documentElement.clientWidth - messageContainerRef.current!.offsetWidth;
            const maxBottom = document.documentElement.clientHeight - messageContainerRef.current!.offsetHeight;
            newX = Math.min(maxRight, newX);
            newY = Math.min(maxBottom, newY);

            setPosition({
                x: newX < 0 ? 0 : newX,
                y: newY < 0 ? 0 : newY,
            });
        };

        const handleMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.classList.remove('noSelect');
        };

        const currentMessageDragRef = messageDragRef.current;
        if (currentMessageDragRef) {
            currentMessageDragRef.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (currentMessageDragRef) {
                currentMessageDragRef.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, [position]);
    return (
        <div ref={messageContainerRef}
             className={"bg-gray-100 rounded-xl overflow-hidden w-64 h-80 fixed z-50 shadow-lg"} style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            display: isMessageBoxShow ? 'block' : 'none'
        }}>
            <div
                ref={messageDragRef}
                className={"flex justify-end gap-3 bg-gray-200 px-3"}>
                <button className={"cursor-pointer"} onClick={() => {
                    setIsMessageBoxShow(false)
                }}>-
                </button>
                <button className={"cursor-pointer"} onClick={() => {
                    setIsMessageBoxShow(false)
                }}>x
                </button>
            </div>
            <div className={"p-3"}>聊天框</div>
        </div>
    )
}
export default MessageBox;