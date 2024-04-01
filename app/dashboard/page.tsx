"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";
import { EmptyOrg } from "@/components/empty-org";
import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import { Loading } from "@/components/auth/loading";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const favorites = searchParams.get("favorites") || undefined
  const [activeOrganization, setActiveOrganization] = useState<string | null>(null);

  useEffect(() => {
    setActiveOrganization(localStorage.getItem("activeOrganization"));
  }, []);

  useEffect(() => {
    if (!activeOrganization) return;
    localStorage.setItem("activeOrganization", activeOrganization);
  }, [activeOrganization]);

  const user = useCurrentUser();

  if (!user) return <Loading />;
  
  const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
  return (
    <main className="h-full">
      <Sidebar
        activeOrganization={activeOrganization}
        setActiveOrganization={setActiveOrganization}
      />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar 
            setActiveOrganization={setActiveOrganization}
            activeOrganization={activeOrganization}
          />
          <div className="h-full flex-1">
            <Navbar 
              setActiveOrganization={setActiveOrganization}
              activeOrganization={activeOrganization}
              activeOrg={activeOrg}
            />
            <div className="flex-1 h-[calc(100%-80px)] p-6">
              {!activeOrg ? (
                <EmptyOrg setActiveOrganization={setActiveOrganization} />
              ) : (
                <BoardList
                  userId={user.id}
                  orgId={activeOrg.id}
                  query={{search, favorites }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
 
export default DashboardPage;