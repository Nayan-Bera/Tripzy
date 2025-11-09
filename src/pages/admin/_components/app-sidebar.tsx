"use client";

import {
	IconBuilding,
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconFileAi,
	IconFileDescription,
	IconFolder,
	IconHelp,
	IconMapPins,
	IconSearch,
	IconSettings,
	IconUsers,
	IconUsersGroup
} from "@tabler/icons-react";
import * as React from "react";

import { DetailsResponse } from "@/app/customer/_components/app-sidebar";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const ROLES = {
  SUPERADMIN: "superadmin",
  ACCOUNTS: "accounts",
  CIVIL: "civil",
  BDE: "bde",
};

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS, ROLES.CIVIL, ROLES.BDE], // all
    },
    {
      title: "Users",
      url: "/admin/add-user",
      icon: IconUsers,
      roles: [ROLES.SUPERADMIN],
    },
    {
      title: "Bookings",
      url: "/admin/bookings",
      icon: IconChartBar,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS],
    },
    {
      title: "Transactions",
      url: "/admin/transactions",
      icon: IconFolder,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS],
    },
    // {
    //   title: "My Profile",
    //   url: "#",
    //   icon: IconUsers,
    //   roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS, ROLES.CIVIL, ROLES.BDE], // all can see
    // },
    {
      title: "Add Roles",
      url: "/admin/add-role",
      icon: IconUsers,
      roles: [ROLES.SUPERADMIN],
    },
    {
      title: "Add Slab",
      url: "/admin/add-slab-details",
      icon: IconFolder,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS],
    },
    {
      title: "Query",
      url: "/admin/query",
      icon: IconFolder,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS, ROLES.BDE],
    },
    {
      title: "Add Elevation",
      url: "/admin/elevation-add",
      icon: IconBuilding,
      roles: [ROLES.SUPERADMIN, ROLES.CIVIL],
    },
    {
      title: "Add Location",
      url: "/admin/location-add",
      icon: IconBuilding,
      roles: [ROLES.SUPERADMIN, ROLES.CIVIL],
    },
    {
      title: "Add Offers",
      url: "/admin/add-offers",
      icon: IconFolder,
      roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS],
    },
    {
      title: "Add Agents",
      url: "/admin/add-agents",
      icon: IconUsers,
      roles: [ROLES.SUPERADMIN],
    },
    {
      title: "Add lands",
      url: "/admin/landbank",
      icon: IconMapPins,
      roles: [ROLES.SUPERADMIN, ROLES.BDE],
    },
    {
      title: "Add leads",
      url: "/admin/leads",
      icon: IconUsersGroup,
	  roles: [ROLES.SUPERADMIN, ROLES.BDE],
    },
       {
      title: "Gst Details",
      url: "/admin/gst",
      icon: IconUsersGroup,
	  roles: [ROLES.SUPERADMIN, ROLES.ACCOUNTS],
    },
  
  ],

  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
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
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

async function fetchUserDetails() {
  const res = await fetch("/api/user/details", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user details");
  return res.json();
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = React.useState<DetailsResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const loadUser = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUserDetails();
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadUser();

    const handler = () => loadUser();
    window.addEventListener("userUpdated", handler);

    return () => window.removeEventListener("userUpdated", handler);
  }, [loadUser]);

  const role = userData?.user?.role ?? "guest";

  const filteredNavMain = data.navMain.filter((item) =>
    item.roles.includes(role)
  );

  console.log(userData);
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
                <Image
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
        <NavSecondary items={data.navSecondary} className="mt-auto cursor:pointer" />
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          userData && <NavUser user={userData.user} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
