import NoteItem from "@/app/(frontend)/note/components/NoteItem";

interface NoteListProps{
    notes: Note[]
}
export type Note = {
    id:number
    title:string,
}
const NoteList:React.FC<NoteListProps> = ({ notes }: { notes: Note[] }) => {
    return(
        <div className="sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8 mt-6">
            {notes.map((item,index)=>
                <NoteItem key={index} note={item} />)
            }
        </div>
    )
}
export default NoteList