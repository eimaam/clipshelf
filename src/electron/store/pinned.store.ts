import Store from "electron-store"
import { IPinnedClipboardItem, IPinnedStore } from "../types/clipboard.types"
import { ClipboardStore } from "./clipboard.store"


const pinnedClipboardItemSchema = {
    id: {
        type: "string",
    },
    content: {
        type: "string"
    },
    type: {
        type: "string",
        enum: ["text", "image"],
    },
    pinnedAt: {
        type: "number",
    }
}

const pinnedStoreSchema = {
    pinnedClips: {
        type: "array",
        items: {
            type: "object",
            properties: pinnedClipboardItemSchema,
            required: ["id", "content", "type", "pinnedAt"]
        },
    }

}


const pinnedStore = new Store<IPinnedStore>({ schema: pinnedStoreSchema } as any)

export class PinnedClipboardStore {
    static getAllPinnedClips() {
        return pinnedStore.get("pinnedClips") as IPinnedClipboardItem[] || []
    }

    static pinClip(clipId: string) {
        console.log("pinning a clip")
        const now = Date.now()
        // get the clip from the clipboardStore
        const clip = ClipboardStore.getClipById(clipId)

        if (!clip) {
            return
        }

        // check if already pinned
        const pinnedClips = this.getAllPinnedClips() as IPinnedClipboardItem[]
        if (pinnedClips.find(p => p.id === clipId)) {
            console.log("clip already pinned")
            return
        }

        // assign defaults if missing
        const newPinnedClip: IPinnedClipboardItem = {
            ...clip,
            pinnedAt: now,
        };

        let clips = pinnedClips

        // insert newest clip at the start
        clips = [newPinnedClip, ...clips]

        // add the clip
        pinnedStore.set("pinnedClips", clips)
    }

    static unpinClip(clipId: string) {
        let clips = this.getAllPinnedClips() as IPinnedClipboardItem[]
        clips = clips.filter((clip) => clip.id !== clipId)
        pinnedStore.set("pinnedClips", clips)
    }

    // same thingy as unpinning but here to separate deleting normal clipboard item delete and a pinned
    static deletePinned(clipId: string) {
        let clips = this.getAllPinnedClips() as IPinnedClipboardItem[]
        clips = clips.filter((clip) => clip.id !== clipId)
        pinnedStore.set("pinnedClips", clips)
    }

    static deleteAllPinned() {
        pinnedStore.clear()
    }

    /**
     * calls the callback on any kinda change to the store
     * @param callback 
     */
    static onChange(callback: (clips: IPinnedClipboardItem[]) => void) {
        pinnedStore.onDidAnyChange((newValue) => {
            if (newValue && 'pinnedClips' in newValue) {

                callback(newValue.pinnedClips as IPinnedClipboardItem[])
            }
        })
    }

}

