import { Store } from "@/features/editor/state";
import { MSTContextProvider } from "@/features/editor/state/context";
import type { SavedInputProps } from "@/features/editor/state/input-props";

export const StoreProvider = ({
  children,
  savedInputProps,
}: {
  children: React.ReactNode;
  savedInputProps: SavedInputProps;
}) => {
  const store = Store.create({
    inputProps: savedInputProps,
  });

  return <MSTContextProvider value={store}>{children}</MSTContextProvider>;
};
