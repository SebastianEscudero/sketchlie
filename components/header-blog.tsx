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

export const HeaderBlog = ({
    blogImage,
    blogHref,
    blogDescription,
    blogTitle,
    isNew,
}: BlogLinksProps) => {
    return(
        <div className="flex md:flex-row flex-col-reverse w-auto rounded-lg border border-zinc-400 transform transition-all duration-200 hover:scale-102 hover:border-black">
            <div className="flex-1 flex flex-col justify-between p-10 bg-[#1C1C1E] md:rounded-l-lg md:rounded-r-none rounded-b-md text-[#FFF]">
                <div>
                    {isNew ? <Badge className="mb-3" variant="new">Reciente</Badge> : null} 
                    <h1 className="mb-5 xl:text-4xl md:text-2xl text-3xl">
                        {blogTitle}
                    </h1>
                    <p className="h-[70%] md:mb-0 mb-5 text-zinc-200 xl:text-2xl md:text-xl text-2xl">
                        {blogDescription}
                    </p>
                </div>
                <div>
                    <Link href={blogHref}>
                        <Button variant="auth" className="mt-3 xl:text-xl xl:p-7 text-lg p-6">
                            Leer más
                        </Button>
                    </Link>
                </div>
            </div>
            <Link
                href={blogHref}
                className="md:flex-grow md:max-w-[60%] bg-[#F5F5F5] flex items-center justify-center md:rounded-r-lg rounded-t-lg"
                title={blogTitle}
            >
                <Image 
                    className="rounded-lg w-full"
                    src={blogImage}
                    alt={blogTitle}
                    width={1920}
                    height={1080}
                />
            </Link>
        </div>
    )
}