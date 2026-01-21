import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';

const Privacy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="w-full py-4 px-8 border-b border-white/5">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link to="/">
                        <Logo size="sm" />
                    </Link>
                    <Link to="/" className="text-sm text-text-muted hover:text-white transition-colors">
                        Back to Home
                    </Link>
                </div>
            </nav>
            <main className="flex-1 max-w-3xl mx-auto px-6 py-12 prose prose-invert prose-headings:text-slate-200 prose-p:text-slate-400">
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-sm text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-slate-200">1. Local-First Promise</h2>
                    <p>ClipShelf is designed as a local-first application. Your clipboard history, pinned items, and settings are stored locally on your device (specifically in an SQLite database on your Mac).</p>
                    <p>We do not collect, transmit, or store your clipboard content on any external servers. Your data stays on your machine.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-slate-200">2. Data Collection</h2>
                    <p>We do not track your usage, keystrokes, or clipboard contents. The app operates entirely offline regarding your personal data.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-slate-200">3. Updates</h2>
                    <p>The application may check for updates by connecting to our release server (GitHub Releases). This process only involves checking version numbers and does not transmit user data.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
