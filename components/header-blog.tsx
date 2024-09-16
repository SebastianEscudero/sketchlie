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
        <div className="flex md:flex-row flex-col-reverse w-auto rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-blue-50 via-white to-yellow-50">
            <div className="flex-1 flex flex-col justify-between p-8 md:p-10">
                <div>
                    {isNew && <Badge className="mb-4 bg-yellow-400 text-blue-900 font-semibold px-3 py-1">Reciente</Badge>} 
                    <h1 className="mb-6 text-3xl md:text-4xl xl:text-5xl font-bold text-blue-900">
                        {blogTitle}
                    </h1>
                    <p className="mb-6 text-lg md:text-xl xl:text-2xl text-blue-700">
                        {blogDescription}
                    </p>
                </div>
                <div>
                    <Link href={blogHref}>
                        <Button className="mt-4 px-8 py-3 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 text-blue-900 transition-colors duration-300">
                            Leer más
                        </Button>
                    </Link>
                </div>
            </div>
            <Link
                href={blogHref}
                className="md:w-[50%] lg:w-[60%] relative overflow-hidden"
                title={blogTitle}
            >
                <Image 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    src={blogImage}
                    alt={blogTitle}
                    width={1920}
                    height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </Link>
        </div>
    )
}