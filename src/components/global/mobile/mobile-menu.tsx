'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MenuIcon, X } from 'lucide-react'
import Link from 'next/link'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu}>
        {isOpen ? <X /> : <MenuIcon />}
      </Button>
      {isOpen && (
        <div className="absolute top-25 left-20 right-20 bg-slate-900 p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="#features" className="text-blue-200 hover:text-white" onClick={toggleMenu}>Features</Link>
            <Link href="#pricing" className="text-blue-200 hover:text-white" onClick={toggleMenu}>Pricing</Link>
            <Link href="#about" className="text-blue-200 hover:text-white" onClick={toggleMenu}>About</Link>
            <Link href="#services" className="text-blue-200 hover:text-white" onClick={toggleMenu}>Services</Link>
            <Link href="/privacy" className="text-blue-200 hover:text-white" onClick={toggleMenu}>Privacy Policy</Link>
          </nav>
        </div>
      )}
    </div>
  )
}

