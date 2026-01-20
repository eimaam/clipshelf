import { IClipboardItem, IClipboardSettings } from "../electron/types/clipboard.types"

export interface IClipshelfAPI {
    clipboard: {
        getAllClips: () => Promise<IClipboardItem[]>
        pinClip: (clipId: string) => Promise<boolean>
        unpinClip: (clipId: string) => Promise<boolean>
        removeClip: (clipId: string) => Promise<boolean>
        hideWindow: () => Promise<void>
        onClipsChange: (callback: (clips: IClipboardItem[]) => void) => (() => void)
    },
    settings: {
        getSettings: () => Promise<IClipboardSettings>
        setSettings: <K extends keyof IClipboardSettings>(
            key: K,
            value: IClipboardSettings[K]
        ) => Promise<void>

        // 
        quitApp: () => Promise<void>
    }
}

declare global {
    interface Window {
        clipshelf: IClipshelfAPI
    }
}
