import ProjectList from "@/app/(frontend)/project/ProjectList";
import OperationBar from "@/app/(frontend)/project/OperationBar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getProjectList from "@/app/actions/getProjectList";

export type Project = {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    job: string;
    stacks: string;
    describe: string;
    highlight: string;
    imageUrl: string;
    createdById: number;
}
export default async function Page() {
    const currentUser = await getCurrentUser()
    const projectList: Project[] = await getProjectList() || []
    return (
        <div className={"flex flex-col"}>
            {currentUser && <OperationBar/>}
            <ProjectList projectList={projectList}/>
        </div>
    );
}
