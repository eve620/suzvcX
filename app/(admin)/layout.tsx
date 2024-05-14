import React from 'react';
import getCurrentUser from "@/actions/getCurrentUser";
import AuthMessage from "@/app/components/AuthMessage";

export default async function AdminLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return (<AuthMessage message={"未登录"}/>)
    } else if (currentUser.role !== 'Admin') {
        return (<AuthMessage message={"无权限"}/>)
    }
    return (
        <>{children}</>
    );
}
