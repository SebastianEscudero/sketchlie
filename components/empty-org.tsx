"use client";

import Image from "next/image"

import {
    Dialog,
} from "@/components/ui/dialog"
import { CreateOrganization } from "./auth/create-organization"
import { useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { templates } from "@/app/dashboard/templates/templates";
import { Skeleton } from "./ui/skeleton";

interface EmptyOrgProps {
    setActiveOrganization: (id: string) => void;
    user: any;
};


export const EmptyOrg = ({
    setActiveOrganization,
    user
}: EmptyOrgProps) => {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <div className="h-full flex flex-col">
            {user.organizations.length === 0 && (
                <Dialog open={isOpen}>
                    <CreateOrganization
                        showCloseButton={false}
                        label="Start by creating an organization!"
                        activeOrganization={null}
                        setActiveOrganization={setActiveOrganization}
                    />
                </Dialog>
            )}
            <div className="p-0">
                <h2 className="text-3xl font-semibold">Choose a Template</h2>
                <div className="flex mt-8 border rounded-md p-4 h-[170px] overflow-hidden">
                    <div className="flex flex-wrap gap-x-5 gap-y-20">
                        {templates.map((template, index) => (
                            <div key={index} className="rounded-lg flex flex-col justify-between flex-1">
                                <button
                                    className="text-left flex flex-col hover:cursor-pointer flex-1 min-w-[110px] min-h-[85.5px] max-w-[130px] max-h-[101.1px]"
                                >
                                    <Image
                                        className="border rounded-md object-contain w-[130px] h-[101px] hover:border-custom-blue"
                                        src={`${template.image}`}
                                        alt={template.name}
                                        width={500}
                                        height={500}
                                    />
                                    <h2 className="font-semibold pt-2 text-[12px] text-gray-700 hover:text-custom-blue">
                                        + {template.name}
                                    </h2>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-lg flex flex-col justify-between ml-2 flex-1">
                        <ChevronsDown className="h-6 w-6 text-custom-blue" />
                    </div>
                </div>
                <h2 className="text-3xl font-semibold mt-12">
                    Team boards
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-5 mt-8 pb-10">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="aspect-[100/127] rounded-lg overflow-hidden">
                            <Skeleton className="h-full w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
