"use client";

import { LayoutDashboard, LayoutTemplate, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { SketchlieButton } from "./sketchlie-button";

export const EmptyOrgSidebar = () => {
    return (
        <div className="hidden lg:flex flex-col dark:bg-[#2C2C2C] text-black dark:text-white bg-zinc-100 space-y-2 justify-between w-[240px] px-5 pt-5 select-none">
            <div className="flex flex-col space-y-4">
                <SketchlieButton activeOrg={null} />
                <div className="w-full relative">
                    <Search
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
                    />
                    <Input
                        className="w-full max-w-[516px] pl-9 dark:bg-[#383838] text-zinc-400"
                        placeholder="Search boards"
                    />
                </div>
                <div className="space-y-1 w-full">
                    <Button
                        variant="dashboardActive"
                        size="sm"
                        className="justify-start px-4 w-full font-semibold"
                    >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Team boards
                    </Button>
                    <Button
                        variant="dashboard"
                        size="sm"
                        className="justify-start px-4 w-full font-semibold"
                    >
                        <Star className="h-4 w-4 mr-2" />
                        Favorite boards
                    </Button>
                    <Button
                        variant="dashboard"
                        className="justify-start px-4 w-full font-semibold"
                        size="sm"
                    >
                        <LayoutTemplate className="h-4 w-4 mr-2" />
                        Templates
                    </Button>
                </div>
                <div className="border border-zinc-600 h-[58px] dark:bg-[#383838] bg-zinc-200 rounded-lg flex items-center w-full outline-none">
                    <Skeleton className="h-full w-full" />
                </div>
            </div>
        </div>
    );
};