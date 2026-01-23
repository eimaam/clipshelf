import { Trash2 } from "lucide-react"
import { TabType } from "../App"

interface IHeaderProps {
    onDeleteAll: () => void
    view: TabType
}
export function Header({ onDeleteAll, view }: IHeaderProps) {
    return (
        <div className="flex items-center justify-between px-1 mb-3">
            <div className="flex items-baseline gap-1">
                <div className="flex items-center gap-2">

                <h1 className="text-sm font-bold tracking-tight text-white uppercase">ClipShelf</h1>
                <span className="text-[10px] mt-1 font-medium text-zinc-600">v1.0.0</span>
                </div>
                <span className="text-sm">
                   | {view === "recent" ? "RECENT" : "PINNED"} Clips
                </span>
            </div>
            {/* reset button to clear all */}
            <button
                onClick={() => {
                    if (window.confirm("Are you sure you want to clear all clips?")) {
                        onDeleteAll()
                    }
                }}
                className="text-zinc-600 hover:text-red-500 transition-colors"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}
