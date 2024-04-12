import EnglishLayout from "@/app/(frontend)/english/component/EnglishLayout";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Page() {
    const currentUser = await getCurrentUser()
    const progressResponse = await fetch(`http://localhost:3000/api/course/progress?id=${currentUser?.id}`, {cache: "no-store"});
    if (!progressResponse.ok) {
        throw new Error('Failed to fetch progress data');
    }
    const progressData = await progressResponse.json();
    const courseId = progressData?.progress?.course;
    if (!courseId) {
        throw new Error('No course ID found in progress data');
    }
    const courseResponse = await fetch(`http://localhost:3000/api/course?id=${courseId}`, {cache: "no-store"});
    if (!courseResponse.ok) {
        throw new Error('Failed to fetch course data');
    }
    const courseData = await courseResponse.json();
    return (
        <EnglishLayout courseData={courseData} wordIndex={progressData.progress.wordIndex}/>
    )
}