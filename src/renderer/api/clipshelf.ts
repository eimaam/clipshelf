import { IClipboardItem, IClipboardSettings } from "../../electron/types/clipboard.types";




export const ClipShelfAPI = {
  clipboard: {
    getAllClips: () => window.clipshelf.clipboard.getAllClips(),
    pinClip: (clipId: string) =>
      window.clipshelf.clipboard.pinClip(clipId),
    unpinClip: (clipId: string) =>
      window.clipshelf.clipboard.unpinClip(clipId),
    removeClip: (clipId: string) =>
      window.clipshelf.clipboard.removeClip(clipId),
    deleteAllClips: () => window.clipshelf.clipboard.deleteAllClips(),
    
    // pinned
    getAllPinnedClips: () => window.clipshelf.clipboard.getAllPinnedClips(),
    deletePinnedClip: () => window.clipshelf.clipboard.deletePinnedClip(),
    deleteAllPinnedClips: () => window.clipshelf.clipboard.deleteAllPinnedClips(),
    
    onClipsChange: (callback: (clips: IClipboardItem[]) => void) =>
      window.clipshelf.clipboard.onClipsChange(callback),
  },

  settings: {
    getSettings: () => window.clipshelf.settings.getSettings(),
    setSetting: <K extends keyof IClipboardSettings>(
      key: K,
      value: IClipboardSettings[K]
    ) => window.clipshelf.settings.setSettings(key, value),
    onSettingsChange: (callback: (settings: IClipboardSettings) => void) => 
    window.clipshelf.settings.onSettingsChange(callback)
  },
}


