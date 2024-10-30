import getCurrentUser from "@/app/actions/getCurrentUser";
import Notes from "@/app/(frontend)/note/Notes";
import getNoteList from "@/app/actions/getNoteList";
import LoginAuth from "@/app/components/LoginAuth";

export type Note = {
    id:number,
    title:string,
    tags:string,
    content:string,
    createdById:number
}

export default async function Page() {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <LoginAuth/>
    }
    const noteList:Note[] = await getNoteList() || []
    return (
        <Notes notes={noteList}/>
    );
}

