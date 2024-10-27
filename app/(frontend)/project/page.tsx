import ProjectList from "@/app/(frontend)/project/ProjectList";
import OperationBar from "@/app/(frontend)/project/OperationBar";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Page() {
    const currentUser = await getCurrentUser()
    let requestUrl = 'http://localhost:3000/api/project/default'
    if(currentUser) requestUrl = `http://localhost:3000/api/project?id=${currentUser?.id}`
    const response = await fetch(requestUrl)
    console.log(requestUrl)
    let projectList = []
    if (response.ok) {
        const json = await response.json()
        projectList = json.data
    }
    return (
        <div className={"flex flex-col"}>
            {currentUser && <OperationBar/>}
            <ProjectList projectList={projectList}/>
        </div>
    );
}
