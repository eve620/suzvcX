"use client"
import Button from "@/app/components/Button";
import useProjectModal from "@/app/hooks/useProjectModal";

interface OperationBarProps {
}

const OperationBar: React.FC<OperationBarProps> = () => {
    const projectModal = useProjectModal()
    return (
        <div className={"flex justify-between pb-6 pr-6"}>
            <span className={"font-bold ml-10"}>我的项目：</span>
            <Button label={"添加项目"} onClick={projectModal.onOpen}/>
        </div>
    )
}

export default OperationBar