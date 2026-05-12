import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200/50 shadow-sm shadow-zinc-200/20">
      <div className="mx-4 sm:mx-8 flex h-16 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="text-xl font-bold md:hidden text-primary">{title}</h1>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl relative text-zinc-500 hover:text-primary hover:bg-primary/5 transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
            </Button>
            <div className="h-8 w-[1px] bg-zinc-200 mx-1"></div>
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}
