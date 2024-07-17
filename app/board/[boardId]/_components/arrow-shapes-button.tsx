"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ElementType } from "react";

interface ArrowShapesButtonProps {
    icon: ElementType;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
    label?: string;
};

export const ArrowShapesButton = ({
    icon: Icon,
    onClick,
    isDisabled,
    label
}: ArrowShapesButtonProps) => {
    const button = (
        <Button disabled={isDisabled} onPointerDown={onClick} className="h-8 w-8 p-2" variant="board">
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