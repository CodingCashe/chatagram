import { Inter } from 'next/font/google'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import ParticleBackground from '@/components/global/homestuff/particle-background'
import {LogoSmall} from '@/svgs/logo-small'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chatal - Instagram DM Automation',
  description: 'Automate your Instagram DMs with Chatal. Boost engagement and save time.',
}

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</a></li>
              </ul>
            </nav>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}

