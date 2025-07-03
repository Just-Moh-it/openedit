import { observer } from "mobx-react-lite";
import { AbsoluteFill } from "remotion";
import type { UsedInputProps } from "@/features/editor/state/input-props";
import { NodeRenderer } from "@/lib/remotion/composition/components/node-renderer";

// Have to add observer here, otherwise the player will not re-render when the input props change, TODO: diagnose why
export const RootComposition = observer(
	({ inputProps }: { inputProps: UsedInputProps }) => {
		return (
			<AbsoluteFill className="bg-white">
				{inputProps.nodes.map((node) => (
					<NodeRenderer key={node.id} node={node} inputProps={inputProps} />
				))}
			</AbsoluteFill>
		);
	},
);
