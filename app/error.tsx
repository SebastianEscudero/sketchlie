'use client'

import { useEffect } from 'react'
import { LandingNavbar } from '@/components/landing-navbar'
import { BotNavbar } from '@/components/bottom-navbar'
import { mainFont } from '@/lib/font'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <main className={cn("bg-white", mainFont.className)} lang="es">
            <div className="mx-auto h-full">
                <LandingNavbar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <Image src="/placeholders/error.svg" alt="Error" width={100} height={100} className='w-1/2 h-1/2' />
                    <h1 className="text-4xl font-bold mt-4">Oops! Algo salió mal</h1>
                    <p className="text-lg mt-4">Por favor, intenta nuevamente más tarde</p>
                    <div className="flex gap-4 mt-6">
                        <Button variant="outline" onClick={reset}>
                            Volver a intentarlo
                        </Button>
                        <Button variant="sketchlieBlue" asChild>
                            <Link href="/">Ir a inicio</Link>
                        </Button>
                    </div>
                </div>
                <BotNavbar />

            </div>
        </main>
    )
}