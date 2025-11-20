import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Building,
  Camera,
  ChartBar,
  File,
  FileCode,
  Folder,
  HelpCircle,
  LayoutDashboardIcon,
  MapPinPlus,
  Search,
  Settings,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";

const ROLES = {
  SUPERADMIN: "superadmin",
  ACCOUNTS: "accounts",
  CIVIL: "civil",
  BDE: "bde",
} as const;

type Role = (typeof ROLES)[keyof typeof ROLES];

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboardIcon,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS, ROLES.CIVIL, ROLES.BDE], // all
    },
    {
      title: "Users",
      url: "/admin/add-user",
      icon: Users,
      roles: [ROLES.SUPERADMIN],
    },
    {
      title: "Bookings",
      url: "/admin/bookings",
      icon: ChartBar,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS],
    },
    {
      title: "Transactions",
      url: "/admin/transactions",
      icon: Folder,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS],
    },
    {
      title: "Add Roles",
      url: "/admin/add-role",
      icon: Users,
      roles: [ROLES.SUPERADMIN],
    },
    {
      title: "Add Slab",
      url: "/admin/add-slab-details",
      icon: Folder,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS],
    },
    {
      title: "Query",
      url: "/admin/query",
      icon: Folder,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS, ROLES.BDE],
    },
    {
      title: "Add Elevation",
      url: "/admin/elevation-add",
      icon: Building,
      roles: [ROLES.SUPERADMIN, ROLES.CIVIL],
    },
    
  ],

  navClouds: [
    {
      title: "Capture",
      icon: Camera,
      isActive: true,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Proposal",
      icon: File,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Prompts",
      icon: FileCode,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
};

// 🔒 Static mock user (change as you like)
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: ROLES.SUPERADMIN,
  avatar: "/path/to/avatar.png",
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const role: Role = mockUser.role;

  const filteredNavMain = data.navMain.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img
                  src="/assets/logo-mdc.png"
                  alt="MyDearCity Builders"
                  width={100}
                  height={100}
                  className="h-9 w-auto"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto cursor-pointer"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={mockUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
