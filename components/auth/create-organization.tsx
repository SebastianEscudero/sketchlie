"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { OrganizationSchema } from "@/schemas";
import { DialogClose, DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { organization } from "@/actions/organization";
import { useProModal } from "@/hooks/use-pro-modal";
import { getMaxOrganizations } from "@/lib/planLimits";

interface CreateOrganizationProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
    label?: string;
    showCloseButton?: boolean;
};


export const CreateOrganization = ({
    activeOrganization,
    setActiveOrganization,
    label = "Create Organization",
    showCloseButton = true,
}: CreateOrganizationProps) => {
    const user = useCurrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    const proModal = useProModal();
    const maxOrganizations = getMaxOrganizations(user);

    const form = useForm<z.infer<typeof OrganizationSchema>>({
        resolver: zodResolver(OrganizationSchema),
        defaultValues: {
            name: "",
        }
    });

    if (!user) {
        setError("Unauthorized");
        return;
    }

    const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {

        if (user.organizations.length >= maxOrganizations) {
            proModal.onOpen(activeOrganization);
        } else {
            setError("");
            setSuccess("");

            startTransition(() => {
                organization(values, user.id)
                    .then((data) => {
                        if (data.error) {
                            setError(data.error);
                        } else {
                            setSuccess(data.success);
                            update({ event: "session" });
                            if (data.id) {
                                setActiveOrganization(data.id);
                                localStorage.setItem("activeOrganization", data.id)
                            }
                        }
                    });
            });
        }
    };

    return (
        <DialogContent className="w-[80%] sm:w-[60%] lg:w-[40%] xl:w-[30%] rounded-xl" showCloseButton={showCloseButton}>
            <DialogHeader>
                <DialogTitle>{label}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <FormField
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organization Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Sebastian's Team"
                                            disabled={isPending}
                                            className="text-base py-1"
                                            maxLength={60}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {!form.formState.isValid ? (
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="auth"
                        >
                            Create organization
                        </Button>) : (
                        <DialogClose asChild>
                            <Button
                                disabled={isPending}
                                type="submit"
                                variant="auth"
                            >
                                Create organization
                            </Button>
                        </DialogClose>)}
                </form>
                <FormError message={error} />
                <FormSuccess message={success} />
            </Form>
        </DialogContent>
    )
}