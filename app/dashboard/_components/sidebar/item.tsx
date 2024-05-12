"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Hint } from '@/components/hint';

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
        let Color, LetterColor;
        switch (plan) {
            case 'Gratis':
                Color = '6C47FF';
                LetterColor = 'FFFFFF';
                break;
            case 'Starter':
                Color = 'F59E0B';
                LetterColor = '000000';
                break;
            case 'Business':
                Color = '000000';
                LetterColor = 'FFFFFF';
                break;
            default:
                Color = '6C47FF';
                LetterColor = '000000';
        }
        const onClick = () => {
            setActiveOrganization(id);
        };

    return (
        <div className="aspect-square relative">
            <Hint label={name} side="right" align="start" sideOffset={18}>
                <Image
                    fill 
                    sizes="48px"
                    alt={name}
                    src={`https://img.clerk.com/preview.png?size=144&seed=seed&initials=${Initial}&isSquare=true&bgType=marble&bgColor=${Color}&fgType=initials&fgColor=${LetterColor}&type=organization&w=48&q=75`}
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