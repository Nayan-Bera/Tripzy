"use client";

import { type Icon, IconHistory } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: Icon;
	}[];
}) {
	  const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2 ">
				<SidebarMenu >
					{items.map((item) => (
						// const isActive = NavMain.pathname === {item.url};
						<Link href={item.url} key={item.title} className="cursor-pointer">
							<SidebarMenuItem >
								<SidebarMenuButton tooltip={item.title}
								 className={
                                 pathname === item.url ? "bg-primary cursor-pointer hover:bg-black hover:text-white text-white" : "cursor-pointer"}
								>
								{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</Link>
					))}
					<Link href="/admin/loges">
						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Logs"
							className={pathname === "/admin/loges" ? "bg-primary text-white" : ""}
							>
								<IconHistory />
								<span>Logs</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</Link>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
