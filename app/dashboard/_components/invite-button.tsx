import { Plus } from "lucide-react";

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
                    <Button variant="auth">
                        <Plus className="h-4 w-4 mr-2"/>
                        Invite Members
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[80%]">
                    <OrganizationInvite
                        activeOrganization={activeOrganization}
                    />
                </DialogContent>
            </Dialog>
        )
    )
}