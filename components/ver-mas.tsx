import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface VerMasProps {
    href: string;
   title: string;
}

export const VerMas = ({
    href,
   title,
}: VerMasProps) => {
    return(
        <div className="flex flex-col w-auto border border-zinc-400 rounded-md mb-5 transform transition-all duration-150 hover:scale-102">
            <Link href={href} className="flex flex-grow" title={title}>
                <div className="flex-1 flex flex-col justify-between p-6 bg-white dark:bg-[#020817] rounded-md">
                    <div>
                        <h2 className="mb-5 lg:text-2xl text-xl text-black dark:text-white">
                            {title}
                        </h2>
                    </div>
                    <div className="flex justify-between mt-10 hover:underline font-semibold">
                        <p>
                            Leer más
                        </p>
                        <ArrowRight />
                    </div>
                </div>
            </Link>
        </div>
    )
}