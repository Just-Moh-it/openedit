import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Search } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	HorizontalScrollList,
	type MediaItem,
} from "@/features/editor/components/sidebar/components/horizontal-scroll-list";

// Mock data using Pexels random URLs
const templatesData: MediaItem[] = [
	{
		id: "1",
		imageUrl:
			"https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		title: "Dragon Boat Festival",
	},
	{
		id: "2",
		imageUrl:
			"https://images.pexels.com/photos/1262302/pexels-photo-1262302.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		title: "Creative Design",
	},
	{
		id: "3",
		imageUrl:
			"https://images.pexels.com/photos/2693529/pexels-photo-2693529.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		title: "Pride Month",
	},
	{
		id: "4",
		imageUrl:
			"https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		title: "Happy Guru Purnima",
	},
];

const photosData: MediaItem[] = [
	{
		id: "5",
		imageUrl:
			"https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		title: "Wind Turbines",
	},
	{
		id: "6",
		imageUrl:
			"https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		title: "Tech Interface",
	},
];

const videosData: MediaItem[] = [
	{
		id: "7",
		imageUrl:
			"https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		duration: "15s",
	},
	{
		id: "8",
		imageUrl:
			"https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		duration: "30s",
	},
];

const audioData: MediaItem[] = [
	{
		id: "9",
		imageUrl:
			"https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		title: "Imperial Chinese Spectacle",
		duration: "1:32",
	},
	{
		id: "10",
		imageUrl:
			"https://images.pexels.com/photos/1152359/pexels-photo-1152359.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		title: "Summer's End - Loop A",
		duration: "1:00",
	},
	{
		id: "11",
		imageUrl:
			"https://images.pexels.com/photos/1769980/pexels-photo-1769980.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
		title: "Dramatic Inspiring Dubstep",
		duration: "55s",
	},
];

const backgroundsData: MediaItem[] = [
	{
		id: "12",
		imageUrl:
			"https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
	},
	{
		id: "13",
		imageUrl:
			"https://images.pexels.com/photos/2693529/pexels-photo-2693529.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
	},
];

// Mock addNode function - replace with actual implementation

export const SidebarSearchTabContent = observer(() => {
	return (
		<TabsPrimitive.TabsContent
			value="search"
			className="flex h-full min-h-0 flex-col"
		>
			{/* Header */}
			<div className="p-4">
				<h2 className="mb-3 font-semibold text-lg">Search</h2>

				{/* Search Input */}
				<div className="relative">
					<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400" />
					<Input placeholder="Search" className="pl-10" />
				</div>
			</div>

			{/* Content */}
			<ScrollArea className="[&>div>div]:!block flex min-h-0 flex-1 flex-col rounded-[inherit]">
				<div className="flex min-h-0 flex-col pb-4">
					<HorizontalScrollList
						title="Templates"
						items={templatesData}
						onViewAll={() => console.log("View all templates")}
					/>

					<HorizontalScrollList
						title="Photos"
						items={photosData}
						onViewAll={() => console.log("View all photos")}
					/>

					<HorizontalScrollList
						title="Videos"
						items={videosData}
						onViewAll={() => console.log("View all videos")}
					/>

					<HorizontalScrollList
						title="Audio"
						items={audioData}
						onViewAll={() => console.log("View all audio")}
					/>

					<HorizontalScrollList
						title="Backgrounds"
						items={backgroundsData}
						onViewAll={() => console.log("View all backgrounds")}
					/>
					<HorizontalScrollList
						title="Backgrounds"
						items={backgroundsData}
						onViewAll={() => console.log("View all backgrounds")}
					/>
				</div>
			</ScrollArea>
		</TabsPrimitive.TabsContent>
	);
});
SidebarSearchTabContent.displayName = "SidebarSearchTabContent";
