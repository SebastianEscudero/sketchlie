import { ChevronsUp, GanttChart, GaugeCircle, LucideLockKeyhole } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import platformYouCanTrustTranslations from "@/public/locales/platform-you-can-trust"
import { Language } from "@/types/canvas"

export const PlatformYouCanTrust = ({ lang }: { lang: Language }) => {
    const t = platformYouCanTrustTranslations[lang as Language];

    const icons = [GaugeCircle, ChevronsUp, GanttChart, LucideLockKeyhole];
    const colors = ["text-blue-500", "text-yellow-500", "text-blue-500", "text-yellow-500"];

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white py-16">
            <div className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%]">
                <div className="text-center mb-12 mx-5">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-5 text-blue-900 font-bold">
                        {t.title}
                    </h2>
                    <p className="text-blue-700 text-lg md:text-xl text-center max-w-3xl mx-auto">   
                        {t.description}
                    </p>
                </div>
                <div className="bg-white p-8 border-2 border-blue-200 rounded-2xl shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {t.features.map((feature, index) => {
                            const Icon = icons[index];
                            return (
                                <div key={index} className="bg-blue-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105">
                                    <h3 className="text-2xl flex items-center mb-3 font-bold text-blue-900">   
                                        <Icon className={`mr-3 ${colors[index]}`} size={28}/>
                                        {feature.title}
                                    </h3>
                                    <p className="text-blue-700 text-lg">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-center mt-12">
                        <Link href={"/dashboard/"} title={t.cta}>
                            <Button variant="auth" className="text-lg px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold rounded-full transition-all duration-300 transform hover:scale-105">
                                {t.cta}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}