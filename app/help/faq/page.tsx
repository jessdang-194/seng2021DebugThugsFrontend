import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-lavender/30 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
            <span className="text-xl font-bold">ColorFusion</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-custom-purple transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-custom-purple transition-colors">
              About
            </Link>
            <Link href="/help/faq" className="text-sm font-medium text-custom-purple transition-colors">
              FAQ
            </Link>
            <Link href="/help/contact" className="text-sm font-medium hover:text-custom-purple transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button className="bg-custom-coral hover:bg-custom-orange text-white">
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">Find answers to the most common questions about ColorFusion</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">What is ColorFusion?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                ColorFusion is a comprehensive submission management platform that allows users to create, track, and
                manage submissions with an intuitive interface. Our platform is designed to simplify the submission
                process while providing powerful tools for organization and collaboration.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">How do I create a new submission?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                After logging in to your account, navigate to the Submissions section and click on "New Submission."
                Fill out the required information in the form, upload any necessary documents, and click "Submit." Your
                submission will be processed and you'll receive a confirmation with a reference number.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">
                Can I edit a submission after it's been submitted?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, you can edit submissions that haven't been approved yet. Go to the Submissions section, find the
                submission you want to edit, and click "Edit." Make your changes and save them. Note that once a
                submission has been approved, you may need special permissions to make further edits.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">
                What file formats are supported for uploads?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                ColorFusion supports a wide range of file formats including PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, JPG, PNG,
                and many more. The maximum file size for uploads is 25MB per file. If you need to upload larger files,
                please contact our support team for assistance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">How secure is my data on ColorFusion?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We take security very seriously. All data is encrypted both in transit and at rest using
                industry-standard encryption protocols. We implement strict access controls, regular security audits,
                and comply with relevant data protection regulations to ensure your information remains secure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium">
                Can I collaborate with others on submissions?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, ColorFusion offers collaboration features that allow you to share submissions with team members or
                external stakeholders. You can set different permission levels to control who can view, edit, or approve
                submissions. This makes it easy to work together on complex submission projects.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg font-medium">What are the pricing plans?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                ColorFusion offers several pricing tiers to meet different needs. We have a free tier with basic
                features, as well as Professional, Team, and Enterprise plans with additional capabilities. Visit our
                Pricing page for detailed information about features and costs for each plan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg font-medium">
                How do I get support if I have issues?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer multiple support channels. You can access our help documentation, submit a support ticket
                through your account, email us at support@colorfusion.com, or use the live chat feature during business
                hours. Enterprise customers also receive dedicated support representatives.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-lg mb-6">Still have questions?</p>
            <Button className="bg-custom-coral hover:bg-custom-orange text-white">
              <Link href="/help/contact">Contact Support</Link>
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
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
                <span className="text-xl font-bold">ColorFusion</span>
              </div>
              <p className="text-sm text-gray-500">Beautiful color palettes for your next design project.</p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-custom-purple">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6 text-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} ColorFusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

