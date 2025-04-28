import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Translate } from "@/components/translate"
import { NavHeader } from "@/components/nav-header"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-lavender/30 via-white to-white">
      {/* Header */}
      <NavHeader />

      <main className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <Translate text="faq.title">Frequently Asked Questions</Translate>
            </h1>
            <p className="text-lg text-gray-600">
              <Translate text="faq.subtitle">Find answers to the most common questions about PayPath</Translate>
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="text-lg font-medium">
                  <Translate text="faq.what_is_paypath.question">What is PayPath?</Translate>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  <Translate text="faq.what_is_paypath.answer">
                    PayPath is a comprehensive submission management platform that allows users to create, track, and
                    manage submissions with an intuitive interface. Our platform is designed to simplify the submission
                    process while providing powerful tools for organization and collaboration.
                  </Translate>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <span className="text-lg font-medium">
                  <Translate text="faq.create_submission.question">How do I create a new submission?</Translate>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  <Translate text="faq.create_submission.answer">
                    After logging in to your account, navigate to the Submissions section and click on "New Submission."
                    Fill out the required information in the form, upload any necessary documents, and click "Submit."
                    Your submission will be processed and you'll receive a confirmation with a reference number.
                  </Translate>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <span className="text-lg font-medium">
                  <Translate text="faq.edit_submission.question">
                    Can I edit a submission after it's been submitted?
                  </Translate>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  <Translate text="faq.edit_submission.answer">
                    Yes, you can edit submissions that haven't been approved yet. Go to the Submissions section, find
                    the submission you want to edit, and click "Edit." Make your changes and save them. Note that once a
                    submission has been approved, you may need special permissions to make further edits.
                  </Translate>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                <span className="text-lg font-medium">
                  <Translate text="faq.file_formats.question">What file formats are supported for uploads?</Translate>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  <Translate text="faq.file_formats.answer">
                    PayPath supports a wide range of file formats including PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, JPG, PNG,
                    and many more. The maximum file size for uploads is 25MB per file. If you need to upload larger
                    files, please contact our support team for assistance.
                  </Translate>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                <span className="text-lg font-medium">
                  <Translate text="faq.data_security.question">How secure is my data on PayPath?</Translate>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  <Translate text="faq.data_security.answer">
                    We take security very seriously. All data is encrypted both in transit and at rest using
                    industry-standard encryption protocols. We implement strict access controls, regular security
                    audits, and comply with relevant data protection regulations to ensure your information remains
                    secure.
                  </Translate>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                <span className="text-lg font-medium">
                  <Translate text="faq.collaboration.question">Can I collaborate with others on submissions?</Translate>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  <Translate text="faq.collaboration.answer">
                    Yes, PayPath offers collaboration features that allow you to share submissions with team members or
                    external stakeholders. You can set different permission levels to control who can view, edit, or
                    approve submissions. This makes it easy to work together on complex submission projects.
                  </Translate>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>
                <span className="text-lg font-medium">
                  <Translate text="faq.pricing.question">What are the pricing plans?</Translate>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  <Translate text="faq.pricing.answer">
                    PayPath offers several pricing tiers to meet different needs. We have a free tier with basic
                    features, as well as Professional, Team, and Enterprise plans with additional capabilities. Visit
                    our Pricing page for detailed information about features and costs for each plan.
                  </Translate>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>
                <span className="text-lg font-medium">
                  <Translate text="faq.support.question">How do I get support if I have issues?</Translate>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  <Translate text="faq.support.answer">
                    We offer multiple support channels. You can access our help documentation, submit a support ticket
                    through your account, email us at support@paypath.com, or use the live chat feature during business
                    hours. Enterprise customers also receive dedicated support representatives.
                  </Translate>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 text-center">
            <div className="text-xl font-semibold mb-4">
              <Translate text="faq.still_have_questions">Still have questions?</Translate>
            </div>
            <Button className="bg-custom-coral hover:bg-custom-orange text-white">
              <Link href="/help/contact">
                <Translate text="faq.contact_support">Contact Support</Translate>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/paypath-logo.png"
                  alt="PayPath Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="text-xl font-bold">PayPath</span>
              </div>
              <p className="text-sm text-gray-500">
                <Translate text="footer.tagline">Simplifying tax compliance for small businesses.</Translate>
              </p>
            </div>
            <div>
              <div className="font-medium mb-4">
                <Translate text="footer.product">Product</Translate>
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-custom-purple">
                    <Translate text="common.about">About</Translate>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    <Translate text="footer.features">Features</Translate>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-4">
                <Translate text="footer.support">Support</Translate>
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help/contact" className="text-gray-500 hover:text-custom-purple">
                    <Translate text="common.contact">Contact</Translate>
                  </Link>
                </li>
                <li>
                  <Link href="/help/faq" className="text-gray-500 hover:text-custom-purple">
                    <Translate text="common.faq">FAQ</Translate>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-4">
                <Translate text="footer.legal">Legal</Translate>
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    <Translate text="footer.privacy">Privacy</Translate>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              <Translate text="footer.copyright" values={{ year: new Date().getFullYear() }}>
                &copy; {new Date().getFullYear()} PayPath. All rights reserved.
              </Translate>
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="https://twitter.com" className="text-gray-500 hover:text-custom-purple">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="https://www.instagram.com" className="text-gray-500 hover:text-custom-purple">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="https://github.com/" className="text-gray-500 hover:text-custom-purple">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
