import { useCallback } from "react";
import { useStore } from "@/features/editor/state";
import type { Node } from "@/features/editor/state/input-props";

interface UseFloatingControlsOptions {
  selectedElement: Node;
}

export function useFloatingControls({
  selectedElement,
}: UseFloatingControlsOptions) {
  const store = useStore();

  // Action handlers using MST actions and store methods
  const handleDeleteElement = useCallback(() => {
    // TODO: Add delete method to MST when available
    // For now, we can remove from the nodes array
    const nodeIndex = store.inputProps.nodes.findIndex(
      (n) => n.id === selectedElement.id
    );
    if (nodeIndex !== -1) {
      store.inputProps.nodes.splice(nodeIndex, 1);
    }
    // Clear selection after deletion
    store.editor.setSelectedElement(null as any);
  }, [store, selectedElement.id]);

  const handleDuplicateElement = useCallback(() => {
    if (!("transforms" in selectedElement)) return;

    // Create a copy with offset position using MST action
    const newNodeData = {
      ...selectedElement,
      transforms: {
        ...selectedElement.transforms,
        left: selectedElement.transforms.left + 10,
        top: selectedElement.transforms.top + 10,
      },
    };

    // Remove the id to let addNode generate a new one
    const { id: _, sequenceDetails: __, ...nodeWithoutId } = newNodeData;
    const newId = store.inputProps.addNode(nodeWithoutId);

    // Select the new element
    const newElement = store.inputProps.nodes.find((n) => n.id === newId);
    if (newElement) {
      store.editor.setSelectedElement(newElement);
    }
  }, [store, selectedElement]);

  const handleSaveElement = useCallback(() => {
    // TODO: Implement save functionality when server API is available
    console.log("Save element:", selectedElement);
  }, [selectedElement]);

  // Layer management - these would need to be implemented in MST
  const handleMoveForward = useCallback(() => {
    // TODO: Implement z-index/layer management in MST store
    console.log("Move forward not yet implemented in MST");
  }, []);

  const handleMoveBackward = useCallback(() => {
    // TODO: Implement z-index/layer management in MST store
    console.log("Move backward not yet implemented in MST");
  }, []);

  const handleBringToFront = useCallback(() => {
    // TODO: Implement z-index/layer management in MST store
    console.log("Bring to front not yet implemented in MST");
  }, []);

  const handleSendToBack = useCallback(() => {
    // TODO: Implement z-index/layer management in MST store
    console.log("Send to back not yet implemented in MST");
  }, []);

  return {
    // Actions
    handleDeleteElement,
    handleDuplicateElement,
    handleSaveElement,
    handleMoveForward,
    handleMoveBackward,
    handleBringToFront,
    handleSendToBack,
    isSaving: false, // TODO: Add loading state when save is implemented
  };
}
