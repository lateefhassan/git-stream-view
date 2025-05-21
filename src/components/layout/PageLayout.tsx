
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Sidebar */}
      {isMobile && (
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}

      <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
        <TopBar onMenuButtonClick={toggleMobileSidebar} />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
