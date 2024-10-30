"use client"
import Link from "next/link";

const TopBar: React.FC = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('aboutSection');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <span>About Glog ，My one project</span>
            <span onClick={scrollToAbout}
                  className="mt-4 block rounded-lg bg-white px-5 py-3
                      text-center text-sm font-medium text-purple-600 transition
                      hover:bg-white/90 hover:text-pink-500
                      focus:outline-none focus:ring active:text-pink-500 sm:mt-0">
                关于我
            </span>
        </>
    )
}
export default TopBar