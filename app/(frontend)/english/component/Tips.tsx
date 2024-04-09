import React, {useEffect} from "react";

interface TipsProps {
    showAnswer: () => void,
    english: string
}

const Tips: React.FC<TipsProps> = ({showAnswer, english}) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);

    function updateSource(src: string) {
        if (audioRef.current) {
            audioRef.current.src = src;
            audioRef.current.load();
        }
    }

    useEffect(() => {
        if (english) {
            updateSource(`https://dict.youdao.com/dictvoice?audio=${english}&type=2`)
        }
    }, [english])
    const handlePlayClick = async () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
            await audioElement.play();
        }
    };
    return (
        <div className={"flex justify-around px-32 py-4"}>
            <button onClick={handlePlayClick}>播放发音</button>
            <audio ref={audioRef}>
                <source src={`https://dict.youdao.com/dictvoice?audio=${english}&type=1`}/>
            </audio>
            <button onClick={showAnswer}>显示答案
            </button>
        </div>
    )
}

export default Tips