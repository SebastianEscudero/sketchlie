"use client";

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import TypewriterComponent from 'typewriter-effect';

export const LandingHero = () => {
    const { user } = useUser();

    return (
        <div className="relative flex h-screen w-full overflow-hidden" style={{ backgroundImage: "url(/dot-grid.png)", backgroundSize: 'cover' }}>
            <Image src="/hero-bg.png" alt="hero bg" className="absolute left-0 top-16 z-10 hidden h-full w-full object-cover sm:flex" width={4000} height={4000}/>
            <Image src="/hero-bg-mobile.png" alt="hero bg" className="absolute left-0 top-0 z-10 h-full w-full object-cover sm:hidden" width={4000} height={4000} />
            <div className="bg-black-10 absolute left-0 top-0 z-20 h-full w-full"></div>
            <div className="z-40 flex h-full w-full items-center justify-center gap-6 px-6 text-black" id="home">
                <div className="flex flex-col items-center justify-start gap-3">
                    <h1 className="max-w-[800px] text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">
                        Dibuja tus sueños y conviertelos en realidad
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
                    </h1>
                    <p className="max-w-[800px] text-center text-sm text-gray-600 sm:text-lg">Haz una lluvia de ideas, colabora y da vida a tus ideas en nuestro espacio de colaboración en tiempo real. Únete a nosotros y convierte tus ideas en realidad.</p>
                    <div className="flex gap-4">
                        <Link href="/dashboard">
                            <Button variant="outline" className="p-4 md:p-5 md:text-lg">
                                {user ? "Ir al Tablero" : "Regístrate gratis"}
                            </Button>
                        </Link>
                        <a href="#about">
                            <Button variant="landing" className="p-4 md:p-5 md:text-lg">
                                Aprende más
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}