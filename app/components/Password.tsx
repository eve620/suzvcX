import {useRef, useState} from "react";

interface PasswordProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    value?: string;
}

const Password: React.FC<PasswordProps> = ({
                                               onChange,
                                               onKeyDown,
                                               value
                                           }) => {
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const showPwd = (e: any) => {
        e.preventDefault()
        const password = passwordRef.current;
        // 记录光标位置
        const cursorPosition = password?.selectionStart;
        setIsPasswordShow(!isPasswordShow)

        setTimeout(() => {
            password?.setSelectionRange(cursorPosition || 0, cursorPosition || 0);
        }, 0);

    }
    return (
        <div className="w-full px-5 relative flex items-center justify-between">
            <input
                ref={passwordRef}
                type={`${isPasswordShow ? "text" : "password"}`}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={value}
                autoComplete="current-password"
                placeholder=""
                className={`
                 w-full
                  py-2
                  pl-3
                  pr-9
                  peer
                  text-black
                  bg-white 
                  border-2
                  rounded-md
                  outline-none
                  ${!isPasswordShow && 'font-sans'}
                  transition
                  border-neutral-300
                  focus:border-black`}/>
            <label
                className={`
          absolute     
          text-xs
          px-1
          text-neutral-400
          duration-150 
          -translate-y-5
          bg-white
          font-bold
          left-8
          z-10 
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-90
          peer-focus:-translate-y-5
          peer-focus:text-black
        `}
            >
                密码
            </label>
            <button onMouseDown={(e) => e.preventDefault()}
                    className={"absolute right-8 top-3 hidden peer-focus:block"} onClick={showPwd}>
                {isPasswordShow ?
                    <svg className="icon" viewBox="0 0 1024 1024" width="20" height="20">
                        <path
                            d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3-7.7 16.2-7.7 35.2 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766z"
                            fill="#515151"></path>
                        <path
                            d="M508 336c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
                            fill="#515151"></path>
                    </svg> :
                    <svg className="icon" viewBox="0 0 1024 1024" width="20" height="20">
                        <path
                            d="M942.3 486.4l-0.1-0.1-0.1-0.1c-36.4-76.7-80-138.7-130.7-186L760.7 351c43.7 40.2 81.5 93.7 114.1 160.9C791.5 684.2 673.4 766 512 766c-51.3 0-98.3-8.3-141.2-25.1l-54.7 54.7C374.6 823.8 439.8 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0.1-51.3zM878.3 154.2l-42.4-42.4c-3.1-3.1-8.2-3.1-11.3 0L707.8 228.5C649.4 200.2 584.2 186 512 186c-192.2 0-335.4 100.5-430.2 300.3v0.1c-7.7 16.2-7.7 35.2 0 51.5 36.4 76.7 80 138.7 130.7 186.1L111.8 824.5c-3.1 3.1-3.1 8.2 0 11.3l42.4 42.4c3.1 3.1 8.2 3.1 11.3 0l712.8-712.8c3.1-3 3.1-8.1 0-11.2zM398.9 537.4c-1.9-8.2-2.9-16.7-2.9-25.4 0-61.9 50.1-112 112-112 8.7 0 17.3 1 25.4 2.9L398.9 537.4z m184.5-184.5C560.5 342.1 535 336 508 336c-97.2 0-176 78.8-176 176 0 27 6.1 52.5 16.9 75.4L263.3 673c-43.7-40.2-81.5-93.7-114.1-160.9C232.6 339.8 350.7 258 512 258c51.3 0 98.3 8.3 141.2 25.1l-69.8 69.8z"
                            fill="#515151"></path>
                        <path
                            d="M508 624c-6.4 0-12.7-0.5-18.8-1.6l-51.1 51.1c21.4 9.3 45.1 14.4 69.9 14.4 97.2 0 176-78.8 176-176 0-24.8-5.1-48.5-14.4-69.9l-51.1 51.1c1 6.1 1.6 12.4 1.6 18.8C620 573.9 569.9 624 508 624z"
                            fill="#515151"></path>
                    </svg>
                }
            </button>
        </div>
    )
}

export default Password