import Navbar from '../components/nav'
import Header from '../components/header'
import DemoVideoSection from '../components/demo-video'
import Footer from '../components/footer'
import FeaturesSection from '../components/features-section'
import Button from '../components/ui/Button'
import Divider from '../components/ui/Divider'

const Home = () => {
    return (
        <div className='w-full px-4'>
            <div className='max-w-7xl mx-auto flex flex-col gap-12'>
                <Navbar />
                <Header />
                <DemoVideoSection />
                <FeaturesSection />
            </div>
            <section className="w-full max-w-[960px] mx-auto px-6 pt-32 text-center">
                <div className="rounded-3xl space-y-6 bg-gradient-to-b from-primary/10 to-transparent p-12 border border-primary/20">
                    <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Ready to upgrade your workflow?</h2>
                    <p className="mt-6 text-sm text-slate-500">
                        Download the latest version for macOS. Compatible with Intel and Apple Silicon.
                    </p>
                    <Button variant='primary' size='lg'>Download ClipShelf</Button>
                </div>
                <Divider className='mt-32' />

            </section>
            <Footer />
        </div>
    )
}

export default Home
