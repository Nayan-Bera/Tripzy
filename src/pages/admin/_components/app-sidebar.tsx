"use client";

import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  SuperscriptIcon,
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

  /* ================= USER ================= */

  const user = {
    name: auth.user.name,
    email: auth.user.email,
    avatar: "", // wire later if needed
  };

  /* ================= NAV ================= */

 const navMain = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Bot,
  },
  {
    title: "Hotels",
    url: "/admin/hotels",
    icon: Map,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: BookOpen,
  },
  {
    title: "supports",
    icon: SuperscriptIcon,
    url: "#",
     items: [
      {
        title: "Contact Us",
        url: "/admin/contact-us",
      },
    ],
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings2,
  },
];


  const projects = auth.user.platformRole === "super_admin"
    ? [
        {
          name: "Platform Analytics",
          url: "/admin/analytics",
          icon: PieChart,
        },
        {
          name: "System Config",
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
        {projects.length > 0 && <NavProjects projects={projects} />}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
