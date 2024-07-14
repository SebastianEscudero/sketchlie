"use client";

import Link from "next/link";
import { ChevronsLeft, LayoutDashboard, LayoutTemplate, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";


const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const EmptyOrgSidebar = () => {
    return (
        <div className="hidden lg:flex flex-col dark:bg-[#020817] space-y-2 shadow-custom-2 justify-between w-[240px] px-5 pt-5 select-none">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-row items-center">
                    <Link href="/">
                        <div className="flex items-center gap-x-2">
                            <ChevronsLeft className="h-5 w-5 flex-shrink-0" />
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                height={45}
                                width={45}
                            />
                            <span className={cn(
                                "font-semibold text-lg",
                                font.className,
                            )}>
                                Sketchlie
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="border border-zinc-600 h-[58px] dark:bg-[#0a101f] bg-zinc-200 rounded-lg flex items-center w-full outline-none">
                    <Skeleton className="h-full w-full" />
                </div>
                <div className="w-full relative">
                    <Search
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
                    />
                    <Input
                        className="w-full max-w-[516px] pl-9 dark:bg-[#0a101f] text-zinc-400"
                        placeholder="Search boards"
                    />
                </div>
                <div className="space-y-1 w-full">
                    <Button
                        variant="dashboardActive"
                        size="lg"
                        className="justify-start px-2 w-full"
                    >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Team boards
                    </Button>
                    <Button
                        variant="dashboard"
                        size="lg"
                        className="justify-start px-2 w-full"
                    >
                        <Star className="h-4 w-4 mr-2" />
                        Favorite boards
                    </Button>
                    <div className="rounded-lg flex flex-col justify-between flex-1">
                        <Button
                            variant="dashboard"
                            className="justify-start px-2 w-full"
                            size="lg"
                        >
                            <LayoutTemplate className="h-4 w-4 mr-2" />
                            Templates
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};