import Store from "electron-store"
import { IClipboardSettings } from "../types/clipboard.types"


const settingStoreSchema = {
    maxClips: {
        type: "number",
        default: 1000 // mvp def
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

const settingStore = new Store<IClipboardSettings>({ schema: settingStoreSchema } as any)


export class SettingsStore {
    static getSettings() :IClipboardSettings{
        return settingStore.store
    }

    static getSetting<K extends keyof IClipboardSettings>(key: K): IClipboardSettings[K] {
        return settingStore.get(key)
    }

    static setSettings(settings: IClipboardSettings) {
        return settingStore.set(settings)
    }

    static setSetting<K extends keyof IClipboardSettings>(key: K, value: IClipboardSettings[K]) {
        settingStore.set(key, value)
    }

    static resetSettings() {
        settingStore.reset()
    }

    static resetSetting<K extends keyof IClipboardSettings>(key: K) {
        settingStore.reset(key)
    }


    static onChange(callback: (settings: IClipboardSettings) => void) {
        settingStore.onDidAnyChange((newValue) => {
            callback(newValue as IClipboardSettings)
        })
    }
}