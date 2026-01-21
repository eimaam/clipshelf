import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface IFeatureCard {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, className }: IFeatureCard) => {
    return (
        <div className={cn('group transition-all hover:-translate-y-1 duration-300 p-4 rounded-2xl flex flex-col gap-4', className)}>
            <div className='w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300'>
                <Icon className="w-6 h-6 text-slate-300 group-hover:text-primary transition-colors duration-300" />
            </div>
            <div>
                <h4 className='text-slate-200 text-lg tracking-tight font-semibold mb-2'>{title}</h4>
                <p className='text-sm leading-relaxed text-slate-400 font-medium'>{description}</p>
            </div>
        </div>
    )
}


const FeatureCardBg = ({ icon: Icon, title, description, className }: IFeatureCard) => {
    return (
        <div className={cn('group bg-surface hover:bg-surface-hover border border-white/5 hover:border-white/10 transition-all duration-300 p-6 rounded-2xl flex flex-col gap-4', className)}>
            <Icon className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors" />
            <div>
                <h4 className='text-slate-200 text-lg tracking-tight font-bold mb-2'>{title}</h4>
                <p className='text-sm leading-relaxed text-slate-400 font-medium'>{description}</p>
            </div>
        </div>
    )
}

export { FeatureCard, FeatureCardBg }