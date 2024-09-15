import { useState } from "react";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, LoaderCircle, Trash, LogOut } from "lucide-react";
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
import { useCurrentUser } from "@/hooks/use-current-user";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ConfirmModal } from "../confirm-modal";

interface SettingsTabProps {
    activeOrg: any;
    user: any;
    usersRole: any;
    setActiveOrganization: any;
}

export const SettingsTab = ({ activeOrg, user, usersRole, setActiveOrganization }: SettingsTabProps) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isLoading, setLoading] = useState(false);
    const { update } = useSession();
    const { mutate } = useApiMutation(api.board.remove);

    const data = useQuery(api.boards.get, {
        orgId: activeOrg.id,
        userId: user?.id,
    });

    const form = useForm<z.infer<typeof OrganizationSchema>>({
        resolver: zodResolver(OrganizationSchema),
        defaultValues: {
            name: activeOrg?.name || undefined,
        }
    });

    const onLeave = () => {
        leaveOrganization(activeOrg.id, user.id)
            .then((result) => {
                if (user && user.organizations && user?.organizations?.length > 0) {
                    const firstOrgId = user?.organizations[0].id;
                    setActiveOrganization(firstOrgId);
                    localStorage.setItem("activeOrganization", firstOrgId);
                } else {
                    setActiveOrganization(null);
                    localStorage.setItem("activeOrganization", '');
                }
                update();
                if (result.isOrgDeleted) {
                    toast.success("Organization deleted successfully");
                } else {
                    toast.success("Left organization successfully");
                }
            })
    }

    const onDelete = () => {
        const orgName = activeOrg.name;
        deleteOrganization(activeOrg.id)
            .then(() => {
                {
                    data?.map((board) => (
                        mutate({ id: board._id, userId: user?.id })
                    ))
                }
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
    };

    return (
        <div className="space-y-6">
            {usersRole === 'Admin' && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organization Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter organization name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={!form.formState.isValid || isLoading} variant="sketchlieBlue">
                            Rename Organization
                        </Button>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </form>
                </Form>
            )}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Danger Zone</h3>
                <div className="flex space-x-0 sm:space-y-0 space-y-2 sm:space-x-2 sm:flex-row flex-col">
                    {usersRole === 'Admin' && (
                        <ConfirmModal
                            header="Delete organization"
                            description="Are you sure you want to delete this organization?"
                            onConfirm={onDelete}
                        >
                            <Button variant="destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Organization
                            </Button>
                        </ConfirmModal>
                    )}
                    <ConfirmModal
                        header="Leave organization"
                        description="Are you sure you want to leave this organization?"
                        onConfirm={onLeave}
                    >
                        <Button variant="outline">
                            <LogOut className="mr-2 h-4 w-4" />
                            Leave Organization
                        </Button>
                    </ConfirmModal>
                </div>
            </div>
        </div>
    );
};