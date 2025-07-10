import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { HoverCardContent } from "@radix-ui/react-hover-card";
import {
	Check,
	ChevronDown,
	ChevronDownIcon,
	Clock,
	CloudCheck,
	Copy,
	CornerUpLeft,
	CornerUpRight,
	Filter,
	Hand,
	HelpCircle,
	History,
	Languages,
	MousePointer2Icon,
	Pencil,
	Search,
	Upload,
	Users,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { OpenEditLogo } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCommandPalette } from "@/features/editor/components/command-palette";

export function Header() {
	const [isHeaderNameDropdownOpen, setIsHeaderNameDropdownOpen] =
		useState(false);
	const [zoomLevel, setZoomLevel] = useState(89);
	const { setIsOpen: setIsCommandPaletteOpen } = useCommandPalette();

	return (
		<div className="flex items-center justify-between border-b bg-background px-4 py-2">
			{/* Left Section */}
			<div className="flex items-center gap-2">
				<div className="flex h-8 w-8 items-center justify-center rounded bg-black font-bold text-white">
					<OpenEditLogo />
				</div>
				<div className="flex h-8 w-8 items-center justify-center">
					<CloudCheck className="h-4 w-4" />
				</div>

				<span className="font-medium">Mohit Yadav's Video - Jun 30, 2025</span>
				<HoverCard
					openDelay={0}
					open={isHeaderNameDropdownOpen}
					onOpenChange={setIsHeaderNameDropdownOpen}
				>
					<DropdownMenu
						modal={false}
						open={isHeaderNameDropdownOpen}
						onOpenChange={(newIsOpen) => {
							setIsHeaderNameDropdownOpen(newIsOpen);
						}}
					>
						<DropdownMenuTrigger className="group">
							<HoverCardTrigger>
								<Button size="sm" variant="ghost" className="h-8 w-8 p-0">
									<ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
								</Button>
							</HoverCardTrigger>
						</DropdownMenuTrigger>
						<HoverCardContent>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<Pencil className="mr-2 h-4 w-4" />
									Rename
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Copy className="mr-2 h-4 w-4" />
									Duplicate Project
								</DropdownMenuItem>
								<DropdownMenuItem>
									<History className="mr-2 h-4 w-4" />
									Version History
								</DropdownMenuItem>
							</DropdownMenuContent>
						</HoverCardContent>
					</DropdownMenu>
				</HoverCard>
			</div>

			{/* Center Section */}
			<div className="flex items-center gap-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button size="sm" variant="ghost" className="h-8 w-8 p-0">
							<MousePointer2Icon className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Move</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button size="sm" variant="ghost" className="h-8 w-8 p-0">
							<Hand className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Hand Tool</TooltipContent>
				</Tooltip>

				{/* Scale Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size="sm" variant="ghost" className="gap-1 px-3">
							<span className="tabular-nums">{zoomLevel.toFixed(0)}%</span>
							<ChevronDown className="h-3 w-3" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-64 p-3">
						{/* Manual Size Control */}
						<div className="mb-4">
							<div className="mb-2 flex items-center justify-between">
								<span className="font-medium text-sm">Size</span>
								<div className="flex items-center gap-2">
									<Input
										type="number"
										value={zoomLevel}
										onChange={(e) => setZoomLevel(Number(e.target.value))}
										className="h-7 w-20 text-xs"
										min="10"
										max="500"
									/>
									<span className="text-muted-foreground text-xs">%</span>
								</div>
							</div>
							<Slider
								value={[zoomLevel]}
								onValueChange={(value) => setZoomLevel(value[0])}
								max={500}
								min={10}
								step={1}
								className="w-full"
							/>
						</div>

						<Separator className="my-2" />

						{/* Zoom Presets */}
						<DropdownMenuItem
							onClick={() => setZoomLevel(100)}
							className="flex justify-between"
						>
							<span>Zoom to fit</span>
							<span className="text-muted-foreground text-xs">⌘ F</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setZoomLevel(50)}
							className="flex justify-between"
						>
							<span>Zoom to 50%</span>
							<span className="text-muted-foreground text-xs">⌘ 0</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setZoomLevel(100)}
							className="flex justify-between"
						>
							<span>Zoom to 100%</span>
							<span className="text-muted-foreground text-xs">⌘ 1</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setZoomLevel(200)}
							className="flex justify-between"
						>
							<span>Zoom to 200%</span>
							<span className="text-muted-foreground text-xs">⌘ 2</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Separator
					orientation="vertical"
					className="data-[orientation=vertical]:h-4"
				/>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button size="sm" variant="ghost" className="h-8 w-8 p-0">
							<CornerUpLeft className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Undo</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button size="sm" variant="ghost" className="h-8 w-8 p-0">
							<CornerUpRight className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Redo</TooltipContent>
				</Tooltip>
			</div>

			{/* Right Section */}
			<div className="flex items-center gap-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="sm"
							variant="ghost"
							className="h-8 w-8 p-0"
							onClick={() => setIsCommandPaletteOpen(true)}
						>
							<Search className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom">Search</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button size="sm" variant="ghost" className="h-8 w-8 p-0">
							<HelpCircle className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom">Help</TooltipContent>
				</Tooltip>
				<Button size="sm" variant="secondary" className="gap-1">
					<Users className="h-4 w-4" />
					Share
				</Button>
				<Popover>
					<PopoverTrigger asChild>
						<Button size="sm">
							<Check className="h-4 w-4" />
							Done
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-96 p-0" align="end">
						<div className="p-6">
							<h3 className="mb-4 font-semibold text-lg">Export Video</h3>

							{/* Video Preview */}
							<div className="mb-4">
								<div className="relative aspect-video rounded-lg bg-black p-4">
									<div className="absolute top-2 right-2 font-bold text-sm text-white">
										VEED
									</div>
								</div>
								<div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm">
									<Clock className="h-4 w-4" />
									00:32
								</div>
							</div>

							{/* Quality Settings */}
							<div className="mb-4">
								<div className="flex items-center justify-between">
									<Button variant="outline" className="flex-1 justify-between">
										Quality Standard
										<ChevronDown className="h-4 w-4" />
									</Button>
									<Button variant="ghost" size="sm" className="ml-2">
										<Filter className="h-4 w-4" />
									</Button>
								</div>
							</div>

							{/* Remove Watermark */}
							<div className="mb-4">
								<Button
									variant="outline"
									className="w-full gap-2 border-orange-200 bg-orange-50 text-orange-700"
								>
									<Zap className="h-4 w-4" />
									Remove Watermark
								</Button>
							</div>

							{/* Export Button */}
							<Button className="mb-4 w-full gap-2 bg-blue-600 hover:bg-blue-700">
								<Upload className="h-4 w-4" />
								Export Video
							</Button>

							{/* AI Dubbing */}
							<Button variant="outline" className="w-full gap-2">
								<Languages className="h-4 w-4" />
								AI Dubbing
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
