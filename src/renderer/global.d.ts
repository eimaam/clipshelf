import { IClipboardItem, IClipboardSettings, IPinnedClipboardItem } from "../electron/types/clipboard.types"

export interface IClipshelfAPI {
    clipboard: {
        getAllClips: () => Promise<IClipboardItem[]>
        removeClip: (clipId: string) => Promise<boolean>
        deleteAllClips: () => Promise<boolean>
        hideWindow: () => Promise<void>
        
        getAllPinnedClips: () => Promise<IPinnedClipboardItem[]>
        pinClip: (clipId: string) => Promise<boolean>
        unpinClip: (clipId: string) => Promise<boolean>
        deletePinnedClip: () => Promise<boolean>
        deleteAllPinnedClips: () => Promise<boolean>
        
        onClipsChange: (callback: (clips: IClipboardItem[]) => void) => (() => void)
    },
    settings: {
        getSettings: () => Promise<IClipboardSettings>
        setSettings: <K extends keyof IClipboardSettings>(
            key: K,
            value: IClipboardSettings[K]
        ) => Promise<void>

        onSettingsChange: (callback: (settings: IClipboardSettings) => void) => (() => void)


        // 
        quitApp: () => Promise<void>
    }
}

declare global {
    interface Window {
        clipshelf: IClipshelfAPI
    }
}
