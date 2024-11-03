"use client"
import Modal from "@/app/components/modals/Modal";
import useTagModal from "@/app/hooks/useTagModal";
import {useCallback, useState} from "react";
import Input from "@/app/components/Input";
import {X} from "lucide-react";
import {Toggle} from "@/components/ui/toggle";
import showMessage from "@/app/components/Message";
import {useRouter} from "next/navigation";

interface TagModalProps {
    tags: string[]
}

const TagModal = ({tags}: TagModalProps) => {
    const [currentTags, setCurrentTags] = useState<string[]>(tags);
    const tagModal = useTagModal();
    const router = useRouter()

    const updateTags = async (newTags: String[]) => {
        const update = await fetch('/api/tag', {
            method: "PUT",
            body: JSON.stringify(newTags)
        })
        if (update.ok) {
            showMessage("编辑成功")
            router.refresh()
        } else showMessage("编辑失败")
    }

    const handleInputChange = (index: number, value: string) => {
        setCurrentTags(prevTags => {
            const newTags = [...prevTags];
            newTags[index] = value;
            return newTags;
        });
    }
    const handleDeleteTag = (index: number) => {
        setCurrentTags(prevTags => {
            const newTags = [...prevTags];
            newTags.splice(index, 1);
            return newTags;
        });
    }

    const handleOnSubmit = () => {
        setCurrentTags([...currentTags, '']);
    };

    const getBodyContent = () => (
        <div className="space-y-6 h-96 overflow-y-auto pr-4">
            {currentTags.length ?
                currentTags.map((item, index) => (
                    <div className={'flex items-center'} key={index}>
                        <Input value={currentTags[index]}
                               onChange={(e) => handleInputChange(index, e.target.value)}/>
                        <Toggle pressed={false} size={"sm"}>
                            <X onClick={() => {
                                handleDeleteTag(index)
                            }}/>
                        </Toggle>
                    </div>
                )) :
                <div className={'flex justify-center items-center h-full'}>暂无标签...</div>}
        </div>
    );

    return (
        <Modal
            isOpen={tagModal.isOpen}
            onClose={() => {
                tagModal.onClose()
                let uniqueArr = Array.from(new Set(currentTags.filter(Boolean)))
                if (tags.toString() !== uniqueArr.toString()) {
                    updateTags(uniqueArr)
                }
                setCurrentTags(uniqueArr)
            }}
            onSubmit={handleOnSubmit}
            body={getBodyContent()}
            actionLabel="添加"
        />
    );
};
export default TagModal