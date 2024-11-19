import {create} from 'zustand';

interface ProjectModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    curProject: any;
    setProject: any;
}

const useProjectModal = create<ProjectModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false, curProject: null}),
    curProject: null,
    setProject: (project) => set({curProject: project}),
}));


export default useProjectModal;
