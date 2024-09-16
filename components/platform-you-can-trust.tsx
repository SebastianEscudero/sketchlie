import { ChevronsUp, GanttChart, GaugeCircle, LucideLockKeyhole } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export const PlatformYouCanTrust = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 to-white py-16">
            <div className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%]">
                <div className="text-center mb-12 mx-5">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-5 text-blue-900 font-bold">
                        Plataforma en la que puedes confiar.
                    </h2>
                    <p className="text-blue-700 text-lg md:text-xl text-center max-w-3xl mx-auto">   
                        Sketchlie es una plataforma segura y confiable que puede manejar cualquier situación que se presente
                    </p>
                </div>
                <div className="bg-white p-8 border-2 border-blue-200 rounded-2xl shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { icon: GaugeCircle, color: "text-blue-500", title: "99.99% de tiempo de actividad", description: "Garantizamos un alto tiempo de actividad para que puedas colaborar sin interrupciones." },
                            { icon: ChevronsUp, color: "text-yellow-500", title: "Colaboración con todo tu equipo", description: "Invita a tu equipo a colaborar en tiempo real. Innova, crea, diseña y ejecuta proyectos juntos." },
                            { icon: GanttChart, color: "text-blue-500", title: "Planificación de Proyectos", description: "Planifica tus proyectos sin preocupación. El único que tiene acceso a tu espacio de trabajo eres tú y tu equipo." },
                            { icon: LucideLockKeyhole, color: "text-yellow-500", title: "Enfocado en la seguridad", description: "Priorizamos la seguridad de tus datos y tu privacidad. Nuestro equipo de expertos en seguridad trabaja constantemente para proteger tus datos." },
                        ].map((item, index) => (
                            <div key={index} className="bg-blue-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105">
                                <h3 className="text-2xl flex items-center mb-3 font-bold text-blue-900">   
                                    <item.icon className={`mr-3 ${item.color}`} size={28}/>
                                    {item.title}
                                </h3>
                                <p className="text-blue-700 text-lg">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href={"/dashboard/"} title="Regístrate gratis">
                            <Button variant="auth" className="text-lg px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold rounded-full transition-all duration-300 transform hover:scale-105">
                                Regístrate gratis
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}