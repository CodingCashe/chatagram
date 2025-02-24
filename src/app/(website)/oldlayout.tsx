'use client'

import { Inter } from 'next/font/google'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import ParticleBackground from '@/components/global/homestuff/particle-background'
import { LogoSmall } from '@/svgs/logo-small'
import Link from 'next/link'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <html lang="en">
      <head>
        <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
        <script type="importmap" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            imports: {
              "three": "https://unpkg.com/three@0.151.3/build/three.module.js",
              "three/examples/jsm/controls/OrbitControls": "https://unpkg.com/three@0.151.3/examples/jsm/controls/OrbitControls.js"
            }
          })
        }} />
      </head>
      <body className={inter.className}>
        <ParticleBackground />
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-0">
              <LogoSmall />
            </div>
            <nav className={`md:block ${isMenuOpen ? 'block' : 'hidden'}`}>
              <ul className="flex space-x-8">
                <li><Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Features</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</Link></li>
              </ul>
            </nav>
            <Button className="md:hidden" variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
