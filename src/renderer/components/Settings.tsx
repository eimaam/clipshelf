import { Bell, Keyboard, Monitor, Power, Trash2 } from 'lucide-react'
import React from 'react'
import useSettings from '../hooks/useSettings'
import { formatBytes } from '../lib/utils'

const Settings = () => {

    const { settings, clipboardSize, handleQuitApp, updateSetting, clearAllClips } = useSettings()

    if (!settings) return null

    return (
        <div className='py-4 space-y-6'>
            {/* General Section */}
            {/* TODO: reenable if ever need be... commenting out for now, users shouldn't change  */}
            {/* for copy notif... notifs on every copy sounds dumb dumb, its meant to be a silent util app */}
            <section>
                {/* <h3 className='text-zinc-400 mb-3 text-xs font-bold uppercase tracking-wider'>
                    General
                </h3> */}
                <div className='space-y-4'>
                    {/* launch on start */}
                    {/* <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-zinc-800/60 p-2 rounded-lg'>
                                <Power size={18} className='text-zinc-400' />
                            </div>
                            <div>
                                <h4 className='font-medium text-sm text-zinc-200'>Launch on Startup</h4>
                                <p className='text-xs text-zinc-500'>
                                    Automatically start ClipShelf when you login.
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.launchOnStartup}
                                onChange={(e) => updateSetting('launchOnStartup', e.target.checked)}
                            />
                            <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                        </label>
                    </div> */}

                    {/* notif on copy */}
                    {/* <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-zinc-800/60 p-2 rounded-lg'>
                                <Bell size={18} className='text-zinc-400' />
                            </div>
                            <div>
                                <h4 className='font-medium text-sm text-zinc-200'>Notifications</h4>
                                <p className='text-xs text-zinc-500'>
                                    Show a notification when you copy text.
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.showCopyNotification}
                                onChange={(e) => updateSetting('showCopyNotification', e.target.checked)}
                            />
                            <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                        </label>
                    </div> */}
                </div>
            </section>

            {/* Workflow Section */}
            <section>
                <h3 className='text-zinc-400 mb-3 text-xs font-bold uppercase tracking-wider'>
                    Workflow
                </h3>
                <div className='space-y-4'>
                    {/* Global Shortcut */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-zinc-800/60 p-2 rounded-lg'>
                                <Keyboard size={18} className='text-zinc-400' />
                            </div>
                            <div>
                                <h4 className='font-medium text-sm text-zinc-200'>Global Shortcut</h4>
                                <p className='text-xs text-zinc-500'>
                                    Hotkey to check history (Requires Restart).
                                </p>
                            </div>
                        </div>
                        <div className='relative'>
                            <input
                                type='text'
                                value={settings.globalShortcut}
                                onChange={(e) => updateSetting('globalShortcut', e.target.value)}
                                className='bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded px-2 py-1 w-32 focus:outline-none focus:border-brand text-center font-mono'
                            />
                        </div>
                    </div>

                    {/* max clips */}
                    {/* <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-zinc-800/60 p-2 rounded-lg'>
                                <Monitor size={18} className='text-zinc-400' />
                            </div>
                            <div>
                                <h4 className='font-medium text-sm text-zinc-200'>Maximum Clips</h4>
                                <p className='text-xs text-zinc-500'>
                                    Limit the number of saved clips.
                                </p>
                            </div>
                        </div>
                        <input
                            type='number'
                            value={settings.maxClips}
                            onChange={(e) => updateSetting('maxClips', Number(e.target.value))}
                            className='bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded px-2 py-1 w-20 focus:outline-none focus:border-brand text-right'
                        />
                    </div> */}
                </div>
            </section>

            {/* Data Management Section */}
            <section>
                <h3 className='text-zinc-400 mb-3 text-xs font-bold uppercase tracking-wider'>
                    Data Management
                </h3>
                <div className='space-y-4'>
                    {/* Retention Period */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-zinc-800/60 p-2 rounded-lg'>
                                <Trash2 size={18} className='text-zinc-400' />
                            </div>
                            <div>
                                <h4 className='font-medium text-sm text-zinc-200'>Retention Period</h4>
                                <p className='text-xs text-zinc-500'>
                                    Auto-delete clips older than...
                                </p>
                            </div>
                        </div>
                        <select
                            value={settings.retentionDays}
                            onChange={(e) => updateSetting('retentionDays', Number(e.target.value))}
                            className='bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded px-2 py-1 focus:outline-none focus:border-brand'
                        >
                            <option value={1}>1 Day</option>
                            <option value={7}>7 Days</option>
                            <option value={30}>30 Days</option>
                            <option value={365}>1 Year</option>
                            <option value={99999}>Forever</option>
                        </select>
                    </div>

                    {/* Clear History */}
                    <div className='flex items-center justify-between p-3 bg-red-500/5 border border-red-500/20 rounded-lg'>
                        <div>
                            <h4 className='font-medium text-sm text-red-400'>Clear History</h4>
                            <p className='text-xs text-red-500/70 mt-0.5'>
                                Current Size: <span className='font-mono font-bold'>{formatBytes(clipboardSize)}</span>
                            </p>
                        </div>
                        <button
                            onClick={clearAllClips}
                            className='px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-medium rounded border border-red-500/20 transition-colors'
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Settings