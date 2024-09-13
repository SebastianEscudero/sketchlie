import { useState, useCallback, startTransition } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { invite } from "@/actions/invite";
import { X, Link as LinkIcon, Lock, Users } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useCurrentUser } from '@/hooks/use-current-user';

interface OrganizationInviteProps {
    activeOrganization: string | null;
    isPrivate?: boolean;
    boardId?: string;
    children: React.ReactNode;
}

type MemberRole = "Admin" | "Member" | "Guest";

type Member = {
    email: string;
    role: MemberRole;
};

const roleOptions = [
    { value: "Guest", label: "Can view" },
    { value: "Member", label: "Can edit" },
    { value: "Admin", label: "Can manage" },
];

export const OrganizationInvite = ({
    activeOrganization,
    isPrivate,
    boardId,
    children
}: OrganizationInviteProps) => {
    const currentUser = useCurrentUser();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedRole, setSelectedRole] = useState<MemberRole>("Member");
    const [publicInviteRole, setPublicInviteRole] = useState<MemberRole>("Member");
    const { mutate: togglePrivate } = useApiMutation(api.board.togglePrivate);
    const activeOrg = currentUser?.organizations.find(org => org.id === activeOrganization);

    const form = useForm<z.infer<typeof OrganizationInviteSchema>>({
        resolver: zodResolver(OrganizationInviteSchema),
        defaultValues: {
            members: [],
        },
    });

    const onSubmit = (values: z.infer<typeof OrganizationInviteSchema>) => {
        setIsPending(true);
        startTransition(() => {
            invite({ members: values.members }, activeOrg)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }

                    if (data.success) {
                        toast.success(data.success);
                        setError(undefined);
                    }
                })
                .finally(() => setIsPending(false));
        })
    }

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.endsWith(',') || value.endsWith(' ')) {
            const newEmail = value.slice(0, -1).trim();
            if (newEmail && !members.some(member => member.email === newEmail)) {
                const newMember: Member = { email: newEmail, role: selectedRole };
                setMembers(prev => [...prev, newMember]);
                form.setValue('members', [...members, newMember]);
            }
            e.target.value = '';
        }
    }, [members, selectedRole, form]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newEmail = e.currentTarget.value.trim();
            if (newEmail && !members.some(member => member.email === newEmail)) {
                const newMember: Member = { email: newEmail, role: selectedRole };
                setMembers(prev => [...prev, newMember]);
                form.setValue('members', [...members, newMember]);
            }
            e.currentTarget.value = '';
        }
    }, [members, selectedRole, form]);

    const removeMember = useCallback((email: string) => {
        setMembers(prev => prev.filter(member => member.email !== email));
        form.setValue('members', members.filter(member => member.email !== email));
    }, [members, form]);

    const copyInviteLink = useCallback(() => {
        if (!boardId) return;
        const inviteLink = `https://www.sketchlie.com/board/${boardId}`;
        navigator.clipboard.writeText(inviteLink);
        toast.success("Board link copied to clipboard");
    }, [boardId]);

    const handleTogglePrivacy = useCallback(async (value: string) => {
        if (!boardId || !currentUser?.id) {
            toast.error("Unable to change board privacy");
            return;
        }

        const newIsPrivate = value === "private";

        try {
            await togglePrivate({
                id: boardId,
                userId: currentUser.id
            });
            toast.success(`Board is now ${newIsPrivate ? 'private' : 'public'}`);
        } catch (error) {
            toast.error("Failed to change board privacy");
        }
    }, [boardId, currentUser, togglePrivate]);

    return (
        <Dialog>
            <DialogTrigger asChild className="xs:ml-3">
                {children}
            </DialogTrigger>
            <DialogContent className="max-h-[90%] w-full max-w-[100%] lg:max-w-[50%] xl:max-w-[40%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl truncate">Invite to &quot;{activeOrg?.name}&quot;</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="members"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                                                {members.map((member, index) => (
                                                    <div key={index} className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                                                        <span>{member.email} ({roleOptions.find(r => r.value === member.role)?.label})</span>
                                                        <X
                                                            className="ml-2 h-4 w-4 cursor-pointer"
                                                            onClick={() => removeMember(member.email)}
                                                        />
                                                    </div>
                                                ))}
                                                <div className="flex-grow flex items-center">
                                                    <Input
                                                        disabled={isPending}
                                                        placeholder="Enter email addresses"
                                                        type="text"
                                                        onChange={handleInputChange}
                                                        onKeyDown={handleKeyDown}
                                                        className="flex-grow border-none focus:ring-0"
                                                    />
                                                    <Select
                                                        value={selectedRole}
                                                        onValueChange={(value: MemberRole) => setSelectedRole(value)}
                                                    >
                                                        <SelectTrigger className="w-[150px] ml-2">
                                                            <SelectValue placeholder="Select role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {roleOptions.map((option) => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {isPrivate !== undefined && boardId && (
                                <div className="p-4">
                                    <h3 className="text-sm mb-3 font-bold">General access</h3>
                                    <RadioGroup
                                        defaultValue={isPrivate ? "private" : "public"}
                                        onValueChange={handleTogglePrivacy}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="private" id="private" />
                                            <Label htmlFor="private" className="flex items-center">
                                                <Lock className="h-4 w-4 mr-2" />
                                                <div>
                                                    <span className="font-medium">Private</span>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Only people in your organization can access</p>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center justify-between flex-row">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="public" id="public" />
                                                <Label htmlFor="public" className="flex items-center">
                                                    <Users className="h-4 w-4 mr-2" />
                                                    <div>
                                                        <span className="font-medium">Anyone with the link</span>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">People in this workspace with the link {roleOptions.find(r => r.value === publicInviteRole)?.label.toLowerCase()}</p>
                                                    </div>
                                                </Label>
                                            </div>
                                            {!isPrivate && (
                                                <Select
                                                    value={publicInviteRole}
                                                    onValueChange={(value: MemberRole) => setPublicInviteRole(value)}
                                                >
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {roleOptions.map((option) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>
                                    </RadioGroup>
                                </div>
                            )}
                            <div className="flex flex-row w-full gap-x-2 justify-end">
                                <Button
                                    disabled={isPending || members.length === 0}
                                    type="submit"
                                    variant="sketchlieBlue"
                                >
                                    Invite teammates
                                </Button>
                                {isPrivate !== undefined && boardId &&
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        onClick={copyInviteLink}
                                    >
                                        <LinkIcon className="h-4 w-4 mr-2" strokeWidth={3} />
                                        Copy link
                                    </Button>
                                }
                            </div>
                        </form>
                        <div className="flex flex-col gap-y-2 pt-2">
                            <FormError message={error} />
                        </div>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};