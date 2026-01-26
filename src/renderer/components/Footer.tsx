import { Settings, Bookmark, LogOut } from "lucide-react";
import { cn } from "../lib/utils";
import { TabEnum, TabType } from "../App";
import useSettings from "../hooks/useSettings";

interface FooterProps {
    activeTab: TabType
    onTabChange: (tab: TabType) => void;
}

export function Footer({ activeTab, onTabChange }: FooterProps) {

    const { handleQuitApp } = useSettings()


    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-md">
            {
                activeTab === TabEnum.SETTINGS ?
                    <div className="w-full ">
                        <button
                            onClick={handleQuitApp}
                            type="button"
                            className="ml-auto flex cursor-pointer text-sm font-medium bg-red-800/50 text-red-300 px-2 py-1 rounded-md items-center gap-2 justify-center">
                            <LogOut className="w-3.5 h-3.5" /> Quit ClipShelf
                        </button>
                    </div>
                    :
                    <>
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
                    </>
            }
        </div>
    )
}
