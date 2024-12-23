import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2563EB] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Instagram DMs?</h2>
        <p className="text-xl mb-8">Join thousands of satisfied users and take your Instagram engagement to the next level.</p>
        <Button size="lg" className="bg-white text-[#2563EB] hover:bg-gray-100">
        <Link href="/dashboard">Get Started</Link> <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}

