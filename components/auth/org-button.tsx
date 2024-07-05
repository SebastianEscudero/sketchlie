"use client";

import { Dialog, DialogTrigger } from "../ui/dialog";
import { CreateOrganization } from "./create-organization";
import { Hint } from "../hint";
import { Plus } from "lucide-react";

interface NewOrgButtonProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
};

export const NewOrgButton = ({
    activeOrganization,
    setActiveOrganization
}: NewOrgButtonProps) => {

  return (
    <Dialog>
        <DialogTrigger>
            <Hint label="Create Organization" side="bottom" align="center" sideOffset={18}>
                <div className="bg-white/25 lg:h-[36px] lg:w-[36px] h-[45px] w-[45px] rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                    <Plus className="text-white sm:h-6 sm:w-6 h-8 w-8"/>
                </div>
            </Hint>
        </DialogTrigger>
        <CreateOrganization 
            activeOrganization={activeOrganization}
            setActiveOrganization={setActiveOrganization}
        />
    </Dialog>
  );
};
