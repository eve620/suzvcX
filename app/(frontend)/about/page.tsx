import "./introduce.css"
export default function Page() {
    return (
        <div className={"w-full flex-1"}>
            <div className={"w-[44rem] h-[28rem] bg-white relative rounded-3xl overflow-hidden shadow-2xl"}>
                <img src="/avatar.jpg" className={"rounded-full absolute top-32 left-9 w-44 border-8 border-white z-10 shadow-2xl"}/>
                <div className={"head"}>
                    <div className="absolute top-28 left-72 text-white leading-10">
                        <div className="title1 text-4xl">GQJ<span className={"pl-6 text-3xl"}>西安电子科技大学</span></div>
                        <div className="title2">前端开发</div>
                    </div>
                </div>
                <div className={""}>
                    <div className="float-left text-center w-52 space-x-2 space-y-3 pt-16">
                        <span className="tag">#HTML</span>
                        <span className="tag">#CSS</span>
                        <span className="tag">#JS</span>
                        <span className="tag">#JQ</span>
                        <span className="tag">#bootstrap</span>
                        <span className="tag">#PR</span>
                        <span className="tag">#AE</span>
                        <span className="tag">#Vscode</span>
                    </div>
                    <div className="text-xl leading-9 float-left w-[450px] pl-12 pt-5">
                        <p>
                            Hello everyone, I am very glad to have the opportunity to introduce
                            myself to you. I have a strong interest in CSS and love sports...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}