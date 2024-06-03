import Image from "next/image"
import Link from "next/link";

interface TemplateLinkProps {
    image: string;
    name: string;
    href: string;
}

export const TemplateLink = ({
    image,
    name,
    href
}: TemplateLinkProps) => {
    return(
        <div className="flex flex-col w-auto mb-5 hover:border-black hover:opacity-90">
            <Link
                href={href}
                className="flex"
                title={name}
            >
                <Image 
                    className="border border-black rounded-xl w-full"
                    src={image}
                    alt={name}
                    width={900}
                    height={700}
                />
            </Link>
            <a href={href}>
                <h2 className="mb-5 xl:text-2xl lg:text-xl md:text-lg text-xl text-black mt-2 ml-1 font-semibold hover:text-custom-blue">
                    Plantilla de {name}
                </h2>
            </a>
        </div>
    )
}