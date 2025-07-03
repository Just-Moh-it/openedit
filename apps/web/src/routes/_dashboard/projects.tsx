import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  return <div>Hello projects</div>;
}
