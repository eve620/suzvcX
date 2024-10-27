import getCurrentUser from "@/actions/getCurrentUser";
import Notes from "@/app/(frontend)/note/Notes";

export default async function Page() {
    const currentUser = await getCurrentUser()
    let dirMenu = []
    let menu = []
    if (!currentUser) {
        return <div>请先登录</div>
    }
    const dirResponse = await fetch(`http://localhost:3000/api/note/dir?id=${currentUser.id}`, {cache: "no-store"})
    if (dirResponse.ok) {
        dirMenu = await dirResponse.json().then(data => data.data);
    }
    const menuResponse = await fetch(`http://localhost:3000/api/note/inner?id=${currentUser.id}`, {cache: "no-store"})
    if (menuResponse.ok) {
        menu = await menuResponse.json().then(data => data.data);
    }
    return (
        <Notes/>
    );
}

