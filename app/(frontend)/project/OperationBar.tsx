"use client"
import MyButton from "@/app/components/MyButton";
import useProjectModal from "@/app/hooks/useProjectModal";

interface OperationBarProps {
}

const OperationBar: React.FC<OperationBarProps> = () => {
    const projectModal = useProjectModal()
    return (
        <div className={"flex justify-between pb-6 pr-6"}>
            <span className={"font-bold ml-10"}>我的项目：</span>
            <MyButton label={"添加项目"} onClick={projectModal.onOpen}/>
        </div>
    )
}

export default OperationBar