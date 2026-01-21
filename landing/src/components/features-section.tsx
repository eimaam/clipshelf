import type { LucideIcon } from 'lucide-react';
import { Command, Keyboard, Pin, Zap, ShieldPlus, HeartIcon, Rocket, Cpu } from 'lucide-react';
import Divider from './ui/Divider';
import { FeatureCard, FeatureCardBg } from './feature-card';



const FEATURES: { title: string; description: string; icon: LucideIcon }[] = [
    {
        title: "Speed first",
        description: "Keyboard-driven, global shortcuts and instant search. Optimized for professional users who value every millisecond.",
        icon: Command,
    },
    {
        title: "Private & Local",
        description: "No cloud, no tracking, no accounts. Your data never leaves your Mac. A utility that respects your sovereignty!",
        icon: ShieldPlus,
    },
    {
        title: "Smart Memory",
        description: "Auto-expiring history with 7 pinned slots for your most-used clips. Keep only what matters, lose the clutter.",
        icon: Pin,
    },
    {
        title: "Instant",
        description: "Zero lag search and paste for your workflow.",
        icon: Zap,
    },
    {
        title: "Private",
        description: "Your data never leaves your local disk.",
        icon: ShieldPlus,
    },
    {
        title: "Local-First",
        description: "No servers. No sync. Just a local SQLite database that you own completely.",
        icon: Cpu,
    },
    {
        title: "Lightning Fast",
        description: "Written with native APIs. Minimal CPU and RAM footprint.",
        icon: Rocket,
    },
    {
        title: "Stealth Mode",
        description: "Stays in your menu bar or pops up with a shortcut. Never in your way.",
        icon: HeartIcon,
    }
]


const FeaturesSection = () => {
    return (
        <div id="features" className='w-full my-12 space-y-24'>
            <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-24'>
                {
                    FEATURES.slice(0, 3).map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))
                }
            </div>

            <Divider />

            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-32'>
                <div className='space-y-6'>
                    <h3 className='text-slate-200 text-3xl md:text-4xl tracking-tight font-bold'>Built for focus.</h3>
                    <p className='text-base md:text-lg text-slate-400 font-medium leading-relaxed max-w-md'>
                        ClipShelf is a tiny clipboard memory tool I built for myself. It remembers your recent copies so you can paste them instantly anywhere. No accounts, no cloud, no distractions.
                    </p>
                </div>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    {
                        FEATURES.slice(3, 5).map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))
                    }
                </div>
            </div>

            <Divider />

            <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-32'>
                {
                    FEATURES.slice(5).map((feature, index) => (
                        <FeatureCardBg key={index} {...feature} />
                    ))
                }
            </div>
        </div>
    )
}

export default FeaturesSection