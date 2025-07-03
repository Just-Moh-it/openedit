import { ScrollAreaScrollbar } from "@radix-ui/react-scroll-area";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/features/editor/state";

export interface MediaItem {
  id: string;
  imageUrl: string;
  title?: string;
  duration?: string;
}

const videoLink =
  "https://www.pexels.com/download/video/32548279/?fps=29.969999313354492&h=1080&w=1920";

export const HorizontalScrollList = observer(
  ({
    title,
    items,
    onViewAll,
  }: {
    title: string;
    items: MediaItem[];
    onViewAll?: () => void;
  }) => {
    const {
      inputProps: { addNode },
    } = useStore();

    function handleAddNode() {
      addNode({
        type: "video",
        naturalDurationInFrames: 30 * 10,
        naturalHeight: 1080,
        naturalWidth: 1920,
        src: videoLink,
        title: "Video",
        transforms: {
          top: 0,
          height: 1080 / 2,
          width: 1920 / 2,
          left: 0,
        },
      });
    }

    return (
      <div className="mb-6 flex flex-col">
        <div className="mb-3 flex shrink-0 items-center justify-between px-4">
          <h3 className="font-semibold text-base">{title}</h3>
          {onViewAll && (
            <Button
              variant="link"
              size="sm"
              onClick={onViewAll}
              className="h-auto p-0 font-medium"
            >
              View all
            </Button>
          )}
        </div>

        <ScrollArea className="flex flex-1 flex-col whitespace-nowrap pb-2">
          <div className="flex w-max space-x-4 px-4">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                className="group flex-shrink-0 cursor-pointer border-none bg-transparent p-0"
                onClick={handleAddNode}
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100 transition-all">
                  <img
                    src={item.imageUrl}
                    alt={item.title || "Media content"}
                    className="h-full w-full object-cover"
                  />
                  {item.duration && (
                    <div className="absolute top-1 left-1 rounded bg-black/70 px-1 py-0.5 text-white text-xs">
                      {item.duration}
                    </div>
                  )}
                  {item.duration && !item.title && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <title>Play</title>
                          <path d="M8 5v14l11-7z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                {item.title && (
                  <p className="mt-1 w-24 truncate text-gray-600 text-xs">
                    {item.title}
                  </p>
                )}
              </button>
            ))}
          </div>
          <ScrollAreaScrollbar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  }
);
