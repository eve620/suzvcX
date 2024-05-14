import Link from "next/link";

interface Props {
    url: string
}

export default function Back({url}: Props) {
    return (
        <Link href={url}
              className={"text-sm inline-block w-fit bold bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded hover:opacity-80 dark:hover:opacity-90"}
              replace>
            back
        </Link>
    );
}