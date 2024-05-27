import EnglishLayout from "@/app/(frontend)/english/component/EnglishLayout";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Page() {
    const currentUser = await getCurrentUser()
    let wordIndex = 0
    let courseData
    if (currentUser) {
        const progressResponse = await fetch(`http://localhost:3000/api/course/progress?id=${currentUser?.id}`, {cache: "no-store"});
        if (!progressResponse.ok) {
            throw new Error('Failed to fetch progress data');
        }
        const progressData = await progressResponse.json();
        wordIndex = progressData.progress.wordIndex
        const courseId = progressData.progress.course;
        if (!courseId) {
            throw new Error('No course ID found in progress data');
        }
        const courseResponse = await fetch(`http://localhost:3000/api/course?id=${courseId}`, {cache: "no-store"});
        if (!courseResponse.ok) {
            throw new Error('Failed to fetch course data');
        }
        courseData = await courseResponse.json();
    } else {
        const courseResponse = await fetch("http://localhost:3000/api/course?id=01");
        if (!courseResponse.ok) {
            throw new Error('Failed to fetch course data');
        }
        courseData = await courseResponse.json();
    }
    return (
        <EnglishLayout courseData={courseData} wordIndex={wordIndex}/>
    )
}