import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "./_components/site-header";
import { AppSidebar } from "../admin/_components/app-sidebar";


interface AdminLayoutProps {
  children: React.ReactNode;
}

const ProviderLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
   <SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="w-full w-max-6xl p-5">{children}</div>
			</SidebarInset>
		</SidebarProvider>
  );
};

export default ProviderLayout;
