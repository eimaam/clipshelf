import { useEffect, useCallback, useState } from "react"
import { IClipboardItem } from "../../electron/types/clipboard.types"
import { ClipShelfAPI } from "../api/clipshelf"


export const useClipboardData = () => {
    const [clipboardItems, setClipboardItems] = useState<IClipboardItem[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isSearching, setIsSearching] = useState<boolean>(false)

    const fetchClips = useCallback(async () => {
        try {
            const clips = await ClipShelfAPI.clipboard.getAllClips()
            setClipboardItems(clips || [])
        } catch (
        error
        ) {
            console.error("Failed to fetch clips:", error)
        }
    }, [])


    useEffect(() => {
        fetchClips()

        const unsubscribe = ClipShelfAPI.clipboard.onClipsChange((clips) => {
            setClipboardItems(clips || [])
        })

        return () => {
            unsubscribe?.()
        }
    }, [])


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
        fetchClips,
        handlePin,
        handleUnpin,
        handleDelete,
        searchQuery,
        setSearchQuery,
        isSearching,
        setIsSearching
    }

}