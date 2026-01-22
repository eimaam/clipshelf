
export type ClipboardContentType = "text" | "image"  // image to be added later.. MVp text only

export const ClipboardContentEnum = {
    TEXT: "text",
    IMAGE: "image"
} as const

export interface IClipboardItem {
    id: string,
    content: string,
    type: ClipboardContentType,
    createdAt: number, // unix ms
}

export interface IClipboardStore {
    clips: IClipboardItem[]
}


export interface IClipboardSettings {
    maxClips: number
    launchOnStartup: boolean
    showCopyNotification: boolean;
    retentionDays: number; // default 7
    globalShortcut: string; // e.g. "command+shift+c"
}

export interface IPinnedClipboardItem extends Omit<IClipboardItem, 'createdAt'> {
    pinnedAt: number
}

export interface IPinnedStore {
    pinnedClips: IPinnedClipboardItem[]
}