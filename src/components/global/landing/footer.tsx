"use client"

import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-blue-900/30 pt-16 pb-8">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center">
                <Instagram className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-full bg-blue-500 blur-sm -z-10 opacity-50"></div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Yazil
              </span>
            </Link>

            <p className="text-slate-400 mb-6">
              Automate your Instagram DMs, increase engagement, and grow your business with our powerful AI-driven
              platform.
            </p>

            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Release Notes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Legal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Subscribe</h3>
            <p className="text-slate-400 mb-4">Get the latest news and updates from Yazil.</p>

            <div className="flex space-x-2 mb-6">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-slate-900 border-blue-900/50 focus:border-blue-700 text-white"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Subscribe</Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">Cashe@yazil.ai</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">+1 (555) 312-4576</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">473 Social Ave, San Francisco, CA 94107</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Yazil. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
              Cookie Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

