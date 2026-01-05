"use client";

import {
  BookOpen,
  CalendarCheck,
  Frame,
  Headset,
  Hotel,
  PieChart,
  Settings2,
  Shield,
  SquareTerminal,
  Users
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavProjects } from "../../provider/_components/nav-projects";
import { NavUser } from "../../provider/_components/nav-user";
import { NavMain } from "./nav-main";

import { selectCurrentAuth } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const auth = useSelector(selectCurrentAuth);

  /* ================= AUTH GUARD ================= */

  if (!auth.user) return null;

  if (
    auth.user.platformRole !== "admin" &&
    auth.user.platformRole !== "super_admin"
  ) {
    return <Navigate to="/" replace />;
  }

  const isSuperAdmin = auth.user.platformRole === "super_admin";

  /* ================= USER ================= */

  const user = {
    name: auth.user.name,
    email: auth.user.email,
    avatar: "",
  };

  /* ================= MAIN NAV ================= */

  const navMain = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: SquareTerminal,
    },

    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },

    {
      title: "Hotels",
      icon: Hotel,
      url: "/admin/hotels",
      items: [
        {
          title: "All Hotels",
          url: "/admin/all-hotels",
        },
        {
          title: "Hotel Rooms",
          url: "/admin/hotels/rooms",
        },
        {
          title: "Hotel Bookings",
          url: "/admin/hotels/bookings",
        },
        {
          title: "Hotel Staff",
          url: "/admin/hotels/staff",
        },
      ],
    },

    {
      title: "Bookings",
      url: "/admin/bookings",
      icon: CalendarCheck,
    },

    {
      title: "Reports",
      icon: BookOpen,
      url: "/admin/reports",
      items: [
        {
          title: "Booking Reports",
          url: "/admin/reports/bookings",
        },
        {
          title: "Revenue Reports",
          url: "/admin/reports/revenue",
        },
        {
          title: "Hotel Performance",
          url: "/admin/reports/hotels",
        },
      ],
    },

    {
      title: "Support",
      icon: Headset,
      url: "/admin/contact-us",
    },

    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings2,
    },
  ];

  /* ================= SUPER ADMIN NAV ================= */

  const superAdminProjects = isSuperAdmin
    ? [
        {
          name: "Platform Analytics",
          url: "/admin/analytics",
          icon: PieChart,
        },
        {
          name: "Roles & Permissions",
          url: "/admin/system/roles",
          icon: Shield,
        },
        {
          name: "System Configuration",
          url: "/admin/system",
          icon: Frame,
        },
      ]
    : [];

  /* ================= RENDER ================= */

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
        {superAdminProjects.length > 0 && (
          <NavProjects projects={superAdminProjects} />
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
