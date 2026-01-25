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

    return { settings, clipboardSize, handleQuitApp }
}

export default useSettings