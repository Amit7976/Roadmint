import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import faqs from "@/utils/constants/faqs"


export default function FAQ() {
    return (
        <section className="max-w-5xl px-4 py-12 mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                <p className="mt-2 text-neutral-400 max-w-xl mx-auto">
                    Answers to the most common questions about the app, learning pace, and features.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-2">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="bg-neutral-800 rounded-lg py-2 px-5 border-0">
                        <AccordionTrigger className="text-left text-lg text-white hover:text-neutral-300 hover:no-underline cursor-pointer">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-400">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}
