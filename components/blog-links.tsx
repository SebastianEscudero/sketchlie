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
        <div className="border border-blue-500/20 flex flex-col w-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
            <Link
                href={blogHref}
                className="relative block"
                title={blogTitle}
            >
                <Image 
                    className="w-full h-48 object-cover"
                    src={blogImage}
                    alt={blogTitle}
                    width={1920}
                    height={1080}
                />
                {isNew && (
                    <Badge className="absolute top-4 right-4 bg-yellow-400 text-blue-900 font-semibold px-3 py-1">
                        Reciente
                    </Badge>
                )}
            </Link>
            <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-blue-50 to-white">
                <div>
                    <h2 className="mb-4 text-2xl font-bold text-blue-900 line-clamp-2">
                        {blogTitle}
                    </h2>
                    <p className="text-blue-700 line-clamp-3">
                        {blogDescription}
                    </p>
                </div>
                <div className="mt-6">
                    <Link
                        href={blogHref}
                        title={blogTitle}
                    >
                        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold transition-colors duration-300">
                            Leer más
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}