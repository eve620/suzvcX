import EnglishLayout from "@/app/(frontend)/english/component/EnglishLayout";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Page() {
    const currentUser = await getCurrentUser();
    return (
        <EnglishLayout currentUserId={currentUser?.id}/>
    )
}