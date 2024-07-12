"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { OrganizationSchema } from "@/schemas";
import { DialogHeader, DialogTitle, DialogContent, Dialog } from '@/components/ui/dialog';
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
import { organization } from "@/actions/organization";
import { useProModal } from "@/hooks/use-pro-modal";
import { getMaxOrganizations } from "@/lib/planLimits";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

interface CreateOrganizationProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
    label?: string;
    showCloseButton?: boolean;
};


export const CreateOrganization = ({
    activeOrganization,
    setActiveOrganization,
    isOpen,
    setIsOpen,
    label = "Create Organization",
    showCloseButton = true,
}: CreateOrganizationProps) => {
    const user = useCurrentUser();
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
        return;
    }

    const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {

        if (user.organizations.length >= maxOrganizations) {
            proModal.onOpen(activeOrganization);
        } else {
            startTransition(() => {
                organization(values, user.id)
                    .then((data) => {
                        if (data.success) {
                            update({ event: "session" });
                            if (data.id) {
                                setActiveOrganization(data.id);
                                localStorage.setItem("activeOrganization", data.id)
                                toast.success("Organization created successfully");
                                setIsOpen?.(false);
                            }
                        } else {
                            toast.error("Failed to create organization");
                            setIsOpen?.(false);
                        }
                    });
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="sketchlieBlue"
                            className="w-48"
                        >
                            {isPending ? <LoaderCircle className="animate-spin w-5 h-5 text-white" /> : "Create organization"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}