"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";
import { EmptyOrg } from "@/components/empty-org";
import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Loading } from "@/components/auth/loading";
import { useProModal } from "@/hooks/use-pro-modal";
import Templates from "./_components/templates";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const favorites = searchParams.get("favorites") || undefined
  const [activeOrganization, setActiveOrganization] = useState<string | null>(null);
  const user = useCurrentUser();
  const proModal = useProModal();
  const [theme, setTheme] = useState("dark"); // Example state, replace with your theme state management

  useEffect(() => {
    document.body.style.cursor = 'default';
    setActiveOrganization(localStorage.getItem("activeOrganization"));
    setTheme(localStorage.getItem("theme") || "dark");
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeOrganization) {
        localStorage.setItem("activeOrganization", activeOrganization);
      } else {
        if (user?.organizations && user?.organizations.length > 0) {
          setActiveOrganization(user.organizations[0].id);
        }
      }
    }, 10); // 10 milliseconds = 0.01 seconds

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [activeOrganization, user]);

  useEffect(() => {
    if (searchParams.get("openProModal")) {
      proModal.onOpen(activeOrganization);
    }
  }, []);

  if (!user) return <Loading />;

  const activeOrg = user?.organizations.find(org => org.id === activeOrganization);

  return (
    <main className={`h-full ${theme === "dark" ? "bg-[#383838] text-white" : "bg-[#F9FAFB]"}`}>
      <div className="flex h-full">
      {activeOrg && (
        <OrgSidebar
          setActiveOrganization={setActiveOrganization}
          activeOrganization={activeOrganization}
          theme={theme}
        />
      )}
      <div className="h-full flex-1">
        <Navbar
          setActiveOrganization={setActiveOrganization}
          activeOrganization={activeOrganization}
          activeOrg={activeOrg}
          theme={theme}
          setTheme={setTheme}
        />
        {activeOrg && (
          <Templates
            org={activeOrg}
            theme={theme}
          />
        )}
        <div className="flex-1 h-[calc(100%] p-6">
          {!activeOrg ? (
            <EmptyOrg
              setActiveOrganization={setActiveOrganization}
              user={user}
            />
          ) : (
            <BoardList
              userId={user.id}
              org={activeOrg}
              query={{ search, favorites }}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
    </main>
  );
};

export default DashboardPage;