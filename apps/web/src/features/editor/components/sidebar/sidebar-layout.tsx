import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarTabsList } from "@/features/editor/components/sidebar/sidebar-tabs-list";
import { SidebarLayersTabContent } from "@/features/editor/components/sidebar/tabs/layers-tab";
import { SidebarMediaTabContent } from "@/features/editor/components/sidebar/tabs/media-tab";
import { SidebarSearchTabContent } from "@/features/editor/components/sidebar/tabs/search-tab";
import { SidebarVideoTabContent } from "@/features/editor/components/sidebar/tabs/video-tab";
import { SidebarYourStuffTabContent } from "@/features/editor/components/sidebar/tabs/your-stuff-tab";
import type { EditorPageSearch } from "@/routes/_editor/editor.$projectId";

interface SidebarProps {
	children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarProps) {
	const navigate = useNavigate({
		from: "/editor/$projectId",
	});
	const { activeTab } = useSearch({
		from: "/_editor/editor/$projectId",
	});

	const handleTabChange = useCallback(
		(value: string) => {
			navigate({
				search: () => ({
					activeTab: value as EditorPageSearch["activeTab"],
				}),
			});
		},
		[navigate],
	);

	return (
		<TabsPrimitive.Tabs
			defaultValue="text"
			className="flex min-h-0 flex-1 items-stretch"
			onValueChange={handleTabChange}
			value={activeTab}
		>
			{/* Custom Sidebar Tab Switcher */}
			<SidebarTabsList />

			{/* Main Content Container */}
			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-0 flex-1 self-stretch"
			>
				{/* Sidebar Content for Current Tab */}
				<ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
					<SidebarSearchTabContent />
					<SidebarYourStuffTabContent />
					<SidebarMediaTabContent />
					<SidebarVideoTabContent />
					<SidebarLayersTabContent />
				</ResizablePanel>

				<ResizableHandle />

				{/* Main Content (Player + Timeline) */}
				<ResizablePanel defaultSize={80}>{children}</ResizablePanel>
			</ResizablePanelGroup>
		</TabsPrimitive.Tabs>
	);
}
