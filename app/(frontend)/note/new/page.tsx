import NewPage from "@/app/(frontend)/note/new/NewPage";
import getTagList from "@/app/actions/getTagList";

export default async function Page() {
    const tagList: string[] = await getTagList() || []

    return (
        <NewPage tags={tagList}/>
    )
}

