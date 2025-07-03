import { Composition, getInputProps } from "remotion";
import { FPS } from "@/features/editor/lib/constants";
import {
  InputPropsFromStore,
  type SavedInputProps,
} from "@/features/editor/state/input-props";
import { ROOT_COMPOSITION_ID } from "@/lib/constants";
import { RootComposition } from "@/lib/remotion/composition/composition";

export const savedDefaultProps = InputPropsFromStore.create({
  nodes: [],
  aspectRatio: "16:9",
  version: 1,
});

const inputProps = InputPropsFromStore.create(getInputProps<SavedInputProps>());

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={ROOT_COMPOSITION_ID}
      durationInFrames={inputProps.durationInFrames}
      fps={FPS}
      width={inputProps.dimensions.width}
      height={inputProps.dimensions.height}
      component={RootComposition}
      defaultProps={{ inputProps: inputProps }}
    />
  );
};
