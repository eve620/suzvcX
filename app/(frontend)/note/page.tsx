import Breadcrumb from "@/app/(frontend)/note/Breadcrumb";
import Notes from "@/app/(frontend)/note/Notes";

export default function Page({searchParams: {dir, id}}: { searchParams: { dir: string, id: string } }) {
    const dirMenu = [
        {id: 1, name: "分类1"},
        {id: 2, name: "分类5"},
        {id: 3, name: "分类6"}]
    const menu= [
        {id: 1, parentId: 1, title: "前端"},
        {id: 2, parentId: 1, title: "移动端"},
        {id: 3, parentId: 2, title: "react"},
        {id: 4, parentId: 3, title: "python"}
    ]
    return (
        <>
            <Breadcrumb dir={dir} id={id} dirMenu={dirMenu} menu={menu}/>
            <Notes dir={dir} id={id} dirMenu={dirMenu} menu={menu}/>
        </>
    );
}
