"use client"
import {useState} from "react";

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

const NodeItem: React.FC<NodeItemProps> = ({node, nodes}) => {
    const [showChildren, setShowChildren] = useState(false);
    const toggleChildren = () => setShowChildren((prev) => !prev);

    return (
        <div className="pl-6">
            <div onClick={toggleChildren}
                 className={"flex items-center duration-700 justify-between bg-red-200 px-4 py-2 rounded-xl mb-1"}>
                <span className={"cursor-default"}>{node.name}</span>
                <button>add</button>
            </div>
            <div
                className={`overflow-hidden duration-300 transition-height ease-in-out ${showChildren ? 'h-auto' : 'h-0'}`}>
                <Catalog nodes={nodes} parentId={node.id}/>
            </div>
        </div>
    );
};

const Catalog: React.FC<NodeTreeProps> = ({nodes, parentId = ''}) => {
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

export default Catalog