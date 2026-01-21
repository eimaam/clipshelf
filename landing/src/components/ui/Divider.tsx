import React from 'react'
import { cn } from '../../lib/utils'

const Divider: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn('w-full my-6 h-0.5 bg-text-muted/20', className)} />


    )
}

export default Divider