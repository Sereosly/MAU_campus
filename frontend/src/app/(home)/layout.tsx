import type { Metadata } from "next";
import { ReactNode } from "react";
import AppSideBar from "@/widgets/home/ui/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";

export const metadata: Metadata = {
  title: "Карта Мурманского Автономного Университета",
  description: "Карта Университета",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      } as React.CSSProperties}
    >
      <div className="relative">
        <AppSideBar />
        <SidebarTrigger className="absolute top-4 -right-8 z-10" />
      </div>
        {children}
    </SidebarProvider>
  );
}