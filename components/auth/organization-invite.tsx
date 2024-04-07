"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { OrganizationInviteSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { invite } from "@/actions/invite";

interface OrganizationInviteProps {
    activeOrganization: string | null;

}

export const OrganizationInvite = ({
    activeOrganization,
}: OrganizationInviteProps) => {
    const user = useCurrentUser();
    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof OrganizationInviteSchema>>({
        resolver: zodResolver(OrganizationInviteSchema),
        defaultValues: {
            emails: []
        },
    });

    const onSubmit = (values: z.infer<typeof OrganizationInviteSchema>) => {
        const validEmails = Array.from(new Set(values.emails.filter(email => email && email !== "")));
        startTransition(() => {
            invite({ emails: validEmails }, activeOrg)
            .then((data) => {
                if (data.error) {
                  setError(data.error);
                }
      
                if (data.success) {
                  setSuccess(data.success);
                }
              })
        })
    }

    return (
        <div className="p-4">
            <DialogHeader>
                <DialogTitle className="text-2xl max-w-[400px] truncate">Invite to {activeOrg.name}</DialogTitle>
                <p className="text-gray-600 text-sm py-2">Email addresses</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            {Array.from({ length: 4 }, (_, index) => (
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={`emails.${index}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="name@example.com"
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="auth"
                            className="p-5"
                        >
                            Invite teammates
                        </Button>
                    </form>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </Form>
            </DialogHeader>
        </div>
    )
}