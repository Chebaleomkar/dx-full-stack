"use client";

import React, { useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { ChevronLeft , Menu } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Import Sheet components

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r z-10 pt-20",
        className
      )}
    >
      {/* Desktop Sidebar */}
      <nav
        className={cn(
          `hidden md:flex h-full flex-col`,
          status && "duration-500",
          !isMinimized ? "w-72" : "w-[72px]"
        )}
      >
        <ChevronLeft
          className={cn(
            "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
            isMinimized && "rotate-180"
          )}
          onClick={handleToggle}
        />
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1">
              <DashboardNav items={navItems} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="fixed top-[104px] left-4 md:hidden p-2 text-foreground rounded-md bg-background border">
            <Menu className="text-2xl" />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <DashboardNav items={navItems} isMobileNav />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
