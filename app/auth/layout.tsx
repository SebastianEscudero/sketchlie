"use client";

import { AuthNavbar } from "@/components/auth/auth-navbar";
import { themeCheck } from "@/lib/theme-utilts";
import { useEffect } from "react";

const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {

  useEffect(() => {
    themeCheck();
}, [])

  return ( 
    <div className="h-full flex flex-col">
      <AuthNavbar />
      <div className="flex-grow flex items-center justify-center bg-[#F9FAFB] dark:bg-[#0a101f] font-sans p-3">
        <h1 className="hidden">Sketchlie register, Sketchlie login, Sketchlie new passord, Sketchlie</h1>
        {children}
      </div>
    </div>
   );
}
 
export default AuthLayout;