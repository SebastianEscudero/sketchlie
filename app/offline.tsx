'use client'

import { LandingNavbar } from '@/components/landing-navbar'
import { BotNavbar } from '@/components/bottom-navbar'
import { mainFont } from '@/lib/font'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Offline() {
    return (
        <main className={cn("bg-white", mainFont.className)} lang="es">
            <div className="mx-auto h-full">
                <LandingNavbar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <Image 
                        src="/placeholders/offline.svg" 
                        alt="No internet connection" 
                        width={100} 
                        height={100} 
                        className='w-1/2 h-1/2' 
                    />
                    <h1 className="text-4xl font-bold mt-4">No internet connection</h1>
                    <p className="text-lg mt-4">Check your connection and try again</p>
                    <div className="flex gap-4 mt-6">
                        <Button 
                            variant="outline" 
                            onClick={() => window.location.reload()}
                        >
                            Refresh page
                        </Button>
                        <Button variant="sketchlieBlue" asChild>
                            <Link href="/">Go to home</Link>
                        </Button>
                    </div>
                </div>
                <BotNavbar />
            </div>
        </main>
    )
}