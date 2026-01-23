import electron from "electron"
import { ipcRenderer } from "electron"
import { IPC } from "../shared/ipc.channels"
import { IClipboardItem, IClipboardSettings } from "./types/clipboard.types"

electron.contextBridge.exposeInMainWorld("clipshelf", {
    clipboard: {
        getAllClips: () => {
            return ipcRenderer.invoke(IPC.CLIPS_GET_ALL)
        },
        
        removeClip: (id: string) => {
            return ipcRenderer.invoke(IPC.CLIPS_REMOVE, id)
        },
        deleteAllClips: () => {
            return ipcRenderer.invoke(IPC.CLIPS_DELETE_ALL)
        },
        onClipsChange: (callback: (clips: IClipboardItem[]) => void): (() => void) => {
            const listener = (_event: any, clips: IClipboardItem[]) => callback(clips)
            ipcRenderer.on(IPC.CLIPS_SUBSCRIBE, listener)

            // if not started already, signal the main process to send signal
            ipcRenderer.send(IPC.CLIPS_SUBSCRIBE)

            // Return a cleanup function so the renderer can stop listening
            return () => {
                ipcRenderer.removeListener(IPC.CLIPS_SUBSCRIBE, listener)
            }
        },

        // pinned clips
        pinClip: (id: string) => {
            return ipcRenderer.invoke(IPC.CLIPS_PIN, id)
        },
        unpinClip: (id: string) => {
            return ipcRenderer.invoke(IPC.CLIPS_UNPIN, id)
        },
        getAllPinnedClips: () => {
            return ipcRenderer.invoke(IPC.CLIPS_GET_ALL_PINNED)
        },
        deletePinnedClip: () => {
            return ipcRenderer.invoke(IPC.CLIPS_DELETE_PINNED)
        },
        deleteAllPinnedClips: () => {
            return ipcRenderer.invoke(IPC.CLIPS_DELETE_ALL_PINNED)
        }
    },
    settings: {
        getSettings: () => {
            return ipcRenderer.invoke(IPC.SETTINGS_GET)
        },
        setSettings: (key: keyof IClipboardSettings, value: IClipboardSettings[keyof IClipboardSettings]) => {
            return ipcRenderer.invoke(IPC.SETTINGS_SET, key, value)
        },
        onSettingsChange: (callback: (settings: IClipboardSettings) => void): (() => void) => {
            const listener = (_event: any, settings: IClipboardSettings) => callback(settings)
            ipcRenderer.on(IPC.SETTINGS_SUBSCRIBE, listener)

            ipcRenderer.send(IPC.SETTINGS_SUBSCRIBE)

            return () => {
                ipcRenderer.removeListener(IPC.SETTINGS_SUBSCRIBE, listener)
            }
        },
        // 
        quitApp: () => {
            return ipcRenderer.invoke(IPC.APP_QUIT)
        }
    }
})