import Button from "./ui/Button"
import Logo from "./ui/Logo"


const navLinks = [
  { title: "Features", href: "#features" },
]


const Navbar = () => {



  return (
    <nav className="bg-secondary/80 backdrop-blur-md sm:w-full w-[90%] md:w-2/4 mx-auto py-2 md:py-3 rounded-2xl shadow-lg sticky left-0 right-0 top-4 flex items-center justify-between px-4 z-50">
      <Logo size="sm" />
      <div className="flex items-center gap-4">
        {navLinks.map((link) => (
          <a key={link.title} href={link.href} className="hover:text-white/70! text-sm">
            {link.title}
          </a>
        ))}
        <Button variant="primary" size="sm">
          Download
        </Button>
      </div>
    </nav>
  )
}

export default Navbar