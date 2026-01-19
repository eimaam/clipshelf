import { ipcMain } from "electron"
import { IPC } from "../../shared/ipc.channels"
import { ClipboardStore } from "../store/clipboard.store"
import { PinnedClipboardStore } from "../store/pinned.store"

export const registerClipboardIpc = () => {
    ipcMain.handle(IPC.CLIPS_GET_ALL, () => {
        return ClipboardStore.getAllClips()
    })
    ipcMain.handle(IPC.CLIPS_REMOVE, (_event, id: string) => {
        return ClipboardStore.removeClip(id)
    })



    // pinned clips 
    ipcMain.handle(IPC.CLIPS_PIN, (_event, id: string) => {
        return PinnedClipboardStore.pinClip(id)
    })
    ipcMain.handle(IPC.CLIPS_UNPIN, (_event, id: string) => {
        return PinnedClipboardStore.unpinClip(id)
    })
}