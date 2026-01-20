import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export const copyToClipboard = (text: string) => {
    if (!text || !navigator.clipboard) return
    navigator.clipboard.writeText(text)
}