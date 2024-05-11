"use client"
import React from 'react';
import {Layout, Menu} from "antd";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";

const {Header, Content, Footer} = Layout;
const items = [
    {
        key: "/admin",
        label: (
            <Link href={"/admin"}>首页</Link>
        ),
    },
    {
        key: "/admin/user",
        label: (
            <Link href={"/admin/user"}>用户</Link>
        ),
    },
];
export default function AdminLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter()
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[usePathname()]}
                    items={items}
                    style={{flex: 1, minWidth: 0}}
                />
                <div className={"text-white cursor-pointer"} onClick={() => router.push("/")}>返回前台</div>
            </Header>
            <Content style={{padding: '20px 48px 0 48px'}}>
                {children}
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Created by Me
            </Footer>
        </Layout>
    );
}
