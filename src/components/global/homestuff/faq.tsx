import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does Chatal automation work?",
    answer: "Chatal uses advanced AI to analyze incoming DMs and provide appropriate responses based on your customized settings and templates. You can create complex workflows to handle various scenarios automatically.",
  },
  {
    question: "Is Chatal compliant with Instagram's policies?",
    answer: "Yes, Chatal is designed to work within Instagram's guidelines. We use official APIs and ensure that our automation respects rate limits and other platform policies.",
  },
  {
    question: "Can I use Chatal with multiple Instagram accounts?",
    answer: "Our Pro plan allows you to manage multiple Instagram accounts from a single dashboard, making it perfect for agencies and businesses with multiple brands.",
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer 24/7 customer support for all our plans. Pro plan users get priority support with faster response times and access to our dedicated account managers.",
  },
]

export default function FAQ() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
      <div className="max-w-3xl text-black mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

