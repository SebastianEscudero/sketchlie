"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Hint } from '@/components/hint';

interface ItemProps {
    id: string;
    name: string;
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
};

    export const Item = ({ id, name, activeOrganization, setActiveOrganization }: ItemProps) => {
        const isActive = activeOrganization === id;
        const Initial = name.charAt(0).toUpperCase();
        const onClick = () => {
            setActiveOrganization(id);
        };

    return (
        <div className="aspect-square relative">
            <Hint label={name} side="right" align="start" sideOffset={18}>
                <Image
                    fill 
                    alt={name}
                    src={`https://img.clerk.com/preview.png?size=144&seed=seed&initials=${Initial}&isSquare=true&bgType=marble&bgColor=6c47ff&fgType=initials&fgColor=FFFFFF&type=organization&w=48&q=75`}
                    onClick={onClick}
                    className={cn(
                        "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                        isActive && "opacity-100"
                    )}
                />
            </Hint>
        </div>
    );
};