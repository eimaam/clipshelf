import React from 'react'
import video from "../assets/demo.mov"

const DemoVideoSection = () => {
    return (
        <div className='relative w-full max-w-5xl mx-auto'>
            <div className='absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full opacity-50' />

            <div className='w-full p-2 md:p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl'>
                <div className='w-full h-[300px] md:h-[600px] bg-black/50 rounded-2xl overflow-hidden border border-black/50 shadow-inner'>
                    <video className='w-full h-full object-cover' src={video} autoPlay muted loop playsInline></video>
                </div>
            </div>
        </div>
    )
}

export default DemoVideoSection