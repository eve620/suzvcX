import DirItem from "@/app/(frontend)/note/components/DirItem";

interface DirListProps {
    dirList: Array<any>;
    isEdit: boolean;
    onDelete: (id: number) => void;
}

const DirList: React.FC<DirListProps> = ({dirList, isEdit, onDelete}) => {
    return (
        <>
            {dirList.map((item, index) => (
                <DirItem
                    index={index}
                    key={item.id}
                    isEdit={isEdit}
                    item={item}
                    onDelete={onDelete}
                />
            ))}
        </>
    );
};

export default DirList