"use client";

import { CreateOrganization } from "./create-organization";
import { Hint } from "../hint";
import { Plus } from "lucide-react";
import { useState } from "react";

interface NewOrgButtonProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
};

export const NewOrgButton = ({
    activeOrganization,
    setActiveOrganization
}: NewOrgButtonProps) => {
    const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);

    return (
        <>
            <Hint label="Create Organization" side="bottom" align="center" sideOffset={18}>
                <button className="bg-white/25 lg:h-[36px] lg:w-[36px] h-[45px] w-[45px] rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition"
                    onClick={() => setIsCreateBoardDialogOpen(true)}
                >
                    <Plus className="text-white sm:h-6 sm:w-6 h-8 w-8" />
                </button>
            </Hint>
            {isCreateBoardDialogOpen && (
                <CreateOrganization
                    activeOrganization={activeOrganization}
                    setActiveOrganization={setActiveOrganization}
                    isOpen={isCreateBoardDialogOpen}
                    setIsOpen={setIsCreateBoardDialogOpen}
                />
            )}
        </>
    );
};
