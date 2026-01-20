import Store from "electron-store"
import { randomUUID } from "crypto"
import { IClipboardItem, IClipboardStore } from "../types/clipboard.types"
import { SettingsStore } from "./settings.store"


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
    }

}


const clipboardStore = new Store<IClipboardStore>({ schema: clipboardStoreSchema } as any)

export class ClipboardStore {
    static getAllClips() {
        return clipboardStore.get("clips") as IClipboardItem[] || []
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

        console.log("new clip added ==>", clip.content?.slice(0, 100))
    }

    static removeClip(clipId: string) {
        let clips = this.getAllClips()
        clips = clips.filter((clip) => clip.id !== clipId)
        clipboardStore.set("clips", clips)
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

