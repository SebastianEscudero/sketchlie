"use client";

import { Item } from "./item";
import { useCurrentUser } from "@/hooks/use-current-user";

interface ListProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
};

export const List = ({
    activeOrganization, 
    setActiveOrganization
}: ListProps) => {
    const user = useCurrentUser();
    if (!user) return null;

    const hasOrganizations = user.organizations.length > 0;

    return (
        <ul className={`space-y-4 ${hasOrganizations ? 'sm:mb-4 mb:0' : ''}`}>
            {user?.organizations.map((org) => (
                <Item 
                    key={org.id} 
                    id={org.id} 
                    name={org.name} 
                    activeOrganization={activeOrganization}
                    setActiveOrganization={setActiveOrganization}
                />
            ))}
        </ul>
    );
};