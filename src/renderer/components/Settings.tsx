import React from 'react'
import useSettings from '../hooks/useSettings'
import { Power } from 'lucide-react'

const Settings = () => {

    const { settings, handleQuitApp } = useSettings()

    console.log({ settings })

    return (
        <div className='space-y-6'>
            <div>
                Settings...
            </div>
            <button className='bg-red-500 py-2 px-6 w-full rounded-md text-center flex gap-4 items-center text-base'
                onClick={handleQuitApp}
            >
                <Power size={12} /> Quit App
            </button>
        </div>
    )
}

export default Settings