import { Trash2, X } from "lucide-react"
import { TabEnum, TabType } from "../App"

interface IHeaderProps {
    onDeleteAll: () => void
    view: TabType
    onTabChange: (tab: TabType) => void;
}
export function Header({ onDeleteAll, view, onTabChange }: IHeaderProps) {
    
    
    return (
        <div className="flex items-center justify-between px-1 mb-3">
            <div className="flex items-baseline gap-1">
                <div className="flex items-center gap-2">
                    <h1 className="text-xs font-bold tracking-tight text-white uppercase">
                        Clipshelf
                    </h1>
                    <span className="text-[10px] mt-1 font-medium text-zinc-600">v1.0.0</span>
                </div>
                <span className="text-sm tracking-tight font-normal uppercase">
                    | {view === TabEnum.SETTINGS ? "SETTINGS" : view === "recent" ? "RECENT Clips" : "PINNED Clips"}
                </span>
            </div>
            {/* action button -- delete/reset store (recent/pinned clips) x close button (in settings view) */}
            {
                view === TabEnum.SETTINGS ?
                    <button
                        onClick={() => onTabChange(TabEnum.RECENT)}
                        type="button"
                        className="text-zinc-600 cursor-pointer bg-zinc-800/90 p-1 hover:text-red-500 transition-colors"
                        title="Close Settings"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    :
                    <button
                        onClick={() => {
                            if (window.confirm("Are you sure you want to clear all clips?")) {
                                onDeleteAll()
                            }
                        }}
                        title="Clear Clipboard"
                        className="text-zinc-600 hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
            }
        </div>
    )
}
