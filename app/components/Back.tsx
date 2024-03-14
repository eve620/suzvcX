import Link from "next/link";

interface Props {
    url: string
}

export default function Back({url}: Props) {
    return (
        <Link href={url} className={"dark:text-white text-center hover:bg-red-300 m-2 mt-0 p-2 w-16"}>
            back
        </Link>
    );
}