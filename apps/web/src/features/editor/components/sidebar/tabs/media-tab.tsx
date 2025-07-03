import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SidebarMediaTabContent() {
	return (
		<TabsPrimitive.TabsContent value="text" className="flex h-full flex-col">
			{/* Sidebar Header */}
			<div className="border-b p-4">
				<h2 className="font-semibold text-lg">Text</h2>
			</div>

			{/* Sidebar Content */}
			<ScrollArea className="flex-1 p-2">
				<h3 className="mb-2 font-medium text-sm">Text Styles</h3>
				<Tabs defaultValue="simple" className="w-full">
					<TabsList className="grid w-full grid-cols-4 text-xs">
						<TabsTrigger value="simple">Simple</TabsTrigger>
						<TabsTrigger value="title">Title</TabsTrigger>
						<TabsTrigger value="lower">Lower</TabsTrigger>
						<TabsTrigger value="other">Other</TabsTrigger>
					</TabsList>
					<TabsContent value="simple" className="mt-4 space-y-2">
						<Card className="p-2">
							<div className="text-center">
								<div className="font-bold text-lg">Title</div>
								<div className="text-muted-foreground text-sm">Simple</div>
							</div>
						</Card>
						<Card className="p-2">
							<div className="text-center">
								<div className="text-lg italic">Cursive</div>
							</div>
						</Card>
					</TabsContent>
				</Tabs>
			</ScrollArea>
		</TabsPrimitive.TabsContent>
	);
}
