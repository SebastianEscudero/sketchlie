import Image from "next/image"
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog"
import { CreateOrganization } from "./auth/create-organization"

interface EmptyOrgProps {
    setActiveOrganization: (id: string) => void;
};


export const EmptyOrg = ({
    setActiveOrganization,
}: EmptyOrgProps) => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src="/elements.svg"
                width={200}
                height={200}
                alt="Empty Organization"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Welcome to Sketchlie
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create an organization to get started
            </p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            Create organization
                        </Button>
                    </DialogTrigger>
                    <CreateOrganization 
                        activeOrganization={null}
                        setActiveOrganization={setActiveOrganization}
                    />
                </Dialog>
            </div>
        </div>
    )
}