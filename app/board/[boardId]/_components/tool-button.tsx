"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ElementType } from "react";

interface ToolButtonProps {
    icon: ElementType;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    label?: string;
};

export const ToolButton = ({
    icon: Icon,
    onClick,
    isActive,
    disabled,
    label
}: ToolButtonProps) => {
    const button = (
        <Button disabled={disabled} onClick={onClick} className="h-8 w-8 xs:h-10 xs:w-10 p-2 rounded-xl" variant={isActive ? "iconActive" : "icon"}>
            <Icon className="h-5 w-5" />
        </Button>
    );

    return label ? (
        <Hint side="top" label={label} sideOffset={14}>
            {button}
        </Hint>
    ) : (
        button
    );
}

export const SmallToolButton = ({ icon: Icon, onClick, isActive, label, disabled }: ToolButtonProps) => {
    const button = (
        <Button
            disabled={disabled}
            onClick={onClick}
            className="h-9 w-9 p-1.5"
            variant={isActive ? "iconActive" : "icon"}
        >
            <Icon className="h-5 w-5" />
        </Button>
    );

    return label ? (
        <Hint side="top" label={label} sideOffset={14}>
            {button}
        </Hint>
    ) : (
        button
    );
};

export const ExtraSmallToolButton = ({ icon: Icon, onClick, isActive, label, disabled }: ToolButtonProps) => {
    const button = (
        <Button disabled={disabled} onClick={onClick} className="h-8 w-8 p-1.5" variant={isActive ? "iconActive" : "icon"}>
            <Icon className="h-5 w-5" />
        </Button>
    );

    return label ? (
        <Hint side="top" label={label} sideOffset={14}>
            {button}
        </Hint>
    ) : (
        button
    );
}
