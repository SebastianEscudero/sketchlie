'use client'

import { LandingNavbar } from '@/components/landing-navbar'
import { BotNavbar } from '@/components/bottom-navbar'
import { mainFont } from '@/lib/font'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound({
}) {
    return (
        <main className={cn("bg-white", mainFont.className)} lang="es">
            <div className="mx-auto h-full">
                <LandingNavbar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <Image src="/placeholders/error.svg" alt="Error" width={100} height={100} className='w-1/2 h-1/2' />
                    <h1 className="text-4xl font-bold mt-4">Página no encontrada</h1>
                    <p className="text-lg mt-4">La página que buscas no existe</p>
                    <div className="flex gap-4 mt-6">
                        <Button variant="sketchlieBlue" asChild className='text-xl font-semibold p-6'>
                            <Link href="/">Ir a inicio</Link>
                        </Button>
                    </div>
                </div>
                <BotNavbar />

            </div>
        </main>
    )
}