import { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PlayerAreaError({ message }: { message: string }) {
	return (
		<div className="dark flex h-full w-full items-center justify-center bg-gradient-to-b from-background via-red-900 to-background text-foreground scale-200 text-left">
			<Alert variant="destructive" className="max-w-100">
				<AlertTriangleIcon className="h-4 w-4" />
				<AlertTitle>Error - Could not preview the video</AlertTitle>
				<AlertDescription className="text-xs">
					But don't fret, this is not your fault. We have been notified and will
					fix it as soon as possible.
					<pre className="text-[10px] select-text">{message}</pre>
				</AlertDescription>
			</Alert>
		</div>
	);
}
