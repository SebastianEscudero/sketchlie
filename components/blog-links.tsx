import Image from "next/image"
import Link from "next/link";
import { Button } from "./ui/button";

interface BlogLinksProps {
    blogImage: string;
    blogHref: string;
    blogDescription: string;
    blogTitle: string;
}

export const BlogLinks = ({
    blogImage,
    blogHref,
    blogDescription,
    blogTitle
}: BlogLinksProps) => {
    return(
        <div className="flex flex-col w-auto border border-zinc-600 rounded-md md:m-3 mb-5 transform transition-all duration-150 hover:scale-105">
            <Link
                href={blogHref}
                className="flex"
            >
                <Image 
                    className="rounded-md"
                    src={blogImage}
                    alt="Blog Image"
                    width={300}
                    height={200}
                    layout="responsive"
                    
                />
            </Link>
            <div className="flex-1 flex flex-col justify-between p-5 bg-[#FFF] rounded-md">
                <div>
                    <h2 className="mb-5">
                        <strong>{blogTitle}</strong>
                    </h2>
                    <p>
                        {blogDescription}
                    </p>
                </div>
                <p className="mt-10">
                    <Link
                        href={blogHref}
                    >
                        <Button variant="blog">
                            Leer más
                        </Button>
                    </Link>
                </p>
            </div>
        </div>
    )
}