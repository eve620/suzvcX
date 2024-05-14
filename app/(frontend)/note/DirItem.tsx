import Link from "next/link";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";

interface DirItemProps {
    item: any
    index: number
    onDelete: any
    isEdit: any
}

const DirItem: React.FC<DirItemProps> = ({item, isEdit, index, onDelete}) => {
    const searchParams = useSearchParams()
    return (
        <div
            className={`relative duration-300 first:mt-0 hover:mt-0 ${(item.id === Number(searchParams.get("dir"))) ? "mt-0" : "-mt-2"} 
                 mx-auto text-center`}
            style={{zIndex: `${30 - index}`, transitionProperty: "margin"}}
        >
            <Link
                className={`block p-2 w-28 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-500 text-sm font-bold ${(item.id === Number(searchParams.get("dir"))) && "shadow-md shadow-sky-800/80"}  text-gray-100 dark:text-gray-300 rounded-3xl`}
                href={{pathname: "/note", search: `dir=${item.id}`}}
            >
                {item.name}
            </Link>
            {isEdit &&
                <div onClick={() => onDelete(item.id)}
                     className="absolute cursor-pointer hover:size-4 duration-200 size-3 bg-red-700 top-1/2 right-2 rounded-full -translate-y-1/2 translate-x-1/2"/>}
        </div>
    );
};

export default DirItem