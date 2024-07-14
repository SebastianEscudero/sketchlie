import { ChevronsUp, GanttChart, GaugeCircle, LucideLockKeyhole } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export const PlatformYouCanTrust = () => {
    return (
        <div className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] font-roobert">
            <div className="text-center mb-10 mx-5">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-5 text-black ">
                    Plataforma en la que puedes confiar.
                </h2>
                <p className="text-zinc-700 text-lg md:text-xl text-center">   
                    Sketchlie es una plataforma segura y confiable que puede manejar cualquier situación que se presente
                </p>
            </div>
            <div className="bg-[#FFF] p-4 lg:pb-5 pb-5 border border-zinc-500 rounded-lg">
                <div className="py-3">
                    <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 rounded-lg my-4">
                        <div className="md:p-7 py-6 m-2 rounded-md">
                            <h3 className="lg:text-2xl md:text-xl text-lg flex items-center mb-1 font-semibold text-black">   
                                <GaugeCircle className="mr-2 text-pink-500"/>
                                99.99% de tiempo de actividad
                            </h3>
                            <p className="text-zinc-700 text-lg md:text-xl">
                                Garantizamos un alto tiempo de actividad para que puedas colaborar sin interrupciones.
                            </p>
                        </div>
                        <div className="md:p-7 py-6 m-2 rounded-md">
                            <h3 className="lg:text-2xl md:text-xl text-lg flex items-center mb-1 font-semibold text-black">   
                                <ChevronsUp className="mr-2 text-green-500" />
                                Colaboración con todo tu equipo
                            </h3>
                            <p className="text-zinc-700 text-lg md:text-xl">
                                Invita a tu equipo a colaborar en tiempo real. Innova, crea, diseña y ejecuta proyectos juntos.
                            </p>
                        </div>
                        <div className="md:p-7 py-6 m-2 rounded-md">
                            <h3 className="lg:text-2xl md:text-xl text-lg flex items-center mb-1 font-semibold text-black">   
                                <GanttChart className="mr-2 text-orange-500"/>
                                Planificación de Proyectos
                            </h3>
                            <p className="text-zinc-700 text-lg md:text-xl">
                                Planifica tus proyectos sin preocupación el único que tiene acceso a tu espacio de trabajo es tu y tu equipo
                            </p>
                        </div>
                        <div className="md:p-7 py-6 m-2 rounded-md">
                            <h3 className="lg:text-2xl md:text-xl text-lg flex items-center mb-1 font-semibold text-black">   
                                <LucideLockKeyhole className="mr-2 text-custom-blue"/>
                                Seguridad con AWS
                            </h3>
                            <p className="text-zinc-700 text-lg md:text-xl">
                                Utilizamos la seguridad de AWS para proteger tus imágenes y datos con la más alta tecnología.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link href={"/dashboard/"} title="Regístrate gratis">
                            <Button variant="auth" className="text-lg p-6 mt-4">
                                {"Regístrate gratis"}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}