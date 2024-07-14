import Image from "next/image"
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface BlogLinksProps {
    blogImage: string;
    blogHref: string;
    blogDescription: string;
    blogTitle: string;
    isNew?: boolean;
}

export const BlogLinks = ({
    blogImage,
    blogHref,
    blogDescription,
    blogTitle,
    isNew,
}: BlogLinksProps) => {
    return(
        <div className="flex flex-col w-auto border border-zinc-400 rounded-md mb-5 transform transition-all duration-150 hover:scale-102 hover:border-black dark:hover:border-zinc-300">
            <Link
                href={blogHref}
                className="flex"
                title={blogTitle}
            >
                <Image 
                    className="rounded-t-md w-full"
                    src={blogImage}
                    alt={blogTitle}
                    width={1920}
                    height={1080}
                />
            </Link>
            <div className="flex-1 flex flex-col justify-between p-5 bg-white dark:bg-[#020817] rounded-b-md">
                <div>
                    {isNew ? <Badge className="mb-3" variant="new">Reciente</Badge> : null} 
                    <h2 className="mb-5 lg:text-2xl text-xl text-black dark:text-white">
                        {blogTitle}
                    </h2>
                    <p>
                        {blogDescription}
                    </p>
                </div>
                <div className="mt-10">
                    <Link
                        href={blogHref}
                        title={blogTitle}
                    >
                        <Button variant="auth">
                            Leer más
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}