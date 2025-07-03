import type { Instance } from "mobx-state-tree";
import { createContext } from "react";
import type { Store } from "@/features/editor/state";

type RootStore = Instance<typeof Store>;

export const MSTContext = createContext<RootStore | null>(null);

export const MSTContextProvider = MSTContext.Provider;
