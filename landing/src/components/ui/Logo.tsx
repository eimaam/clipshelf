import React from 'react'
import logo from "../../assets/logo.png"

interface ILogoProps {
    size?: "sm" | "md" | "lg"
    withTitle?: boolean
}

const Logo = ({ size = "md", withTitle = false }: ILogoProps) => {

    const logoSizes = {
        sm: "w-6 h-6 md:w-8 md:h-8",
        md: "w-10 h-10 md:w-12 md:h-12",
        lg: "w-12 h-12 md:w-16 md:h-16",
    }

    return (
        <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className={logoSizes[size]} />
            {withTitle && <p className="text-base md:text-lg font-bold">ClipShelf</p>}
        </div>
    )
}

export default Logo