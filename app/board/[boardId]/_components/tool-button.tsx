"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ElementType } from "react";

interface ToolButtonProps {
    icon: ElementType;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
};

export const ToolButton = ({
    icon: Icon,
    onClick,
    isActive,
    isDisabled
}: ToolButtonProps) => {
    
    let side: "right" | "top" | "bottom" | "left" | undefined = "right";
    if (window.innerHeight < 545) {
        side = "top";
    }

    return (
        <Button disabled={isDisabled} onClick={onClick} className="h-10 w-10 p-2" variant={isActive ? "iconActive" : "icon"}>
            <Icon className="h-5 w-5" />
        </Button>
    )
}