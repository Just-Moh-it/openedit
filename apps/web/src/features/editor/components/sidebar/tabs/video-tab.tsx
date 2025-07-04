import * as TabsPrimitive from "@radix-ui/react-tabs";
import { observer } from "mobx-react-lite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FPS } from "@/features/editor/lib/constants";
import { useStore } from "@/features/editor/state";

export const SidebarVideoTabContent = observer(() => {
	const {
		inputProps: { addNode },
	} = useStore();

	return (
		<TabsPrimitive.TabsContent value="video" className="flex h-full flex-col">
			{/* Sidebar Header */}
			<div className="border-b p-4">
				<h2 className="font-semibold text-lg">Search</h2>
			</div>

			{/* Sidebar Content */}
			<ScrollArea className="flex-1 p-2">
				<h3 className="mb-2 font-medium text-sm">Text Styles</h3>
				<button
					type="button"
					onClick={() =>
						addNode({
							type: "video",
							title: "",
							src: "https://remotionlambda-gxzle4ynoh.s3.eu-west-3.amazonaws.com/91d91338-2e32-4af6-9915-bb5cf03cef3f",
							naturalDurationInFrames: FPS * 100,
							naturalHeight: 1080,
							naturalWidth: 1920,
							transforms: {
								top: 0,
								left: 0,
								width: 1920,
								height: 1080,
							},
						})
					}
				>
					Add Video
				</button>
			</ScrollArea>
		</TabsPrimitive.TabsContent>
	);
});
SidebarVideoTabContent.displayName = "SidebarVideoPanel";
