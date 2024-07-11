import { UserPlus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { OrganizationInvite } from "@/components/auth/organization-invite";

interface InviteButtonProps {
    activeOrganization: string | null;
}

export const InviteButton = ({
    activeOrganization,
}: InviteButtonProps) => {
    return (
        activeOrganization !== null && activeOrganization !== "null" && (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="sketchlieBlue">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite Members
                    </Button>
                </DialogTrigger>
                <DialogContent className="min-h-[500px] max-h-[90%] w-full max-w-[90%] lg:max-w-[50%] xl:max-w-[40%] overflow-y-auto">
                    <OrganizationInvite
                        activeOrganization={activeOrganization}
                    />
                </DialogContent>
            </Dialog>
        )
    )
}