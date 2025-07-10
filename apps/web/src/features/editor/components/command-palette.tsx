"use client";

import { Command } from "cmdk";
import {
	BrainIcon,
	CheckIcon,
	ClockIcon,
	CopyIcon,
	EditIcon,
	EyeIcon,
	FileTextIcon,
	FlipHorizontalIcon,
	FlipVerticalIcon,
	LayersIcon,
	PaletteIcon,
	PaperclipIcon,
	PenToolIcon,
	RefreshCwIcon,
	RotateCcwIcon,
	RotateCwIcon,
	SearchIcon,
	SparklesIcon,
	TrashIcon,
	TypeIcon,
	WrenchIcon,
	ZapIcon,
} from "lucide-react";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Badge } from "@/components/ui/badge";
import {
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/features/editor/state";

interface CommandPaletteProps {
	collapsed?: boolean;
}

type CommandPalettePath = "root";

const CommandPaletteContext = React.createContext<{
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
	isOpen: false,
	setIsOpen: () => {},
});

export function CommandPaletteProvider({
	children,
}: React.PropsWithChildren<CommandPaletteProps>) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<CommandPaletteContext.Provider
			value={{
				isOpen,
				setIsOpen,
			}}
		>
			{children}
		</CommandPaletteContext.Provider>
	);
}

export function useCommandPalette() {
	const context = React.useContext(CommandPaletteContext);
	return {
		...context,
	};
}

interface CommandItemData {
	id: string;
	label: string;
	icon: React.ComponentType<any>;
	shortcut?: string;
	action?: () => void;
	disabled?: boolean;
}

const suggestionCommands: CommandItemData[] = [
	{
		id: "first-draft",
		label: "Create first draft",
		icon: FileTextIcon,
		shortcut: "⌘⇧D",
	},
	{
		id: "rewrite-this",
		label: "Rewrite this section",
		icon: RefreshCwIcon,
		shortcut: "⌘⇧R",
	},
	{
		id: "improve-clarity",
		label: "Improve clarity",
		icon: SparklesIcon,
		shortcut: "⌘⇧C",
	},
	{
		id: "make-concise",
		label: "Make more concise",
		icon: ZapIcon,
		shortcut: "⌘⇧M",
	},
	{
		id: "expand-detail",
		label: "Expand with details",
		icon: LayersIcon,
		shortcut: "⌘⇧E",
	},
	{
		id: "fix-grammar",
		label: "Fix grammar",
		icon: EditIcon,
		shortcut: "⌘⇧G",
	},
	{
		id: "change-tone",
		label: "Change tone",
		icon: TypeIcon,
		shortcut: "⌘⇧T",
	},
	{
		id: "add-examples",
		label: "Add examples",
		icon: PaperclipIcon,
		shortcut: "⌘⇧X",
	},
	{
		id: "summarize",
		label: "Summarize content",
		icon: ClockIcon,
		shortcut: "⌘⇧S",
	},
	{
		id: "translate",
		label: "Translate text",
		icon: BrainIcon,
		shortcut: "⌘⇧L",
	},
];

const actionCommands: CommandItemData[] = [
	{
		id: "delete",
		label: "Delete selected",
		icon: TrashIcon,
		shortcut: "⌫",
	},
	{
		id: "duplicate",
		label: "Duplicate selected",
		icon: CopyIcon,
		shortcut: "⌘D",
	},
	{
		id: "outline-stroke",
		label: "Add outline stroke",
		icon: PenToolIcon,
		shortcut: "⌘⇧O",
	},
	{
		id: "rotate-left",
		label: "Rotate left",
		icon: RotateCcwIcon,
		shortcut: "⌘[",
	},
	{
		id: "rotate-right",
		label: "Rotate right",
		icon: RotateCwIcon,
		shortcut: "⌘]",
	},
	{
		id: "flip-horizontal",
		label: "Flip horizontal",
		icon: FlipHorizontalIcon,
		shortcut: "⌘⇧H",
	},
	{
		id: "flip-vertical",
		label: "Flip vertical",
		icon: FlipVerticalIcon,
		shortcut: "⌘⇧V",
	},
	{
		id: "change-theme",
		label: "Change theme",
		icon: PaletteIcon,
		shortcut: "⌘⇧P",
	},
];

const propertyCommands: CommandItemData[] = [
	{
		id: "hide-timeline",
		label: "Hide timeline",
		icon: EyeIcon,
		shortcut: "⌘⇧T",
	},
	{
		id: "show-grid",
		label: "Show grid",
		icon: LayersIcon,
		shortcut: "⌘'",
	},
	{
		id: "snap-to-grid",
		label: "Snap to grid",
		icon: WrenchIcon,
		shortcut: "⌘⇧;",
	},
];

export function CommandPalette() {
	const { isOpen, setIsOpen } = useCommandPalette();
	const [commandValue, setCommandValue] = React.useState("");
	const [commandInput, setCommandInput] = React.useState("");
	const [isSuggestionsExpanded, setIsSuggestionsExpanded] =
		React.useState(false);

	useHotkeys("meta+k", () => setIsOpen((prev) => !prev), {
		enabled: true,
		enableOnFormTags: true,
	});

	React.useEffect(() => {
		if (!isOpen) setIsSuggestionsExpanded(false);
	}, [isOpen]);

	const handleDialogOpenChange = React.useCallback(
		(open: boolean) => {
			setIsOpen(open);
		},
		[setIsOpen],
	);

	const handleToggleSuggestions = React.useCallback(() => {
		setIsSuggestionsExpanded((prev) => !prev);
	}, []);

	const handleCommandSelect = React.useCallback(
		(commandId: string) => {
			console.log("Command selected:", commandId);
			// Handle command execution here
			setIsOpen(false);
		},
		[setIsOpen],
	);

	const visibleSuggestions = isSuggestionsExpanded
		? suggestionCommands
		: suggestionCommands.slice(0, 4);

	return (
		<Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
			<DialogHeader className="sr-only">
				<DialogTitle>Command Palette</DialogTitle>
				<DialogDescription>Search for a command to run...</DialogDescription>
			</DialogHeader>
			<DialogContent
				className="!max-w-2xl overflow-hidden p-0"
				showCloseButton={false}
			>
				<Command
					className="h-full w-full min-w-0 bg-background"
					onValueChange={setCommandValue}
					value={commandValue}
				>
					<div className="flex h-14 items-center gap-3 border-b px-5">
						<Command.Input
							placeholder="Type a command or search..."
							className="flex-1 bg-transparent placeholder-muted-foreground outline-none"
							value={commandInput}
							onValueChange={setCommandInput}
						/>
						<SearchIcon className="size-5 text-muted-foreground" />
					</div>

					<CommandList className="max-h-[400px]">
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup
							className="group"
							heading={
								<div className="flex items-center justify-between">
									<span className="text-sm">Suggestions</span>
									{commandInput.length === 0 && (
										<button
											type="button"
											className="cursor-pointer text-xs transition-colors hover:text-primary"
											onClick={handleToggleSuggestions}
										>
											{isSuggestionsExpanded ? "Show Less" : "Show All"}
										</button>
									)}
								</div>
							}
						>
							{visibleSuggestions.map((command) => (
								<CommandItem
									key={command.id}
									onSelect={() => handleCommandSelect(command.id)}
									className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3"
								>
									<div className="flex items-center gap-3">
										<command.icon className="size-4 text-muted-foreground" />
										<span className="truncate">{command.label}</span>
									</div>
									{command.shortcut && (
										<Badge variant="secondary" className="text-xs">
											{command.shortcut}
										</Badge>
									)}
								</CommandItem>
							))}
						</CommandGroup>

						<CommandGroup heading="Actions">
							{actionCommands.map((command) => (
								<CommandItem
									key={command.id}
									onSelect={() => handleCommandSelect(command.id)}
									className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3"
									disabled={command.disabled}
								>
									<div className="flex items-center gap-3">
										<command.icon className="size-4 text-muted-foreground" />
										<span className="truncate">{command.label}</span>
									</div>
									{command.shortcut && (
										<Badge variant="secondary" className="text-xs">
											{command.shortcut}
										</Badge>
									)}
								</CommandItem>
							))}
						</CommandGroup>

						<CommandGroup heading="Properties">
							{propertyCommands.map((command) => (
								<CommandItem
									key={command.id}
									onSelect={() => handleCommandSelect(command.id)}
									className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3"
								>
									<div className="flex items-center gap-3">
										<command.icon className="size-4 text-muted-foreground" />
										<span className="truncate">{command.label}</span>
										<CheckIcon className="ml-2 size-3 text-green-500" />
									</div>
									{command.shortcut && (
										<Badge variant="secondary" className="text-xs">
											{command.shortcut}
										</Badge>
									)}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
}
