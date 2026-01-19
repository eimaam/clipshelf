import electron from "electron"
import { ipcRenderer } from "electron"
import { IPC } from "../shared/ipc.channels"
import { IClipboardSettings } from "./types/clipboard.types"

electron.contextBridge.exposeInMainWorld("clipshelf", {
    clipboard: {
        getAllClips: () => {
            return ipcRenderer.invoke(IPC.CLIPS_GET_ALL)
        },
        pinClip: (id: string) => {
            return ipcRenderer.invoke(IPC.CLIPS_PIN, id)
        },
        unpinClip: (id: string) => {
            return ipcRenderer.invoke(IPC.CLIPS_UNPIN, id)
        },
        removeClip: (id: string) => {
            return ipcRenderer.invoke(IPC.CLIPS_REMOVE, id)
        }
    },
    settings: {
        getSettings: () => {
            return ipcRenderer.invoke(IPC.SETTINGS_GET)
        },
        setSettings: (key: keyof IClipboardSettings, value: IClipboardSettings[keyof IClipboardSettings]) => {
            return ipcRenderer.invoke(IPC.SETTINGS_SET, key, value)
        }
    }
})