import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_editor/editor/")({
	loader: () => {
		return redirect({
			to: "/editor/$projectId",
			params: {
				projectId: "123",
			},
		});
	},
});
