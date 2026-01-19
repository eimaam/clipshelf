import { app } from "electron"
import { clipboard } from "electron"
import { ClipboardStore } from "../store/clipboard.store"
import { randomUUID } from "crypto"
import { ClipboardContentEnum, ClipboardContentType } from "../types/clipboard.types"

let lastText = ""
export const clipboardListener = () => {
    console.log("started listening for copy events...")
    setInterval(() => {
        const clipboardContent = clipboard.readText()

        if (!clipboardContent || !clipboardContent.trim()) {
            return
        }

        if (clipboardContent === lastText) {
            return
        }

        lastText = clipboardContent

        const clip = {
            id: randomUUID(),
            content: clipboardContent,
            type: ClipboardContentEnum.TEXT,
            createdAt: Date.now(),
        }

        ClipboardStore.addClip(clip)

    }, 500)

    
}