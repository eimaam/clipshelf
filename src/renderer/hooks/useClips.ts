import { useEffect, useCallback, useState } from "react"
import { IClipboardItem, IPinnedClipboardItem } from "../../electron/types/clipboard.types"
import { ClipShelfAPI } from "../api/clipshelf"


export const useClipboardData = () => {
    const [clipboardItems, setClipboardItems] = useState<IClipboardItem[]>([])
    const [pinnedClipboardItems, setPinnedClipboardItems] = useState<IPinnedClipboardItem[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isSearching, setIsSearching] = useState<boolean>(false)

    const fetchClips = useCallback(async () => {
        try {
            const clips = await ClipShelfAPI.clipboard.getAllClips()
            const pinnedItems = await ClipShelfAPI.clipboard.getAllPinnedClips()
            console.log(`[useClips] fetchClips: ${clips?.length} clips, ${pinnedItems?.length} pinned`)
            setClipboardItems(clips || [])
            setPinnedClipboardItems(pinnedItems || [])
        } catch (
        error
        ) {
            console.error("Failed to fetch clips:", error)
        }
    }, [])


    useEffect(() => {
        fetchClips()

        const unsubscribe = ClipShelfAPI.clipboard.onClipsChange((clips) => {
            console.log(`[useClips] onClipsChange: received ${clips?.length} clips`)
            setClipboardItems(clips || [])
        })

        return () => {
            unsubscribe?.()
        }
    }, [])

    const searchClips = (clips: (IClipboardItem | IPinnedClipboardItem)[], query: string): (IClipboardItem | IPinnedClipboardItem)[] => {
        if (!query.trim()) return clips

        const q = query.toLowerCase()

        return clips.filter((clip) => {
            const text = clip.content.toLowerCase();
            return text.includes(q);
        })
    }


    const handlePin = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        await ClipShelfAPI.clipboard.pinClip(id)
        fetchClips()
    }

    const handleUnpin = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        await ClipShelfAPI.clipboard.unpinClip(id)
        fetchClips()
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        await ClipShelfAPI.clipboard.removeClip(id)
        fetchClips()
    }


    return {
        clipboardItems,
        pinnedClipboardItems,
        fetchClips,
        handlePin,
        handleUnpin,
        handleDelete,
        searchQuery,
        setSearchQuery,
        isSearching,
        setIsSearching,
        searchClips
    }

}