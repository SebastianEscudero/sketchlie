"use client";

import TypewriterComponent from "typewriter-effect";
import { useState, useEffect } from 'react';
import Image from "next/image";

export const Loading = () => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className='h-full w-full flex flex-col justify-center items-center dark:bg-[#383838]'>
            <Image 
                src="/logos/logo.svg" 
                alt="logo" 
                width={180} 
                height={180} 
                className="animate-pulse dark:hidden" 
            />
            <Image 
                src="/logos/logo-dark-mode.svg" 
                alt="logo" 
                width={180} 
                height={180} 
                className="animate-pulse hidden dark:block" 
            />
            <div className="text-center text-lg font-semibold max-w-[80%] w-full h-[80px]">
                {mounted && (
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Tip: Usa atajos de teclado para mayor eficiencia.",
                                "Tip: Con click derecho puedes moverte en tu tablero.",
                                "Tip: Invita a tu equipo con el boton de compartir.",
                                "Tip: Utiliza plantillas para acelerar tu trabajo.",
                                "Tip: Utiliza los atajos de teclado para mayor eficiencia.",
                            ],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 10,
                            delay: 30,
                        }}
                    />
                )}
            </div>
        </div>
    );
};