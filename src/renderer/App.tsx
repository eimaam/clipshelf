import { useState } from 'react'
import { Header } from './components/Header'
import { ClipboardItem } from './components/ClipboardItem'
import { Footer } from './components/Footer'
import { ClipShelfAPI } from './api/clipshelf'
import { copyToClipboard } from './lib/utils'
import { useClipboardData } from './hooks/useClips'
import { Search } from 'lucide-react'
import Settings from './components/Settings'


export type TabType = "recent" | "pinned" | "settings"

export const TabEnum = {
  RECENT: "recent",
  PINNED: "pinned",
  SETTINGS: "settings"
} as const


function App() {

  const {
    clipboardItems,
    pinnedClipboardItems,
    handlePin,
    handleDelete,
    handleUnpin,
    searchQuery,
    setSearchQuery,
    searchClips
  } = useClipboardData()

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<TabType>(TabEnum.RECENT)

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }

  const handlePinUnpin = (clipId: string, e: React.MouseEvent) => {
    // if we on pinned tab, then aim is to unpin else on recent, try pin item
    if (activeTab === TabEnum.PINNED) {
      handleUnpin(clipId, e)
      return
    }
    handlePin(clipId, e)
  }

  const getClipboardItems = () => activeTab === TabEnum.RECENT ? clipboardItems : pinnedClipboardItems


  // // Keyboard Navigation
  // const handleKeyDown = useCallback(async (e: KeyboardEvent) => {
  //   if (e.key === "ArrowDown") {
  //     e.preventDefault()
  //     setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1))
  //   } else if (e.key === "ArrowUp") {
  //     e.preventDefault()
  //     setSelectedIndex(prev => Math.max(prev - 1, 0))
  //   } else if (e.key === "Enter") {
  //     e.preventDefault()

  //   } else if (e.key === "Escape") {
  //     e.preventDefault()
  //     if (window.clipshelf?.clipboard?.hideWindow) {
  //       await window.clipshelf.clipboard.hideWindow()
  //     }
  //   }
  // }, [filteredItems, selectedIndex])


  const handleSearch = (q: string) => {
    setSearchQuery(q)
  }

  // main clip list
  const filteredClips = searchClips(getClipboardItems(), searchQuery)


  // delete action handler
  const handleDeleteAll = () => {
    activeTab === TabEnum.RECENT ? ClipShelfAPI.clipboard.deleteAllClips() : ClipShelfAPI.clipboard.deleteAllPinnedClips()
  }

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown)
  //   return () => window.removeEventListener("keydown", handleKeyDown)
  // }, [handleKeyDown])

  return (
    <main className="h-screen flex flex-col overflow-hidden bg-background">
      <div className="flex-1 flex flex-col overflow-hidden px-4 pt-4 pb-2">

        {/* Header */}
        <Header view={activeTab} onDeleteAll={handleDeleteAll} />

        {/* search */}
        <div className="relative group mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-zinc-400 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              handleSearch(e.target.value)
            }}
            placeholder="Search history..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700 focus:bg-zinc-900/50 transition-all placeholder:text-zinc-600"
            autoFocus
          />
        </div>

        {/* List */}
        {
          activeTab === TabEnum.SETTINGS
            ?
            <Settings />

            :
            <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 scroll-smooth">
              {filteredClips.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-3 pt-10">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                    <span className="text-xl">📭</span>
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-medium text-zinc-400">
                      {searchQuery
                        ?
                        "No matches found"
                        :
                        `Your ${activeTab} shelf is empty`
                      }
                    </p>
                    <p className="text-[11px] text-zinc-600 mt-1">
                      {searchQuery
                        ? "Try a different search term"
                        :
                        `${activeTab === TabEnum.PINNED ? "Pin" : "Copy"} something to start!`
                      }
                    </p>
                  </div>
                </div>
              ) : (
                filteredClips.map((clip, index) => (
                  <ClipboardItem
                    key={clip.id}
                    item={clip}
                    isSelected={index === selectedIndex}
                    onClick={() => copyToClipboard(clip.content)}
                    onPin={handlePinUnpin}
                    onRemove={handleDelete}
                  />
                ))
              )}
            </div>
        }
      </div>

      <Footer activeTab={activeTab} onTabChange={handleTabChange} />
    </main>
  )
}

export default App
