import NoteItem from "@/app/(frontend)/note/components/NoteItem";
import Empty from "@/app/components/Empty";

interface NoteListProps {
    notes: Note[]
}

export type Note = {
    id: number
    title: string,
}
const NoteList: React.FC<NoteListProps> = ({notes}: { notes: Note[] }) => {
    return (
        <>
            {notes.length ?
                <div className="sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8 mt-6">
                    {notes.map((item, index) =>
                        <NoteItem key={index} note={item}/>)
                    }
                </div> :
                <Empty/>
            }
        </>
    )
}
export default NoteList