
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon, History as IconHistory } from "lucide-react";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

interface NavMainProps {
  items: NavItem[];
  /** Optional: pass the current path to control active state.
   * If not provided, window.location.pathname will be used (Vite SPA).
   */
  activeUrl?: string;
}

export function NavMain({ items, activeUrl }: NavMainProps) {
  const currentPath =
    activeUrl || (typeof window !== "undefined" ? window.location.pathname : "");

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = currentPath === item.url;

            return (
              <a href={item.url} key={item.title} className="cursor-pointer">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={
                      isActive
                        ? "bg-primary cursor-pointer hover:bg-black hover:text-white text-white"
                        : "cursor-pointer"
                    }
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </a>
            );
          })}

          {/* Static Logs link */}
          <a href="/admin/loges" className="cursor-pointer">
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Logs"
                className={
                  currentPath === "/admin/loges"
                    ? "bg-primary text-white cursor-pointer"
                    : "cursor-pointer"
                }
              >
                <IconHistory />
                <span>Logs</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </a>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
