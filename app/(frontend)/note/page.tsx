import Notes from "@/app/(frontend)/note/Notes";
import getNoteList from "@/app/actions/getNoteList";
import TagModal from "@/app/components/modals/TagModal";
import getTagList from "@/app/actions/getTagList";

export type Note = {
    id: number,
    title: string,
    tags: string,
    content: string,
    createdById: number
}

export default async function Page() {
    const noteList: Note[] = await getNoteList() || []
    const tagList: string[] = await getTagList() || []
    return (
        <>
            <Notes notes={noteList} tags={tagList}/>
            <TagModal tags={tagList}/>
        </>
    );
}

