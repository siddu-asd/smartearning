import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black/60 backdrop-blur-lg border-t border-card-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-gradient mb-4 block">
              Elevate
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              We build premium, high-performance websites and digital experiences that elevate your business.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Fb
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Tw
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Ig
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                In
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>+91 8096749003</li>
              <li>hello@elevate.digital</li>
              <li>India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-card-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Elevate Digital. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
