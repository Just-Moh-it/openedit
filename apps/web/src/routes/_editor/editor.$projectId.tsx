import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "@/features/editor/components";
import { z } from "zod";

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
