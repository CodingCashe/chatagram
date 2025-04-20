"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Instagram, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-slate-900/80 backdrop-blur-md border-b border-blue-900/30" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center">
            <Instagram className="h-5 w-5 text-white" />
            <div className="absolute inset-0 rounded-full bg-blue-500 blur-sm -z-10 opacity-50"></div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Yazil
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-slate-300 hover:text-blue-400 transition-colors">
            Features
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-slate-300 hover:text-blue-400 transition-colors">
                Solutions <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900 border-blue-900">
              <DropdownMenuItem className="hover:bg-blue-900/20">For Businesses</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-900/20">For Creators</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-900/20">For Agencies</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="#pricing" className="text-slate-300 hover:text-blue-400 transition-colors">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-slate-300 hover:text-blue-400 transition-colors">
            Testimonials
          </Link>
          <Link href="#faq" className="text-slate-300 hover:text-blue-400 transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-slate-300 hover:text-blue-400 hover:bg-blue-900/20">
          <Link href="/onboarding">Log in</Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Link href="/onboarding/">Get Started</Link></Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300 hover:text-blue-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-blue-900/30"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-slate-300 hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <div className="border-t border-blue-900/30 py-2">
                <p className="text-slate-400 mb-2">Solutions</p>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link
                    href="#solutions-business"
                    className="text-slate-300 hover:text-blue-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    For Businesses
                  </Link>
                  <Link
                    href="#solutions-creators"
                    className="text-slate-300 hover:text-blue-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    For Creators
                  </Link>
                  <Link
                    href="#solutions-agencies"
                    className="text-slate-300 hover:text-blue-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    For Agencies
                  </Link>
                </div>
              </div>
              <Link
                href="#pricing"
                className="text-slate-300 hover:text-blue-400 transition-colors py-2 border-t border-blue-900/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-slate-300 hover:text-blue-400 transition-colors py-2 border-t border-blue-900/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#faq"
                className="text-slate-300 hover:text-blue-400 transition-colors py-2 border-t border-blue-900/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-blue-900/30">
                <Button
                  variant="ghost"
                  className="justify-center text-slate-300 hover:text-blue-400 hover:bg-blue-900/20"
                >
                  <Link href="/onboarding">Log in</Link>
                </Button>
                <Button className="justify-center bg-blue-600 hover:bg-blue-700 text-white"><Link href="/onboarding">Get Started</Link></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

