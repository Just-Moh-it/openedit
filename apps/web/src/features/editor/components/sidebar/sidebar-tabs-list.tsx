import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  ArrowRightLeft,
  BlocksIcon,
  CaptionsIcon,
  CloudUploadIcon,
  FileText,
  FolderClosedIcon,
  Headphones,
  LayersIcon,
  SearchIcon,
  ShapesIcon,
  Sparkles,
  SwatchBookIcon,
  Type,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarShortcutsDialog } from "@/features/editor/components/sidebar/sidebar-shortcuts-dialog";
import { useStore } from "@/features/editor/state";

export const SidebarTabsList = observer(function SidebarTabsList() {
  const { inputProps } = useStore();

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Check if it's a video file
      if (!file.type.startsWith("video/")) {
        // For now, only handle video files
        console.warn("Only video files are supported");
        return;
      }

      try {
        // Create blob URL
        const blobUrl = URL.createObjectURL(file);

        // Create video element to get metadata
        const video = document.createElement("video");

        const getVideoMetadata = (): Promise<{
          naturalWidth: number;
          naturalHeight: number;
          naturalDurationInFrames: number;
        }> => {
          return new Promise((resolve, reject) => {
            video.onloadedmetadata = () => {
              const fps = 30; // Default FPS, could be made configurable
              const naturalDurationInFrames = Math.floor(video.duration * fps);

              resolve({
                naturalWidth: video.videoWidth,
                naturalHeight: video.videoHeight,
                naturalDurationInFrames,
              });
            };

            video.onerror = () => {
              reject(new Error("Failed to load video metadata"));
            };

            video.src = blobUrl;
          });
        };

        const metadata = await getVideoMetadata();

        // Add the video node to the store
        inputProps.addNode({
          type: "video",
          src: blobUrl,
          title: file.name,
          naturalWidth: metadata.naturalWidth,
          naturalHeight: metadata.naturalHeight,
          naturalDurationInFrames: metadata.naturalDurationInFrames,
          transforms: {
            top: 0,
            left: 0,
            width: 1920 / 2,
            height: 1080 / 2,
          },
        });

        // Clean up
        video.remove();

        // Reset the input value so the same file can be uploaded again
        event.target.value = "";
      } catch (error) {
        console.error("Error processing video file:", error);
        // Clean up blob URL on error
        if (event.target.files?.[0]) {
          URL.revokeObjectURL(URL.createObjectURL(event.target.files[0]));
        }
      }
    },
    [inputProps]
  );

  return (
    <ScrollArea className="[&>div>div]:!flex [&>div]:!flex flex min-h-0 w-18 flex-col border-r ">
      <TabsPrimitive.TabsList className="flex min-h-0 flex-1 flex-col items-stretch justify-between py-3">
        <div className="flex flex-col items-center gap-3">
          <TabsPrimitive.TabsTrigger
            value="search"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <SearchIcon className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Search
            </span>
          </TabsPrimitive.TabsTrigger>

          <Separator className="max-w-12" />

          <TabsPrimitive.TabsTrigger
            value="your-stuff"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <FolderClosedIcon className="h-5 w-5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Your Stuff
            </span>
          </TabsPrimitive.TabsTrigger>

          <TabsPrimitive.TabsTrigger
            value="brand-kit"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <SwatchBookIcon className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Brand kit
            </span>
          </TabsPrimitive.TabsTrigger>

          <label className="group flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out not-group-active:group-hover:bg-muted group-active:bg-border">
              <CloudUploadIcon className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Upload
            </span>

            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={handleFileUpload}
            />
          </label>

          <Separator className="max-w-12" />

          <TabsPrimitive.TabsTrigger
            value="elements"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <ShapesIcon className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Elements
            </span>
          </TabsPrimitive.TabsTrigger>
          <TabsPrimitive.TabsTrigger
            value="audio"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <Headphones className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Audio
            </span>
          </TabsPrimitive.TabsTrigger>
          <TabsPrimitive.TabsTrigger
            value="text"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <Type className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Text
            </span>
          </TabsPrimitive.TabsTrigger>
          <TabsPrimitive.TabsTrigger
            value="captions"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <CaptionsIcon className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Captions
            </span>
          </TabsPrimitive.TabsTrigger>
          <TabsPrimitive.TabsTrigger
            value="transcript"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <FileText className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Transcript
            </span>
          </TabsPrimitive.TabsTrigger>
          <TabsPrimitive.TabsTrigger
            value="effects"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <Sparkles className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Effects
            </span>
          </TabsPrimitive.TabsTrigger>
          <TabsPrimitive.TabsTrigger
            value="transitions"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <ArrowRightLeft className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Transitions
            </span>
          </TabsPrimitive.TabsTrigger>
          <TabsPrimitive.TabsTrigger
            value="plugins"
            className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
              <BlocksIcon className="size-4.5" />
            </div>
            <span className="text-xs/tight leading-3 tracking-tight group-data-[state=active]:text-primary">
              Plugins
            </span>
          </TabsPrimitive.TabsTrigger>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Tooltip>
            <TooltipTrigger>
              <TabsPrimitive.TabsTrigger
                value="layers"
                className="group flex flex-col items-center justify-center gap-1 text-muted-foreground"
              >
                <div className="flex items-center justify-center rounded-sm p-2 text-foreground transition-colors duration-200 ease-in-out group-data-[state=active]:bg-border group-data-[state=inactive]:hover:bg-muted">
                  <LayersIcon className="size-4.5 text-foreground" />
                </div>
              </TabsPrimitive.TabsTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">Layers</TooltipContent>
          </Tooltip>

          <SidebarShortcutsDialog />
        </div>
      </TabsPrimitive.TabsList>
    </ScrollArea>
  );
});
