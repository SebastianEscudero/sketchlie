import { useState } from "react";
import { Form, FormField, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, LogOut, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationSchema } from "@/schemas";
import { organizationSettings } from "@/actions/organization-settings";
import { leaveOrganization } from "@/actions/leave-organizations";
import { useSession } from "next-auth/react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { toast } from "sonner";
import { z } from "zod";
import { deleteOrganization } from "@/actions/delete-organization";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ConfirmModal } from "../confirm-modal";
import { useOrganization } from "@/app/contexts/organization-context";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface SettingsTabProps {
    onClose: () => void;
}

export const SettingsTab = ({ onClose }: SettingsTabProps) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isLoading, setLoading] = useState(false);
    const { update } = useSession();
    const { mutate } = useApiMutation(api.board.remove);
    const user = useCurrentUser();
    const { currentOrganization, setCurrentOrganizationId, userRole } = useOrganization();

    const data = useQuery(api.boards.get, {
        orgId: currentOrganization?.id!,
        userId: user?.id,
    });

    const form = useForm<z.infer<typeof OrganizationSchema>>({
        resolver: zodResolver(OrganizationSchema),
        defaultValues: {
            name: currentOrganization?.name || undefined,
        }
    });

    if (!currentOrganization || !user) return null;

    const onLeave = async () => {
        try {
            setLoading(true);

            // If user is the only member, use onDelete instead
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

            update();
            onClose();
            toast.success("Left organization successfully");
        } catch (error) {
            toast.error("Failed to leave organization");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
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

            update();
            onClose();
            toast.success(`Organization ${orgName} deleted successfully`);
        } catch (error) {
            toast.error("Failed to delete organization");
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof OrganizationSchema>) => {
        try {
            setLoading(true);
            setError(undefined);
            setSuccess(undefined);

            const data = await organizationSettings(values, currentOrganization);

            if (data.error) {
                setError(data.error);
            }

            if (data.success) {
                update();
                setSuccess(data.success);
                toast.success("Organization renamed successfully");
            }
        } catch (error) {
            setError("Something went wrong!");
            toast.error("Failed to update organization");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {userRole === 'Admin' && (
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <h3 className="text-sm font-medium mb-1">Organization Name</h3>
                        <p className="text-sm text-muted-foreground">
                            Change your organization&apos;s display name
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row space-x-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={currentOrganization.name}
                                                className="max-w-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={!form.formState.isValid || isLoading}
                                className="bg-blue-600 text-white hover:bg-blue-700"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </form>
                    </Form>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-red-500">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Irreversible and destructive actions
                    </p>
                    <div className="md:space-y-0 space-y-2 md:space-x-2 flex flex-col md:flex-row">
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
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete Organization
                                        </>
                                    )}
                                </Button>
                            </ConfirmModal>
                        )}
                        <ConfirmModal
                            header="Leave organization"
                            description="Are you sure you want to leave this organization? You will lose access to all boards and resources."
                            onConfirm={onLeave}
                        >
                            <Button
                                variant="outline"
                                className="w-full border-red-500 text-red-500 hover:bg-red-50"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Leave Organization
                                    </>
                                )}
                            </Button>
                        </ConfirmModal>
                    </div>
                </div>
            </div>
        </div>
    );
};