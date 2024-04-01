"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";

export const MobileSidebar = () => {
    return ( 
        <Sheet>
            <SheetTrigger className="lg:hidden">
                <Menu className="ml-4"/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar/>
            </SheetContent>
        </Sheet>
     );
}
 
