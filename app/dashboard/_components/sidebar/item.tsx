"use client";

import { cn } from '@/lib/utils';
import { Hint } from '@/components/hint';
import { OrgImage } from '@/components/auth/org-image';
import { getPlanColor } from '@/lib/orgUtils';

interface ItemProps {
    plan: string;
    id: string;
    name: string;
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
};

export const Item = ({ id, name, activeOrganization, setActiveOrganization, plan }: ItemProps) => {
    const isActive = activeOrganization === id;
    const Initial = name.charAt(0).toUpperCase();
    const { color, letterColor } = getPlanColor(plan);
    const onClick = () => {
        setActiveOrganization(id);
    };

    return (
        <div className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition aspect-square relative",
            isActive && "opacity-100"
        )}
            onClick={onClick}
        >
            <Hint label={name} side="bottom" align="center" sideOffset={18}>
                <div className='w-full h-full'>
                    <OrgImage
                        width="100%"
                        height="100%"
                        letter={Initial}
                        color={color}
                        letterColor={letterColor}
                    />
                </div>
            </Hint>
        </div>
    );
};