"use client";

import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";

export const LandingHero = () => {
    const { user } = useUser();

    return (
        <div className="text-[#1c1c1e] pt-24 space-y-5 lg:mx-[25%] md:mx-[15%] mx-[5%]">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 text-center">
                <h1 style={{ lineHeight: "1.2" }}>
                    Dibuja tus sueños y hazlos realidad.
                </h1>
                <div className="text-center bg-clip-text text-[#2E4DE6] leading-small">
                    <TypewriterComponent 
                        options = {{
                            strings: [
                                "Colabora.",
                                "Diseña.",
                                "Crea.",
                                "Enseña.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl text-zinc-800 mx-auto text-center">
                <p>
                    Haz una lluvia de ideas, colabora y da vida a tus ideas en nuestro espacio de trabajo interactivo. Únete a nosotros y convierte tus ideas en realidad.
                </p>
            </div>
            <div className="text-center ">
                <Link href={"/dashboard"}>
                    <Button variant="outline" className="md:text-lg p-4 md:p-6">
                        {user ? "Ir al Tablero" : "Regístrate gratis"}
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm text-center">
                No se requiere tarjeta de crédito
            </div>
        </div>
    )
}