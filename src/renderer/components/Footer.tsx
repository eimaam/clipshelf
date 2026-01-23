import { Settings, Bookmark } from "lucide-react";
import { cn } from "../lib/utils";
import { TabEnum, TabType } from "../App";

interface FooterProps {
    activeTab: TabType
    onTabChange: (tab: TabType) => void;
}

export function Footer({ activeTab, onTabChange }: FooterProps) {
    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-md">
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onTabChange(activeTab === TabEnum.RECENT ? TabEnum.PINNED : TabEnum.RECENT)}
                    className={cn(
                        "p-2 rounded-lg transition-all text-zinc-500 hover:bg-zinc-900 hover:text-white",
                        activeTab === "pinned" && "text-brand bg-brand/10"
                    )}
                    title={activeTab === "pinned" ? "Show Recent" : "Show Pinned"}
                >
                    <Bookmark className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center gap-1">
                <button
                    className="p-2 rounded-lg transition-all text-zinc-500 hover:bg-zinc-900 hover:text-white"
                    title="Settings"
                    onClick={() => onTabChange(TabEnum.SETTINGS)}
                >
                    <Settings className="w-4 h-4" 
                    />
                </button>
            </div>
        </div>
    )
}
