import Notes from "@/app/(frontend)/note/Notes";
import getNoteList from "@/app/actions/getNoteList";

export type Note = {
    id:number,
    title:string,
    tags:string,
    content:string,
    createdById:number
}

export default async function Page() {
    const noteList:Note[] = await getNoteList() || []
    return (
        <Notes notes={noteList}/>
    );
}

