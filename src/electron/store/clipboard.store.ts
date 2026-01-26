import Store from "electron-store"
import { randomUUID } from "crypto"
import { IClipboardItem, IClipboardStore } from "../types/clipboard.types"
import { SettingsStore } from "./settings.store"
import { getClipboardSizeInBytes } from "../utils"


const clipboardItemSchema = {
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
    createdAt: {
        type: "number",
    }
}

const clipboardStoreSchema = {
    clips: {
        type: "array",
        items: {
            type: "object",
            properties: clipboardItemSchema,
            required: ["id", "content", "type", "createdAt"]
        },
        default: []
    }

}


const clipboardStore = new Store<IClipboardStore>({ name: "clipboard", schema: clipboardStoreSchema } as any)

export class ClipboardStore {
    static getAllClips() {
        const clips = clipboardStore.get("clips") as IClipboardItem[] || []
        console.log(`[Store] getAllClips returning ${clips.length} clips`)
        return clips
    }

    static getClipById(clipId: string) {
        if (!clipId || typeof clipId !== "string") return null
        const clip = this.getAllClips().find(clip => clip.id === clipId) as IClipboardItem
        return clip
    }

    static addClip(newClip: IClipboardItem) {
        const settings = SettingsStore.getSettings()
        const now = Date.now()

        // assign defaults if missing
        const clip: IClipboardItem = {
            ...newClip,
            id: newClip.id || randomUUID(),
            createdAt: newClip.createdAt || now,
            type: newClip.type || 'text',
        };

        let clips = this.getAllClips()

        if (!newClip || !newClip.content || !newClip.content.trim) {
            return
        }

        // remove old clips via retention checking..
        const retentionDays = settings.retentionDays
        const retentionTime = retentionDays * 24 * 60 * 60 * 1000 // ms in a day
        clips = clips.filter(clip => (now - clip.createdAt) <= retentionTime)

        // confirm the content of the new clip is not same as the most recent clip > avoid consecutive duplicates
        if (clips.length > 0 && clips[0].content === clip.content) return;

        // insert newest clip at the start
        clips = [clip, ...clips]

        // check if store has reached its max and remove oldest clip
        if (clips.length > settings.maxClips) {
            clips = clips.slice(0, settings.maxClips)
        }

        // add the clip
        clipboardStore.set("clips", clips)

    }

    static getClipboardSize() {
        const clips = this.getAllClips()
        const size = getClipboardSizeInBytes(clips)
        return size
    }

    static removeClip(clipId: string) {
        let clips = this.getAllClips()
        clips = clips.filter((clip) => clip.id !== clipId)
        clipboardStore.set("clips", clips)
    }

    static deleteAllClips() {
        clipboardStore.clear();
    }

    /**
     * calls the callback on any kinda change to the store
     * @param callback 
     */
    static onChange(callback: (clips: IClipboardItem[]) => void) {
        return clipboardStore.onDidAnyChange((newValue) => {
            const { clips } = newValue as IClipboardStore
            callback(clips)
        })
    }

}

