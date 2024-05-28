"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { OrganizationSchema } from "@/schemas";

import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { Button } from "../ui/button";
import { Ellipsis, Settings, User, X, Zap } from "lucide-react";
import { organizationSettings } from "@/actions/organization-settings";
import { deleteOrganization } from "@/actions/delete-organization";
import { DialogClose } from "../ui/dialog";
import { leaveOrganization } from "@/actions/leave-organizations";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InviteButton } from "@/app/dashboard/_components/org-invite-button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useQuery } from "convex/react";
import { useProModal } from "@/hooks/use-pro-modal";
import { editUserRole } from "@/actions/edit-role";
import { toast } from "sonner";

interface OrganizationSettingsProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
    plan: string;
}

export const OrganizationSettings = ({
    activeOrganization,
    setActiveOrganization,
    plan,
}: OrganizationSettingsProps) => {
    const user = useCurrentUser();
    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
    const usersRole = activeOrg?.users.find((u: any) => u.id === user?.id)?.role;
    const Initial = activeOrg?.name.charAt(0).toUpperCase();

    let Color, LetterColor;
    switch (plan) {
        case 'Gratis':
            Color = '6C47FF';
            LetterColor = 'FFFFFF';
            break;
        case 'Starter':
            Color = 'F59E0B';
            LetterColor = '000000';
            break;
        case 'Business':
            Color = '000000';
            LetterColor = 'FFFFFF';
            break;
        default:
            Color = '6C47FF';
            LetterColor = '000000';
    }

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [selectedSection, setSelectedSection] = useState('Members');
    const { update } = useSession();

    const { mutate } = useApiMutation(api.board.remove);

    const form = useForm<z.infer<typeof OrganizationSchema>>({
        resolver: zodResolver(OrganizationSchema),
        defaultValues: {
            name: activeOrg?.name || undefined,
        }
    });

    const data = useQuery(api.boards.get, {
        orgId: activeOrg.id,
        userId: user?.id,
    });

    const onDelete = () => deleteOrganization(activeOrg.id)
        .then(() => {
            {
                data?.map((board) => (
                    mutate({ id: board._id, userId: user?.id })
                ))
            }
            setActiveOrganization("null");
            localStorage.setItem("activeOrganization", "null");
            update();
        })

    const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {
        organizationSettings(values, activeOrg)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                }

                if (data.success) {
                    update();
                    setSuccess(data.success);
                }
            })
            .catch(() => setError("Something went wrong!"));
    }

    const proModal = useProModal();
    const onClick = () => {
        if (activeOrg.subscriptionPlan === "Gratis") {
            proModal.onOpen();
        } else {
            window.location.href = "https://www.mercadopago.cl/subscriptions#from-section=menu"
        }
    }

    if (!user) return null;

    return (
        <div className="flex sm:flex-row flex-col max-h-[600px]">
            <div className="sm:w-1/3 w-full space-y-4 sm:pr-4 sm:pb-0 pb-4 sm:border-r sm:border-b-0 border-b">
                <div className="flex mb-3 items-center pb-0">
                    <Image
                        sizes="48px"
                        alt={activeOrg.name}
                        src={`https://img.clerk.com/preview.png?size=144&seed=seed&initials=${Initial}&isSquare=true&bgType=marble&bgColor=${Color}&fgType=initials&fgColor=${LetterColor}&type=organization&w=48&q=75`}
                        className="rounded-md"
                        width={35}
                        height={35}
                    />
                    <div className="ml-3 text-sm">
                        <p className="truncate sm:max-w-[100px] max-w-[200px]">{activeOrg.name}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Button
                        onClick={() => setSelectedSection('Members')}
                        variant="ghost"
                        className={`${selectedSection === 'Members' ? 'text-black border-2 border-blue-500 bg-accent text-accent-foreground' : 'text-zinc-400 bg-white'}flex items-center justify-start`}
                    >
                        <User className="w-4 h-4 mr-2" />Members
                    </Button>
                    <Button
                        onClick={() => setSelectedSection('Settings')}
                        variant="ghost"
                        className={`${selectedSection === 'Settings' ? 'text-black border-2 border-blue-500 bg-accent text-accent-foreground' : 'text-zinc-400 bg-white'}flex items-center justify-start`}
                    >
                        <Settings className="w-4 h-4 mr-2" />Settings
                    </Button>
                    {usersRole !== 'Guest' && (
                        <InviteButton
                            activeOrganization={activeOrganization}
                        />
                    )}
                </div>
            </div>
            <div className="sm:w-2/3 w-full sm:pl-4">
                <h3 className="text-3xl font-semibold mb-4 sm:pt-0 pt-4">
                    {selectedSection}
                </h3>
                {selectedSection === 'Members' ? (
                    <ul className="pt-4 overflow-y-auto max-h-[330px] sm:max-h-[380px]">
                        {activeOrg.users
                            .sort((a: any, b: any) => (a.id === user?.id ? -1 : b.id === user?.id ? 1 : 0))
                            .map((orgUser: any) => (
                                <li key={orgUser.id} className="flex pb-3">
                                    <Avatar>
                                        <AvatarImage src={orgUser.image || ""} />
                                        <AvatarFallback className="bg-custom-blue">
                                            <User className="text-white" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="ml-2">
                                        <p className="truncate xs:w-auto w-[160px] text-sm">
                                            {orgUser.name}
                                            {orgUser.id === user?.id && (
                                                <span className="bg-[#D8E0FC] px-[4px] py-[2px] rounded-sm text-[12px] text-custom-blue ml-1">You</span>
                                            )}
                                        </p>
                                        <p className="truncate text-[12px] xs:w-auto w-[160px] text-zinc-400">{orgUser.email}</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className={`ml-auto mr-2 text-zinc-600 text-sm border rounded-md p-2 ${usersRole !== 'Admin' ? 'pointer-events-none' : ''}`}>
                                            {orgUser.role}
                                        </DropdownMenuTrigger>
                                        {usersRole === 'Admin' && orgUser.id !== user?.id && (
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={async () => {
                                                    const result = await editUserRole(activeOrg.id, orgUser.id, 'Admin');
                                                    if (result.success) {
                                                        toast.success(result.success);
                                                    } else {
                                                        toast.error(result.error);
                                                    }
                                                    update();
                                                }}>
                                                    Admin
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={async () => {
                                                    const result = await editUserRole(activeOrg.id, orgUser.id, 'Member');
                                                    if (result.success) {
                                                        toast.success(result.success);
                                                    } else {
                                                        toast.error(result.error);
                                                    }
                                                    update();
                                                }}>
                                                    Member
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={async () => {
                                                    const result = await editUserRole(activeOrg.id, orgUser.id, 'Guest');
                                                    if (result.success) {
                                                        toast.success(result.success);
                                                    } else {
                                                        toast.error(result.error);
                                                    }
                                                    update();
                                                }}>
                                                    Guest
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        )}
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="pr-4">
                                            <Ellipsis className="text-zinc-500 w-4 h-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-xl shadow-xl">
                                            <DropdownMenuItem className="py-2 px-3">
                                                <p className="text-destructive" onClick={() => leaveOrganization(activeOrg.id, orgUser.id)
                                                    .then((result) => {
                                                        if (result.isOrgDeleted) {
                                                            setActiveOrganization("null");
                                                            localStorage.setItem("activeOrganization", "null");
                                                        }
                                                        update();
                                                    })
                                                }>
                                                    {orgUser.id === user?.id ? "Leave Organization" : "Remove member"}
                                                </p>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                            ))}
                    </ul>
                ) : selectedSection === "Settings" ? (
                    <div>
                        {usersRole === 'Admin' && (
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Organization Name</FormLabel>
                                                <div className="flex flex-row space-x-4">
                                                    <FormControl className="max-w-[300px]">
                                                        <Input
                                                            {...field}
                                                            placeholder="Sebastian's Team"
                                                        />
                                                    </FormControl>
                                                    <Button
                                                        type="submit"
                                                        variant="auth"
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="mt-4">
                                        <FormError message={error} />
                                        <FormSuccess message={success} />
                                    </div>
                                </form>
                            </Form>
                        )}
                        <div className="mt-4">
                            <p className="mt-4 pb-1 border-b">
                                Danger
                            </p>
                            <div className="flex md:flex-row flex-col justify-center">
                                {usersRole === 'Admin' && (
                                    <Button variant="destructive" className="mt-4 w-full md:mr-2" onClick={() => setSelectedSection("Delete organization")}>
                                        <X className="h-4 w-4 mr-2" /> Delete Organization
                                    </Button>
                                )}
                                <Button
                                    className="mt-4 bg-white border border-destructive text-destructive shadow-sm hover:bg-destructive/90 hover:text-white w-full md:ml-2"
                                    onClick={() => leaveOrganization(activeOrg.id, user.id)
                                        .then((result) => {
                                            setActiveOrganization("null");
                                            update();
                                            if (result.isOrgDeleted) {
                                                localStorage.setItem("activeOrganization", "null");
                                            }
                                        })
                                    }
                                >
                                    <X className="h-4 w-4 mr-2" /> Leave Organization
                                </Button>
                            </div>
                        </div>
                        {usersRole === 'Admin' && (
                            <div className="mt-4">
                                <p className="mt-4 pb-1 border-b">
                                    Subscription
                                </p>
                                <div className="flex md:flex-row flex-col justify-center">
                                    <Button
                                        onClick={onClick}
                                        variant={activeOrg.subscriptionPlan !== "Gratis" ? "auth" : "premium"} className="mt-4 w-full"
                                    >
                                        {activeOrg.subscriptionPlan !== "Gratis" ? "Pausar Subscripcion" : "Upgrade"}
                                        {activeOrg.subscriptionPlan === "Gratis" && <Zap className="w-4 h-4 ml-2 fill-white" />}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p>Are you sure you want to delete this organization?</p>

                        <p>This action is permanent and irreversible.</p>
                        <div className="space-x-2 pt-2">
                            <Button variant="auth" onClick={() => setSelectedSection("Settings")}>
                                Cancel
                            </Button>
                            <DialogClose>
                                <Button variant="destructive"
                                    onClick={onDelete}
                                >
                                    Delete Organization
                                </Button>
                            </DialogClose>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};