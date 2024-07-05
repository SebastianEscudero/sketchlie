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
    const placeholderOrgs = Array.from({ length: 30 }, (_, index) => ({
            id: `placeholder-${index}`,
            name: `Placeholder Org ${index + 1}`,
            subscriptionPlan: 'Gratis'
        }));

    return (
        <ul className={`space-y-4 lg:space-y-0 lg:space-x-4 ${hasOrganizations ? 'lg:mr-4 mr:0 flex flex-col lg:flex-row' : ''}`}>
            {user?.organizations.map((org) => (
                <Item 
                    plan={org.subscriptionPlan}
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