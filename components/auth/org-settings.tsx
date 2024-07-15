"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { Button } from "../ui/button";
import { Ellipsis, LoaderCircle, Settings, User, X, Zap } from "lucide-react";
import { organizationSettings } from "@/actions/organization-settings";
import { deleteOrganization } from "@/actions/delete-organization";
import { DialogClose, DialogTitle } from "../ui/dialog";
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
import { getPlanColor } from "@/lib/orgUtils";
import { OrgImage } from "./org-image";
import { Dialog, DialogContent } from "../ui/dialog";
import axios from "axios";

interface OrganizationSettingsProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: any) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const OrganizationSettings = ({
    activeOrganization,
    setActiveOrganization,
    isOpen,
    setIsOpen,
}: OrganizationSettingsProps) => {
    const user = useCurrentUser();
    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
    const usersRole = activeOrg?.users.find((u: any) => u.id === user?.id)?.role;
    const Initial = activeOrg?.name.charAt(0).toUpperCase();
    const [planStatus, setPlanStatus] = useState("approved");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (activeOrg) {
    //             const { data } = await axios.get("/api/mercadoPago", { params: { subscriptionId: activeOrg.subscription.subscriptionId } });
    //             const status = data
    //             setPlanStatus(status);
    //         }
    //     };
    //     fetchData();
    // }, [activeOrg])

    let color = "#000000"; // default color
    let letterColor = "#FFFFFF"; // default letter color

    if (activeOrg) {
        ({ color, letterColor } = getPlanColor(activeOrg.subscriptionPlan));
    }

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [selectedSection, setSelectedSection] = useState('Members');
    const [isLoading, setLoading] = useState(false);
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

    const onDelete = () => {
        const orgName = activeOrg.name;
        deleteOrganization(activeOrg.id)
            .then(() => {
                {
                    data?.map((board) => (
                        mutate({ id: board._id, userId: user?.id })
                    ))
                }
                // Set active organization to the first organization in the user's organizations list
                if (user && user.organizations && user?.organizations?.length > 0) {
                    const firstOrgId = user?.organizations[0].id;
                    setActiveOrganization(firstOrgId);
                    localStorage.setItem("activeOrganization", firstOrgId);
                } else {
                    setActiveOrganization(null);
                    localStorage.setItem("activeOrganization", '');
                }
                update();
                toast.success(`Organization ${orgName} deleted successfully`);
            })
    }

    const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {
        setLoading(true);
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
            .catch(() => setError("Something went wrong!"))
            .finally(() => setLoading(false));
    }

    const proModal = useProModal();
    const onClick = () => {
        if (activeOrg.subscriptionPlan === "Gratis") {
            proModal.onOpen(activeOrg.id);
        } else {
            window.location.href = "https://www.mercadopago.cl/subscriptions#from-section=menu"
        }
    }

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="min-h-[500px] w-full md:w-auto md:max-w-full max-w-[90%]">
                <div className="flex md:flex-row flex-col max-h-[700px]">
                    <div className="md:w-1/3 w-full space-y-4 md:pr-4 md:pb-0 pb-4 md:border-r dark:border-zinc-500 md:border-b-0 border-b">
                        <div className="flex mb-3 items-center pb-0">
                            <OrgImage
                                width="35px"
                                height="35px"
                                letter={Initial || ""}
                                color={color}
                                letterColor={letterColor}
                            />
                            <div className="ml-3 truncate w-[230px] font-medium">
                                <p className="ml-3 text-sm truncate">{activeOrg.name}</p>
                                <p className="ml-3 text-xs truncate flex flex-row items-center">{activeOrg.subscriptionPlan} - <User className="h-[11px] w-[11px] mx-1" />{activeOrg.users.length}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Button
                                onClick={() => setSelectedSection('Members')}
                                variant="ghost"
                                className={`${selectedSection === 'Members' ? 'text-black border-2 border-blue-500 bg-slate-100 dark:bg-[#383838] text-accent-foreground' : 'text-zinc-400 bg-white'}flex items-center justify-start`}
                            >
                                <User className="w-4 h-4 mr-2" />Members
                            </Button>
                            <Button
                                onClick={() => setSelectedSection('Settings')}
                                variant="ghost"
                                className={`${selectedSection === 'Settings' ? 'text-black border-2 border-blue-500 bg-slate-100 dark:bg-[#383838] text-accent-foreground' : 'text-zinc-400 bg-white'}flex items-center justify-start`}
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
                    <div className="flex flex-col flex-1 md:pl-4">
                        <DialogTitle className="text-3xl font-semibold mb-4 md:pt-0 pt-4">
                            {selectedSection}
                        </DialogTitle>
                        {selectedSection === 'Members' ? (
                            <ul className="pt-4 overflow-y-auto max-h-[330px] md:max-h-[380px]">
                                {activeOrg.users
                                    .sort((a: any, b: any) => (a.id === user?.id ? -1 : b.id === user?.id ? 1 : 0))
                                    .map((orgUser: any) => (
                                        <li key={orgUser.id} className="flex pb-3">
                                            <Avatar>
                                                <AvatarImage src={orgUser.image || ""} />
                                                <AvatarFallback className="bg-blue-600">
                                                    <User className="text-white" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="ml-2">
                                                <p className="truncate xs:w-auto w-[140px] text-sm">
                                                    {orgUser.name}
                                                    {orgUser.id === user?.id && (
                                                        <span className="bg-[#D8E0FC] px-[4px] py-[2px] rounded-sm text-[12px] text-blue-600 ml-1">You</span>
                                                    )}
                                                </p>
                                                <p className="truncate text-[12px] xs:w-auto w-[140px] text-zinc-400">{orgUser.email}</p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className={`ml-auto mr-2 text-zinc-600 dark:text-zinc-200 text-sm border border-zinc-600 dark:border-zinc-200 rounded-md p-2 ${usersRole !== 'Admin' ? 'pointer-events-none' : ''}`}>
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
                                                    <Ellipsis className="text-zinc-500 dark:text-zinc-100 w-4 h-4" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl shadow-xl border p-0">
                                                    <DropdownMenuItem className="py-2 px-3 hover:cursor-pointer">
                                                        <p className="text-red-500" onClick={() => leaveOrganization(activeOrg.id, orgUser.id)
                                                            .then((result) => {
                                                                if (result.isOrgDeleted) {
                                                                    setActiveOrganization("null");
                                                                    localStorage.setItem("activeOrganization", "null");
                                                                } else {
                                                                    toast.info("Removed succesfully");
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
                                                                    maxLength={60}
                                                                    className="py-1 text-base"
                                                                />
                                                            </FormControl>
                                                            <Button
                                                                type="submit"
                                                                variant="sketchlieBlue"
                                                                className="w-32"
                                                                disabled={!form.formState.isValid || isLoading}
                                                            >
                                                                {isLoading ? <LoaderCircle className="animate-spin w-5 h-5 text-white" /> : "Save changes"}
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
                                    <p className="mt-4 pb-1 border-b dark:border-zinc-500">
                                        Danger
                                    </p>
                                    <div className="flex md:flex-row flex-col justify-center">
                                        {usersRole === 'Admin' && (
                                            <Button variant="destructive" className="mt-4 w-full md:mr-2" onClick={() => setSelectedSection("Delete organization")}>
                                                <X className="h-4 w-4 mr-2" /> Delete Organization
                                            </Button>
                                        )}
                                        <Button
                                            className="mt-4 bg-white border border-red-500 text-red-500 shadow-sm hover:bg-red-500/90 hover:text-white w-full md:ml-2"
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
                                        <p className="mt-4 pb-1 border-b dark:border-zinc-500">
                                            Subscription
                                        </p>
                                        <div className="flex md:flex-row flex-col justify-center">
                                            <Button
                                                onClick={onClick}
                                                variant={activeOrg.subscriptionPlan !== "Gratis" && planStatus === "approved" ? "sketchlieBlue" : "premium"}
                                                className="mt-4 w-full"
                                            >
                                                {activeOrg.subscriptionPlan !== "Gratis" && planStatus === "approved" ? "Pausar Subscripcion" : "Upgrade"}
                                                {activeOrg.subscriptionPlan === "Gratis" && <Zap className="w-4 h-4 ml-2 fill-white" />}
                                            </Button>
                                        </div>
                                        {activeOrg.subscriptionPlan !== "Gratis" && (
                                            <p className="text-neutral-500 text-sm mt-2">
                                                You are currently on the {activeOrg.subscriptionPlan} plan, if you need any help please
                                                contact us at <a href="mailto:contact@sketchlie.com" className="text-blue-600 hover:underline">contact@sketchlie.com</a>
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p>Are you sure you want to delete this organization?</p>

                                <p>This action is permanent and irreversible.</p>
                                <div className="space-x-2 pt-2">
                                    <Button variant="sketchlieBlue" onClick={() => setSelectedSection("Settings")}>
                                        Cancel
                                    </Button>
                                    <DialogClose>
                                        <div className="bg-red-500 text-white rounded-md py-2 px-4 cursor-pointer"
                                            onClick={onDelete}
                                        >
                                            Delete Organization
                                        </div>
                                    </DialogClose>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};