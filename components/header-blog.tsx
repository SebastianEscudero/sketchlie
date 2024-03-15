import Image from "next/image"
import Link from "next/link";
import { Button } from "./ui/button";

interface BlogLinksProps {
    blogImage: string;
    blogHref: string;
    blogDescription: string;
    blogTitle: string;
}

export const HeaderBlog = ({
    blogImage,
    blogHref,
    blogDescription,
    blogTitle
}: BlogLinksProps) => {
    return(
        <div className="flex md:flex-row flex-col-reverse w-auto rounded-lg border border-zinc-600">
            <div className="flex-1 flex flex-col justify-between p-10 bg-[#1C1C1E] md:rounded-l-lg rounded-l-none text-[#FFF]">
                <div>
                    <h2 className="mb-5 xl:text-4xl md:text-2xl text-3xl">
                        {blogTitle}
                    </h2>
                    <p className="h-[70%] md:mb-0 mb-5 text-zinc-200 xl:text-2xl md:text-xl text-2xl">
                        {blogDescription}
                    </p>
                </div>
                <div>
                    <Link href={blogHref}>
                        <Button variant="outline" className="mt-3 xl:text-xl xl:p-7 text-lg p-6">
                            Leer más
                        </Button>
                    </Link>
                </div>
            </div>
            <Link
                href={blogHref}
                className="md:flex-grow md:max-w-[70%] bg-[#F5F5F5] flex items-center justify-center"
            >
                <Image 
                    className="rounded-lg"
                    src={blogImage}
                    alt="Blog Image"
                    width={300}
                    height={200}
                    layout="responsive"
                />
            </Link>
        </div>
    )
}