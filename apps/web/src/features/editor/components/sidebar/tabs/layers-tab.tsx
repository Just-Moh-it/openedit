import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SidebarLayersTabContent() {
	return (
		<TabsPrimitive.TabsContent value="layers" className="flex h-full flex-col">
			{/* Sidebar Header */}
			<div className="p-4">
				<h2 className="font-semibold text-lg">Layers</h2>
			</div>

			{/* Sidebar Content */}
			<ScrollArea className="flex-1 p-2">
				<h3 className="mb-2 font-medium text-sm">Layers</h3>
			</ScrollArea>
		</TabsPrimitive.TabsContent>
	);
}
