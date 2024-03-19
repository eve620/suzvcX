import Link from "next/link";

interface Props {
    url: string
}

export default function Back({url}: Props) {
    return (
        <Link href={url} className={"block dark:text-white text-center hover:bg-red-300 mb-2 p-2 w-16"}>
            back
        </Link>
    );
}