"use client";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CreateOrganization } from "./create-organization";
import { Hint } from "../hint";
import { Plus } from "lucide-react";

interface NewOrgButtonProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
};

export const NewOrgButton = ({
    setActiveOrganization
}: NewOrgButtonProps) => {

  return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square relative">
                    <Hint label="Create Organization" side="right" align="start" sideOffset={18}>
                        <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white sm:h-6 sm:w-6 h-8 w-8"/>
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <CreateOrganization 
                setActiveOrganization={setActiveOrganization}
            />
        </Dialog>
  );
};
