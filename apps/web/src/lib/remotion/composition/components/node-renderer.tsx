import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { Audio, Img, OffthreadVideo } from "remotion";
import type { Node, UsedInputProps } from "@/features/editor/state/input-props";
import { cn, getElementDomId } from "@/lib/utils";

// Simple Text component for text rendering
const TextRenderer = ({ content, style }: { content: string; style: any }) => {
	return (
		<div
			className="flex size-full items-center justify-center overflow-visible"
			style={style}
		>
			{content}
		</div>
	);
};

export const NodeRenderer = observer(
	({ node, inputProps }: { node: Node; inputProps: UsedInputProps }) => {
		// Load fonts for text elements (similar to reference code)
		React.useEffect(() => {
			if (node.type === "text") {
				// TODO: Add font loading logic when fonts are implemented in MST
				// const font = getAvailableFonts().filter((availableFont) => {
				//   return availableFont.fontFamily === node.style.fontFamily
				// })?.[0]
				// if (font) {
				//   font.load().then((loaded) => loaded.loadFont()).catch(console.error)
				// }
			}
		}, [node]);

		const content = useMemo(() => {
			switch (node.type) {
				case "video":
					return (
						<OffthreadVideo
							src={node.src}
							className="size-full overflow-hidden"
							// muted={node.isMuted} // TODO: Add isMuted to MST VideoNode
							// loop={node.loop} // TODO: Add loop to MST VideoNode
							style={
								{
									// objectFit: node.style.objectFit, // TODO: Add objectFit to MST VideoNode style
									// borderRadius: node.style.borderRadius, // TODO: Add borderRadius to MST VideoNode style
								}
							}
						/>
					);

				case "image":
					return (
						<Img
							src={node.src}
							className="size-full overflow-hidden"
							style={
								{
									// objectFit: node.style.objectFit, // TODO: Add objectFit to MST ImageNode style
									// borderRadius: node.style.borderRadius, // TODO: Add borderRadius to MST ImageNode style
								}
							}
						/>
					);

				case "text":
					return (
						<TextRenderer
							content={node.content}
							style={{
								fontSize: node.style.fontSize,
								// fontFamily: node.style.fontFamily, // TODO: Add fontFamily to MST TextNode style
								// backgroundColor: node.style.backgroundColor, // TODO: Add backgroundColor to MST TextNode style
								// color: node.style.color, // TODO: Add color to MST TextNode style
								// textAlign: node.style.textAlign, // TODO: Add textAlign to MST TextNode style
								// fontStyle: node.style.fontStyle, // TODO: Add fontStyle to MST TextNode style
								// fontWeight: node.style.fontWeight, // TODO: Add fontWeight to MST TextNode style
								// lineHeight: node.style.lineHeightPercent ? `${node.style.lineHeightPercent}%` : undefined, // TODO: Add lineHeightPercent to MST TextNode style
								// textTransform: node.style.casing, // TODO: Add casing to MST TextNode style
								// letterSpacing: node.style.letterSpacing, // TODO: Add letterSpacing to MST TextNode style
							}}
						/>
					);

				// TODO: Add support for these node types when they're implemented in MST:
				// case "audio":
				//   return (
				//     <Audio
				//       pauseWhenBuffering={!inputProps.isBufferingDisabled}
				//       volume={node.volume}
				//       src={node.src}
				//       delayRenderRetries={DELAY_RENDER_RETRIES}
				//       delayRenderTimeoutInMilliseconds={60 * 1000 * 2}
				//     />
				//   );

				// case "frame":
				//   return (
				//     <div
				//       className="size-full"
				//       style={{
				//         borderRadius: node.style.borderRadius,
				//         backgroundColor: node.style.backgroundColor,
				//         background: node.style.background,
				//         backdropFilter: node.style.backgroundBlur ? `blur(${node.style.backgroundBlur}px)` : undefined,
				//         filter: node.style.layerBlur ? `blur(${node.style.layerBlur}px)` : undefined,
				//       }}
				//     >
				//       {node.children?.map((child) => (
				//         <ElementRenderer key={child.id} node={child} inputProps={inputProps} />
				//       ))}
				//     </div>
				//   );

				// case "rectangle":
				//   return (
				//     <div
				//       className="size-full"
				//       style={{
				//         borderRadius: node.style.borderRadius,
				//         backgroundColor: node.style.backgroundColor,
				//         background: node.style.background,
				//         backdropFilter: node.style.backgroundBlur ? `blur(${node.style.backgroundBlur}px)` : undefined,
				//         filter: node.style.layerBlur ? `blur(${node.style.layerBlur}px)` : undefined,
				//       }}
				//     />
				//   );

				// case "waveform":
				//   return (
				//     <ClippingComp {...inputProps} disablePremounting sequenceProps={{}}>
				//       {({ startFromFrame }) => (
				//         <div className="flex size-full items-center justify-center overflow-hidden">
				//           <Audiogram
				//             startFrom={startFromFrame}
				//             audioSrc={inputProps.commonProperties.sermonAudioUrl}
				//             numberOfSamples={256}
				//             node={node}
				//             mirroring={node.mirroringEnabled ?? false}
				//           />
				//         </div>
				//       )}
				//     </ClippingComp>
				//   );

				// case "subtitles":
				//   return (
				//     <ClippingComp {...inputProps} disablePremounting sequenceProps={{}}>
				//       {({ startFromFrame, endFrame, key }) => (
				//         <p
				//           className="size-full"
				//           style={{
				//             textAlign: node.style.textAlign,
				//             fontFamily: node.style.fontFamily,
				//             color: node.style.color,
				//             textTransform: node.style.casing,
				//             backgroundColor: node.style.backgroundColor,
				//             paddingTop: node.style.paddingVertical,
				//             paddingBottom: node.style.paddingVertical,
				//             paddingLeft: node.style.paddingHorizontal,
				//             paddingRight: node.style.paddingHorizontal,
				//             borderRadius: node.style.borderRadius,
				//             lineHeight: `${node.style.lineHeightPercent}%`,
				//           }}
				//           key={key}
				//         >
				//           <SubtitlesAtChunk>
				//             {/* Subtitle rendering logic */}
				//           </SubtitlesAtChunk>
				//         </p>
				//       )}
				//     </ClippingComp>
				//   );

				default:
					return null;
			}
		}, [node, inputProps]);

		return (
			<div
				key={node.id}
				className={cn(
					"absolute z-[100] flex",
					// node.hidden ? "hidden" : "flex", // TODO: Add hidden property to MST Node
					node.type !== "text" && "overflow-hidden",
					// node.type === "text" && "flex items-center justify-center" // Handle text alignment
				)}
				id={getElementDomId(node.id)}
				style={{
					left: node.transforms.left,
					top: node.transforms.top,
					width: node.transforms.width,
					height: node.type === "text" ? "fit-content" : node.transforms.height,
					// opacity: node.style.opacity, // TODO: Add opacity to MST Node style
					// filter: node.style.layerBlur ? `blur(${node.style.layerBlur}px)` : undefined, // TODO: Add layerBlur to MST Node style
					// backdropFilter: node.style.backgroundBlur ? `blur(${node.style.backgroundBlur}px)` : undefined, // TODO: Add backgroundBlur to MST Node style
				}}
			>
				{content}
			</div>
		);
	},
);

NodeRenderer.displayName = "ElementRenderer";
