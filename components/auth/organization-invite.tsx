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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
            members: [],
        },
    });

    const onSubmit = (values: z.infer<typeof OrganizationInviteSchema>) => {
        const validMembers = values.members.map(member => {
            if (member.email && !member.role) {
                member.role = 'Member';
            }
            return member;
        }).filter(member => member.email && member.role);
        startTransition(() => {
            invite({ members: validMembers }, activeOrg)
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
        <DialogHeader>
            <DialogTitle className="text-2xl truncate">Invite to {activeOrg.name}</DialogTitle>
            <p className="text-gray-600 text-sm py-2">Email addresses</p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className="flex space-x-4">
                                <FormField
                                    control={form.control}
                                    name={`members.${index}.email`}
                                    render={({ field }) => (
                                        <FormItem className="flex-grow">
                                            <FormControl>
                                                <Input
                                                    className="w-full"
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
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="border rounded-md p-2 flex flex-row items-center text-sm font-semibold w-[100px] h-[40px] justify-between">
                                        {form.watch(`members.${index}.role`) || 'Member'}
                                        <ChevronDown className="w-4 h-4 ml-2" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onSelect={() => form.setValue(`members.${index}.role`, 'Admin')}>
                                            Admin
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => form.setValue(`members.${index}.role`, 'Member')}>
                                            Member
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => form.setValue(`members.${index}.role`, 'Guest')}>
                                            Guest
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
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
                <div className="flex flex-col gap-y-2 pt-2">
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </div>
            </Form>
        </DialogHeader>
    )
}