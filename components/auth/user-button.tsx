"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { SettingsButton } from "./settings-button";
import { LogOut, Settings, User } from "lucide-react";
import { ThemeDropdownMenu } from "./theme-dropdown-menu";


interface UserButtonProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const UserButton = ({
  theme,
  setTheme
}: UserButtonProps) => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-blue-600">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-lg drop-shadow-md">
        <div className="w-full mr-10">
          <div className="flex flex-row mb-3 items-center p-5 pb-0">
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-blue-600">
                <User className="text-white" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-md font-semibold">
                {user?.name}
              </p>
              <p className="text-sm">
                {user?.email}
              </p>
            </div>
          </div>
          <ThemeDropdownMenu 
            theme={theme}
            setTheme={setTheme}
          />
          <SettingsButton>
            <DropdownMenuItem className="py-3 px-5 cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              <p className="ml-5">Settings</p>
            </DropdownMenuItem>
          </SettingsButton>
          <LogoutButton>
            <DropdownMenuItem className="py-3 px-5 mb-5 cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" />
              <p className="ml-5">Log out</p>
            </DropdownMenuItem>
          </LogoutButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
