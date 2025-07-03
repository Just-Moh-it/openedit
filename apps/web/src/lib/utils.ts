import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function uniqueId() {
	return crypto.randomUUID();
}

export function getElementDomId(elementId: string): string {
	return `element-${elementId}`;
}
