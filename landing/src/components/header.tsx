import Button from './ui/Button'
import { Download } from 'lucide-react'

const Header = () => {
    return (
        <header className='relative mt-6 text-center mx-auto flex flex-col gap-8 items-center justify-center'>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Native Apple Silicon Support
            </div>
            <div className='space-y-10'>
                <div className='max-w-3xl mx-auto'>
                    <h1 className='md:text-7xl text-5xl font-black'>
                        Your clipboard’s short-term memory.
                    </h1>
                </div>
                <p className='text-text-secondary text-lg md:text-xl'>
                                            Instantly recall what you copied - fast, private and local.
                </p>
                <div className='flex md:flex-row flex-col items-center justify-center mx-auto gap-4'>
                    <Button variant="primary" size="lg" className='w-full px-12 md:w-[300px]' fullWidth><Download size={16} className='mr-2' /> Download</Button>
                    <p className='text-text-secondary text-sm md:text-base'>
                        macOS 12.0 or later.
                    </p>
                </div>

            </div>
        </header>
    )
}

export default Header