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
    ipcMain.on(IPC.CLIPS_SUBSCRIBE, event => {
        // unsubscribe because we don't want to keep the event open
        const unsubscribe = ClipboardStore.onChange((clips) => {
            // sending to the renderer process
            event.sender.send(IPC.CLIPS_SUBSCRIBE, clips)
        })

        // unsubscribe when the renderer process is destroyed
        event.sender.once("destroyed", () => {
            unsubscribe()
        })
    })

    // pinned
    ipcMain.handle(IPC.CLIPS_GET_ALL_PINNED, () => {
        return PinnedClipboardStore.getAllPinnedClips()
    })
    ipcMain.handle(IPC.CLIPS_DELETE_PINNED, (_event, id: string) => {
        return PinnedClipboardStore.deletePinned(id)
    })
    ipcMain.handle(IPC.CLIPS_DELETE_ALL_PINNED, () => {
        return PinnedClipboardStore.deleteAllPinned()
    })



    // pinned clips 
    ipcMain.handle(IPC.CLIPS_PIN, (_event, id: string) => {
        return PinnedClipboardStore.pinClip(id)
    })
    ipcMain.handle(IPC.CLIPS_UNPIN, (_event, id: string) => {
        return PinnedClipboardStore.unpinClip(id)
    })
}