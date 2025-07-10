import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Editor } from "@/features/editor/components";

export const editorPageSearchSchema = z.object({
  activeTab: z
    .enum([
      "search",
      "your-stuff",
      "brand-kit",
      "elements",
      "audio",
      "text",
      "captions",
      "transcript",
      "effects",
      "transitions",
      "plugins",
      "layers",
    ])
    .default("search"),
});
export type EditorPageSearch = z.infer<typeof editorPageSearchSchema>;

export const Route = createFileRoute("/_editor/editor/$projectId")({
  component: EditorPage,
  validateSearch: editorPageSearchSchema,
});

function EditorPage() {
  return <Editor />;
}
