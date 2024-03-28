"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
import Button from "@/app/components/Button";

const mock = [
    {id: 1, name: "文件夹1", parent: ""},
    {id: 2, name: "文件夹2", parent: "1"},
    {id: 3, name: "文件夹3", parent: "2"},
    {id: 4, name: "文件夹4", parent: "6"},
    {id: 5, name: "文件夹5", parent: ""},
    {id: 6, name: "文件夹6", parent: "5"}]

interface NodeTreeProps {
    nodes: any[]
    parentId?: string
}

interface Node {
    id: string;
    name: string;
    parent: string;
};

interface NodeItemProps {
    node: Node;
    nodes: Node[];
};
export default function Page() {
    const NoteTree: React.FC<NodeTreeProps> = ({nodes, parentId = ''}) => {
        const filteredNodes = nodes.filter((item) => item.parent == parentId);
        if (!filteredNodes) return null;
        return (
            <div>
                {filteredNodes.map((item: Node) => (
                    <NodeItem key={item.id} node={item} nodes={nodes}/>
                ))}
            </div>
        );
    };

    const NodeItem: React.FC<NodeItemProps> = ({node, nodes}) => {
        const [showChildren, setShowChildren] = useState(false);
        const toggleChildren = () => setShowChildren((prev) => !prev);

        return (
            <div className="pl-6">
                <span onClick={toggleChildren}>{node.name}</span>
                {showChildren &&
                    <div>
                        <NoteTree nodes={nodes} parentId={node.id}/>
                    </div>}
            </div>
        );
    };

    const router = useRouter()
    const list = [
        {name: "第一个笔记", id: "1"},
        {name: "第二个笔记", id: "2"}
    ]
    const [items, setItems] = useState(list);
    const [selectedIds, setSelectedIds] = useState([""]);
    const handleSelect = (itemId: string) => {
        if (selectedIds.includes(itemId)) {
            setSelectedIds(selectedIds.filter(id => id !== itemId));
        } else {
            setSelectedIds([...selectedIds, itemId]);
        }
    };

    const handleDelete = () => {
        const updatedItems = items.filter(item => !selectedIds.includes(item.id));
        setItems(updatedItems);
        setSelectedIds([]);
    };
    return (
        <div className={""}>
            {<div className={"flex dark:border-b justify-end space-x-3 md:space-x-10 py-1 pr-5"}>
                <Button label={"添加笔记"} onClick={() => {
                    router.push("/note/add")
                }}/>
            </div>}
            <div>
                <div className="flex items-start">
                    <div className={"w-56 dark:border-r p-5"}>
                        <NoteTree nodes={mock}/>
                    </div>
                    <div className={"flex"}>
                        {items.map(item => {
                            return (
                                <div key={item.id} onClick={() => {
                                    router.push(`/note/${item.id}`)
                                }}
                                     className="m-2 p-2 text-center rounded-xl dark:border hover:bg-amber-500 hover:border-amber-700">
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
