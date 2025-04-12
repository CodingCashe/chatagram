import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/providers/theme-provider"
import { Particles } from "@/components/ui/particles"
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"
import { Loader2 } from "lucide-react"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Onboarding | Yazil",
  description: "Complete your profile and get started with dm automation",
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Particles className="absolute inset-0" quantity={300} staticity={30} />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />

        {/* Glowing lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Content container */}
        <div className="relative z-10 flex min-h-screen">
          {/* Left sidebar with brand elements */}
          <div className="hidden lg:flex w-1/3 bg-black/30 backdrop-blur-xl flex-col justify-between p-8 border-r border-white/10">
            <div>
              <div className="flex items-center space-x-2 mb-12">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Y</span>
                </div>
                <h1 className={cn("text-2xl font-bold text-white", montserrat.className)}>Yazil</h1>
              </div>

              <h2 className={cn("text-3xl font-bold text-white mb-4", montserrat.className)}>
                Welcome to the future of collaboration
              </h2>
              <p className="text-gray-300 mb-6">
                Complete your profile to unlock the full potential of our platform. We&apos;re excited to have you on board.
              </p>

              {/* Testimonial */}
              <div className="mt-12 bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-300 italic mb-4">
                  &ldquo;This platform transformed how our team works together. The onboarding was smooth and the features are
                  incredible.&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400"></div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Lady Cashe</p>
                    <p className="text-gray-400 text-sm">Product Manager, Vavi Crotchets Ltd</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-gray-400 text-sm">
              <p>© 2025 Yazil. All rights reserved.</p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Help
                </a>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Animated progress bar at the top */}
            <div className="h-1 bg-gray-800 w-full">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-shimmer"></div>
            </div>

            <main className="flex-1 p-6 md:p-10 flex items-center justify-center">
              <div className="w-full max-w-3xl bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-[600px]">
                      <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                      <span className="ml-2 text-white">Loading your experience...</span>
                    </div>
                  }
                >
                  {children}
                </Suspense>
              </div>
            </main>

            {/* Floating help button */}
            <div className="fixed bottom-6 right-6 z-50">
              <button className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full py-2 px-4 text-white transition-all duration-300 border border-white/10 hover:border-white/30">
                <span className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">?</span>
                <span className="hidden group-hover:inline">Need help?</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
