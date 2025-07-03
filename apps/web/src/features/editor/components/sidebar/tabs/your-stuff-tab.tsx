import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { CloudUploadIcon, Search } from "lucide-react";
import { observer } from "mobx-react-lite";

export const SidebarYourStuffTabContent = observer(() => {
	return (
		<TabsPrimitive.TabsContent
			value="your-stuff"
			className="flex h-full min-h-0 flex-col"
		>
			{/* Header */}
			<div className="p-4 flex flex-col">
				<h2 className="mb-3 font-semibold text-lg">Your Stuff</h2>

				<label className={cn(buttonVariants({ size: "lg" }), "mb-3")}>
					<CloudUploadIcon className="size-4.5 mr-2" /> Upload from device
					<input type="file" className="hidden" />
				</label>

				{/* Search Input */}
				<div className="relative">
					<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400" />
					<Input
						placeholder="Search"
						className="border-gray-200 bg-gray-50 pl-10"
					/>
				</div>
			</div>

			{/* Content */}
			<ScrollArea className="flex-1 min-h-0 flex flex-col rounded-[inherit] [&>div>div]:!block"></ScrollArea>
		</TabsPrimitive.TabsContent>
	);
});
