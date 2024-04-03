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
                <div className="h-[36px] w-[36px]">
                    <Hint label="Create Organization" side="right" align="start" sideOffset={18}>
                        <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white"/>
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[1080px] w-full">
                <CreateOrganization 
                    setActiveOrganization={setActiveOrganization}
                />
            </DialogContent>
        </Dialog>
  );
};
