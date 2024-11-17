"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Organization as PrismaOrganization, OrganizationUser, Role } from "@prisma/client";

interface Organization extends PrismaOrganization {
  users: OrganizationUser[];
  subscription?: {
    subscriptionId: string;
    payerId: string;
    status: string;
    mercadoPagoCurrentPeriodEnd: Date | null;
  } | null;
  invitations?: {
    id: string;
    email: string | null;
    status: string;
    role: Role | null;
  }[];
}

interface OrganizationContextType {
  currentOrganization: Organization | null;
  setCurrentOrganizationId: (id: string | null) => void;
  isLoading: boolean;
  userRole: Role;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser();
  const [currentOrganizationId, setCurrentOrganizationIdState] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const setCurrentOrganizationId = (id: string | null) => {
    setCurrentOrganizationIdState(id);
    if (id) {
      localStorage.setItem("activeOrganization", id);
    } else {
      localStorage.removeItem("activeOrganization");
    }
  };

  useEffect(() => {
    if (!user) return;

    const storedOrgId = localStorage.getItem("activeOrganization");
    const firstOrgId = user.organizations?.[0]?.id;

    if (user.organizations.find(org => org.id === storedOrgId)) {
      setCurrentOrganizationIdState(storedOrgId);
    } else if (firstOrgId) {
      setCurrentOrganizationId(firstOrgId);
    }
    
    setInitialized(true);
  }, [user?.organizations, user]);

  const currentOrganization = user?.organizations.find(org => org.id === currentOrganizationId);
  const userOrganizationRole = currentOrganization?.users.find((u: any) => u.id === user?.id)?.role || "Guest"

  // Consider it loading if not initialized or waiting for user data
  const isLoading = !initialized || user === undefined;

  return (
    <OrganizationContext.Provider value={{ 
      currentOrganization: currentOrganization || null,
      setCurrentOrganizationId, 
      isLoading,
      userRole: userOrganizationRole
    }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error("useOrganization must be used within an OrganizationProvider");
  }
  return context;
} 