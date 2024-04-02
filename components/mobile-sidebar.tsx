"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";

export const MobileSidebar = () => {
    return ( 
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button size='icon' variant='ghost' className='top-3 left-3'>
                    <Menu size={20}/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar/>
            </SheetContent>
        </Sheet>
     );
}
 
