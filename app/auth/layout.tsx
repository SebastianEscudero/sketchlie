"use client";

import { AuthNavbar } from "@/components/auth/auth-navbar";
import { themeCheck } from "@/lib/theme-utils";
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
      <div className="flex-grow flex items-center justify-center bg-amber-50 p-3">
        <h1 className="hidden">Sketchlie register, Sketchlie login, Sketchlie new passord, Sketchlie</h1>
        {children}
      </div>
    </div>
   );
}
 
export default AuthLayout;