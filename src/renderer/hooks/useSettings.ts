import { useCallback, useEffect, useState } from "react"
import { IClipboardSettings } from "../../electron/types/clipboard.types"
import { ClipShelfAPI } from "../api/clipshelf"
import { formatBytes } from "../lib/utils"


const useSettings = () => {
    const [settings, setSettings] = useState<IClipboardSettings | null>(null)
    const [clipboardSize, setClipboardSize] = useState<number>(0)

    const getSettings = useCallback(async () => {

        try {
            const settings = await ClipShelfAPI.settings.getSettings()
            const clipboardSize = await ClipShelfAPI.settings.getClipboardSize()
            setClipboardSize(clipboardSize)
            setSettings(settings)
        } catch (error) {
            console.error("There was a problem fetching settings:", error)
        }

    }, [])

    const handleQuitApp = () => {
        window && window.confirm("Are you sure you want to quit ClipShelf?")
        ClipShelfAPI.quitApp()
    }

    useEffect(() => {
        getSettings()

        const unsubscribe = ClipShelfAPI.settings.onSettingsChange((settings) => {
            console.log(`[useSettings] onClipsChange: received ${settings}`)
            setSettings(settings || {})
        })

        return () => {
            unsubscribe?.()
        }

    }, [])

    const updateSetting = async <K extends keyof IClipboardSettings>(key: K, value: IClipboardSettings[K]) => {
        console.log({ key, value })
        try {
            await ClipShelfAPI.settings.setSetting(key, value)
            // Optimistic update or wait for listener?
            // The listener should trigger a re-render, but we can also update local state if needed faster
            // For now rely on listener for single source of truth
        } catch (error) {
            console.error(`Failed to update setting ${key}:`, error)
        }
    }

    const clearAllClips = async () => {
        if (window.confirm("Are you sure you want to clear all clipboard history? This cannot be undone.")) {
            try {
                await ClipShelfAPI.clipboard.deleteAllClips()
                // Update size immediately if possible, though listener might also handle it?
                // Settings store listener doesn't listen to clipboard size changes directly usually,
                // but let's re-fetch size
                const size = await ClipShelfAPI.settings.getClipboardSize()
                setClipboardSize(size)
            } catch (error) {
                console.error("Failed to clear clips:", error)
            }
        }
    }

    return { settings, clipboardSize, handleQuitApp, updateSetting, clearAllClips }
}

export default useSettings