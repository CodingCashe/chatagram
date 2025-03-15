"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does Yazil AI work?",
    answer:
      "Yazil uses advanced natural language processing to understand and respond to Instagram DMs. You can train it with your brand voice, product information, and common responses. The AI learns from interactions over time to provide increasingly accurate and personalized responses.",
  },
  {
    question: "Will my followers know they're talking to an AI?",
    answer:
      "No, our AI is designed to sound natural and human-like. It can be customized to match your brand voice and communication style. For transparency, you can choose to disclose that initial responses are automated, but most users report that their followers can't tell the difference.",
  },
  {
    question: "How do I connect my Instagram account?",
    answer:
      "Connecting your Instagram account is simple and secure. After signing up, you'll be guided through our OAuth process which requires you to log in to Instagram and grant Yazil permission to access your messages. We never store your Instagram password.",
  },
  {
    question: "Can I customize the AI responses?",
    answer:
      "You can train the AI with your brand voice, create custom response templates, and set up specific rules for different types of inquiries. You can also review and refine responses over time to improve accuracy.",
  },
  {
    question: "What happens if the AI cant answer a question?",
    answer:
      "You can set up escalation rules for complex inquiries. When the AI encounters a question it can't confidently answer, it can notify you, flag the conversation for human review, or politely inform the user that a team member will follow up shortly.",
  },
  {
    question: "Is my Instagram data secure?",
    answer:
      "Yes, security is our top priority. We use industry-standard encryption, secure OAuth for authentication, and never store Instagram passwords. We only access the data necessary to provide our service, and you can revoke access at any time.",
  },
  {
    question: "Can I use Yazil for multiple Instagram accounts?",
    answer:
      "Yes, our Professional and Enterprise plans support multiple Instagram accounts. You can manage all your accounts from a single dashboard with unified analytics and customized settings for each account.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access until the end of your billing period. We don't offer refunds for partial months, but you're welcome to use the service until your subscription ends.",
  },
]

export default function FaqSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="faq" ref={sectionRef} className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border border-blue-700 rounded-full bg-blue-900/20 text-blue-400 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-slate-300">
              Everything you need to know about Yazil. Cant find the answer youre looking for? Contact our support
              team.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-blue-900/30 rounded-lg bg-slate-900/50 backdrop-blur-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-slate-800/50 text-white hover:text-blue-400 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-slate-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

