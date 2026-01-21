import { Mail } from "lucide-react"
import { Link } from 'react-router-dom'
import Logo from './ui/Logo'
import Divider from './ui/Divider'

const Footer = () => {
    return (
        <footer className='w-full text-text-secondary mt-24'>
            <div className='space-y-5 mx-auto text-center'>
                <h4 className='font-bold text-2xl text-white'>
                    Get in touch
                </h4>
                <div>
                    <div className='flex flex-col gap-4'>
                        <p className='text-sm'>
                            Have a question about functionality or feature requests? <br />
                            Would love to hear from you. Reach out directly via email
                        </p>
                        <div className='flex justify-center items-center gap-2'>
                            <Mail />
                            <h5 className='text-white'>
                                techflairhq@gmail.com
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* divider */}
            <Divider />
            <div className='mt-8 flex justify-between items-center text-sm'>
                <div className='flex flex-col  gap-2'>
                    <Logo size="sm" withTitle />
                    <p className='text-white'>
                        &copy; {new Date().getFullYear()} ClipShelf. All rights reserved.
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <Link to="/privacy" className="hover:text-primary transition-colors">
                        Privacy Policy
                    </Link>
                </div>
            </div>

        </footer>
    )
}

export default Footer