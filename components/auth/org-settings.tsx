"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getPlanColor } from "@/lib/orgUtils";
import { OrgImage } from "./org-image";
import { useOrganization } from "@/app/contexts/organization-context";
import { toast } from "sonner";
import { deleteOrganization } from "@/actions/delete-organization";
import { leaveOrganization } from "@/actions/leave-organizations";
import { ConfirmModal } from "../confirm-modal";
import { useSession } from "next-auth/react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { z } from "zod";
import { organizationSettings } from "@/actions/organization-settings";
import { useQuery } from "convex/react";

interface OrganizationSettingsProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const OrganizationSettings = ({
    isOpen,
    setIsOpen,
}: OrganizationSettingsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const user = useCurrentUser();
    const { update } = useSession();
    const { currentOrganization, setCurrentOrganizationId, userRole } = useOrganization();
    const { color, letterColor } = getPlanColor(currentOrganization?.subscriptionPlan);
    const Initial = currentOrganization?.name?.charAt(0).toUpperCase() || "?";
    const { mutate } = useApiMutation(api.board.remove);

    const data = useQuery(api.boards.get, {
        orgId: currentOrganization?.id!,
        userId: user?.id,
    });

    const form = useForm<z.infer<typeof OrganizationSchema>>({
        resolver: zodResolver(OrganizationSchema),
        defaultValues: {
            name: currentOrganization?.name || "",
        }
    });

    if (!user || !currentOrganization) return null;

    const onSubmit = async (values: z.infer<typeof OrganizationSchema>) => {
        try {
            setIsLoading(true);
            await organizationSettings(values, currentOrganization.id);
            toast.success("Organization updated successfully");
            update();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            const orgName = currentOrganization.name;

            await Promise.all(data?.map(board =>
                mutate({ id: board._id, userId: user.id })
            ) || []);
            
            await deleteOrganization(currentOrganization.id);
            
            if (user.organizations && user.organizations.length > 0) {
                const firstOrgId = user.organizations[0].id;
                setCurrentOrganizationId(firstOrgId);
            } else {
                setCurrentOrganizationId(null);
            }
            
            setIsOpen(false);
            update();
            toast.success(`Organization ${orgName} deleted successfully`);
        } catch (error) {
            toast.error("Failed to delete organization");
        } finally {
            setIsLoading(false);
        }
    };

    const onLeave = async () => {
        try {
            setIsLoading(true);
            
            if (currentOrganization.users.length <= 1) {
                await onDelete();
                return;
            }

            const result = await leaveOrganization(currentOrganization.id, user.id);
            
            if (result.error) {
                toast.error(result.error);
                return;
            }

            if (user.organizations && user.organizations.length > 0) {
                const firstOrgId = user.organizations[0].id;
                setCurrentOrganizationId(firstOrgId);
            } else {
                setCurrentOrganizationId(null);
            }
            
            setIsOpen(false);
            update();
            toast.success("Left organization successfully");
        } catch (error) {
            toast.error("Failed to leave organization");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center space-x-3">
                        <OrgImage
                            width="42px"
                            height="42px"
                            letter={Initial}
                            color={color}
                            letterColor={letterColor}
                        />
                        <div>
                            <DialogTitle>{currentOrganization.name}</DialogTitle>
                            <DialogDescription>
                                Organization settings
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Organization Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button 
                                variant="sketchlieBlue"
                                type="submit" 
                                disabled={!form.formState.isDirty || isLoading}
                                className="w-full"
                            >
                                Save Changes
                            </Button>
                        </form>
                    </Form>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-red-500">Danger Zone</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Irreversible and destructive actions
                            </p>
                            <div className="space-y-2">
                                {userRole === 'Admin' && (
                                    <ConfirmModal
                                        header="Delete organization"
                                        description="This action cannot be undone. This will permanently delete your organization and remove your data from our servers."
                                        onConfirm={onDelete}
                                    >
                                        <Button 
                                            variant="destructive" 
                                            className="w-full"
                                            disabled={isLoading}
                                        >
                                            Delete Organization
                                        </Button>
                                    </ConfirmModal>
                                )}
                                <ConfirmModal
                                    header="Leave organization"
                                    description="Are you sure you want to leave this organization?"
                                    onConfirm={onLeave}
                                >
                                    <Button 
                                        variant="outline"
                                        className="w-full border-red-500 text-red-500 hover:bg-red-50"
                                        disabled={isLoading}
                                    >
                                        Leave Organization
                                    </Button>
                                </ConfirmModal>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};