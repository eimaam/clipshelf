import Store from "electron-store"
import { IClipboardSettings } from "../types/clipboard.types"
import { ClipboardStore } from "./clipboard.store"
import { PinnedClipboardStore } from "./pinned.store"


const settingStoreSchema = {
    maxClips: {
        type: "number",
        default: 5000 // mvp def
    },
    launchOnStartup: {
        type: "boolean",
        default: true
    },
    showCopyNotification: {
        type: "boolean",
        default: true
    },
    retentionDays: {
        type: "number",
        default: 7
    },
    globalShortcut: {
        type: "string",
        default: "Command+Shift+C"
    }
}

const settingStore = new Store<IClipboardSettings>({ name: "settings", schema: settingStoreSchema } as any)


export class SettingsStore {
    static getSettings(): IClipboardSettings {
        return settingStore.store
    }

    static getSetting<K extends keyof IClipboardSettings>(key: K): IClipboardSettings[K] {
        return settingStore.get(key)
    }

    static setSettings(settings: IClipboardSettings) {
        return settingStore.set(settings)
    }

    static setSetting<K extends keyof IClipboardSettings>(key: K, value: IClipboardSettings[K]) {
        return settingStore.set(key, value)
    }

    static resetSettings() {
        return settingStore.reset()
    }

    static resetSetting<K extends keyof IClipboardSettings>(key: K) {
        return settingStore.reset(key)
    }

    static getClipboardSize() {
        const clipsSize = ClipboardStore.getClipboardSize()
        const pinnedClipsSize = PinnedClipboardStore.getClipboardSize()
        const totalSize = Number(clipsSize + pinnedClipsSize)
        return totalSize;
    }


    static onChange(callback: (settings: IClipboardSettings) => void) {
        return settingStore.onDidAnyChange((newValue) => {
            callback(newValue as IClipboardSettings)
        })
    }
}