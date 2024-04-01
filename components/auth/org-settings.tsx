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
import { Menu, Settings, User, X } from "lucide-react";
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

interface OrganizationSettingsProps {
  activeOrganization: string | null;
  setActiveOrganization: (id: string) => void;
}

export const OrganizationSettings = ({
  activeOrganization,
  setActiveOrganization,
}: OrganizationSettingsProps) => {
  const user = useCurrentUser();
  const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
  const Initial = activeOrg?.name.charAt(0).toUpperCase();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [selectedSection, setSelectedSection] = useState('Members');
  const { update } = useSession();

  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: activeOrg?.name || undefined,
    }
  });


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

  {
    activeOrg?.users.map((orgUser: any) => (
      console.log(orgUser)
    ))
  }

  if (!user) return null;

  return (
    <div className="flex">
      <div className="w-1/3 space-y-4 pr-4 border-r">
        <div className="flex mb-3 items-center pb-0">
          <Image
            alt={activeOrg.name}
            src={`https://img.clerk.com/preview.png?size=144&seed=seed&initials=${Initial}&isSquare=true&bgType=marble&bgColor=6c47ff&fgType=initials&fgColor=FFFFFF&type=organization&w=48&q=75`}
            className="rounded-md"
            width={35}
            height={35}
          />
          <div className="ml-3 text-sm">
            <p>{activeOrg.name}</p>
          </div>
        </div>
        <div className="flex flex-col">
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
        </div>
      </div>
      <div className="w-2/3 pl-4">
        <h3 className="text-3xl font-semibold mb-4">
          {selectedSection}
        </h3>
        {selectedSection === 'Members' ? (
          <ul className="border-t pt-4">
            {activeOrg?.users.map((orgUser: any) => (
              <li key={orgUser.id} className="flex pb-3">
                <Avatar>
                  <AvatarImage src={orgUser.image ||""} />
                  <AvatarFallback className="bg-custom-blue">
                    <User className="text-white"/>
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="truncate text-[14px]">
                    {orgUser.name}
                    {orgUser.id === user?.id && (
                      <span className="bg-[#D8E0FC] px-[4px] py-[2px] rounded-sm text-[12px] text-custom-blue ml-1">You</span>
                    )}
                  </p>
                  <p className="truncate text-[12px] text-zinc-400">{orgUser.email}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-auto">
                    <Button variant="ghost">
                      <Menu className="text-zinc-500 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="rounded-xl shadow-xl">
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
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Organization Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Sebastian's Team"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  variant="auth"
                >
                  Save
                </Button>
              </form>
            </Form>
            <div className="mt-4">
              <p className="mt-4 pb-1 border-b">
                Danger
              </p>
              <div className="flex md:flex-row flex-col justify-center">
                <Button variant="destructive" className="mt-4 w-full md:mr-2" onClick={() => setSelectedSection("Delete organization")}>
                  <X className="h-4 w-4 mr-2" /> Delete Organization
                </Button>
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
                  onClick={() => deleteOrganization(activeOrg.id)
                    .then(() => {
                      setActiveOrganization("null");
                      localStorage.setItem("activeOrganization", "null");
                      update();
                    })}
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