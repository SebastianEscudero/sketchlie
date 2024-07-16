import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { rejectInvite } from "@/actions/reject-invite";
import { OrgImage } from "./org-image";
import { getPlanColor } from "@/lib/orgUtils";
import { acceptInvite } from "@/actions/accept-invite";
import { useSession } from "next-auth/react";

interface InviteMenuProps {
    invitations: any;
    setActiveOrganization: any;

}

export const InviteMenu = ({
    invitations,
    setActiveOrganization
}: InviteMenuProps) => {
    const { update } = useSession();

    return (
        <div className="py-2">
            {invitations.map((invitation: any) => {
                const { color, letterColor } = getPlanColor(invitation.organization.subscriptionPlan);

                return (
                    <div
                        key={invitation.id}
                        className="py-1.5 px-5 flex items-center"
                    >
                        <OrgImage
                            height="35px"
                            width="35px"
                            letter={invitation.organization.name.charAt(0).toUpperCase()}
                            color={color}
                            letterColor={letterColor}
                        />
                        <p className="ml-5 text-sm truncate">
                            {invitation.organization.name}
                        </p>
                        <DropdownMenuItem className="ml-auto p-0 mr-2">
                            <Button
                                onClick={() => {
                                    rejectInvite(invitation.id)
                                        .then(() => {
                                            update({ event: "session" });
                                        });
                                }}
                                variant="destructive"
                            >
                                Reject
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="border p-0 rounded-md dark:border-zinc-200">
                            <Button
                                onClick={() => {
                                    acceptInvite(invitation.organization.id, invitation.id)
                                        .then(() => {
                                            setActiveOrganization(invitation.organization.id);
                                            localStorage.setItem("activeOrganization", invitation.organization.id);
                                            update({ event: "session" });
                                        });
                                }}
                                className="bg-green-600 text-white hover:bg-green-700"
                            >
                                Join
                            </Button>
                        </DropdownMenuItem>
                    </div>
                );
            })}
        </div>
    )
}