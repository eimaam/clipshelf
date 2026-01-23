import { formatDistanceToNow } from "date-fns";
import { Terminal, Link2, FileText, Image, Pin, PinOff, Trash2, Clock } from "lucide-react";
import { cn } from "../lib/utils";
import { IClipboardItem, IPinnedClipboardItem } from "../../electron/types/clipboard.types";

interface ClipboardItemProps {
    item: IClipboardItem | IPinnedClipboardItem;
    isSelected: boolean;
    onClick: () => void;
    onPin: (id: string, e: React.MouseEvent) => void;
    onRemove: (id: string, e: React.MouseEvent) => void;
}

const getIcon = (item: IClipboardItem | IPinnedClipboardItem) => {
    const iconClass = "w-4 h-4";
    switch (item.type) {
        case "text":
            if (item.content.startsWith("npm") || item.content.startsWith("git") || item.content.startsWith("docker")) {
                return <Terminal className={cn(iconClass, "text-zinc-400")} />;
            }
            if (item.content.startsWith("http")) {
                return <Link2 className={cn(iconClass, "text-zinc-400")} />;
            }
            return <FileText className={cn(iconClass, "text-zinc-400")} />;
        case "image":
            return <Image className={cn(iconClass, "text-zinc-400")} />;
        default:
            return <FileText className={cn(iconClass, "text-zinc-400")} />;
    }
};




export function ClipboardItem({ item, isSelected, onClick, onPin, onRemove }: ClipboardItemProps) {



    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent",
                isSelected
                    ? "bg-zinc-800/40 border-zinc-700/50"
                    : "hover:bg-zinc-900/80 border-transparent hover:border-zinc-800"
            )}
        >
            <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-zinc-800",
                isSelected ? "bg-zinc-700/30 border-zinc-700" : "bg-zinc-900/50"
            )}>
                {getIcon(item)}
            </div>

            {/* content */}
            <div className="flex-1 min-w-0 pr-2">
                <p className={cn(
                    "text-[13px] font-medium truncate leading-tight transition-colors",
                    isSelected ? "text-white" : "text-zinc-300"
                )}>
                    {item.content}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                    <Clock className="w-3 h-3 text-zinc-600" />
                    <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-tight">
                        {formatDistanceToNow("createdAt" in item ? item.createdAt : item.pinnedAt, { addSuffix: true })}
                    </span>
                </div>
            </div>

            {/* actions */}
            <div className="flex items-center gap-1 transition-opacity opacity-0 group-hover:opacity-100 pr-1">
                <button
                    onClick={(e) => onPin(item.id, e)}
                    className="p-1.5 hover:bg-zinc-800 rounded-md transition-colors text-zinc-500 hover:text-zinc-200"
                    title="Pin Item"
                >
                    {
                        "pinnedAt" in item ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />
                    }
                </button>
                <button
                    onClick={(e) => onRemove(item.id, e)}
                    className="p-1.5 hover:bg-red-500/10 rounded-md transition-colors text-zinc-500 hover:text-red-400"
                    title="Delete Item"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    )
}
