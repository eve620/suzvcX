import ProjectList from "@/app/(frontend)/project/ProjectList";
import OperationBar from "@/app/(frontend)/project/OperationBar";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Page() {
    const currentUser = await getCurrentUser()
    const response = await fetch("http://localhost:3000/api/project")
    let projectList = []
    if (response.ok) {
        const json = await response.json()
        projectList = json.data
    }
    return (
        <div className={"flex flex-col"}>
            <OperationBar/>
            <ProjectList projectList={projectList}/>
        </div>
    );
}
