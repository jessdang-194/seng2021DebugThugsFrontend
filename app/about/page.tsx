import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-lavender/30 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
            <span className="text-xl font-bold">PayPath</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-custom-purple transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-custom-purple transition-colors">
              About
            </Link>
            <Link href="/help/faq" className="text-sm font-medium hover:text-custom-purple transition-colors">
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
        {/* Hero Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About PayPath</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're on a mission to eliminate the hassle of tax-compliant invoice management for small businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-custom-purple via-custom-brightPurple to-custom-coral opacity-90 z-10"></div>
              <Image src="/placeholder.svg?height=400&width=600" alt="Our team at work" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, PayPath was born from a simple observation: small businesses spend too much time
                struggling with tax compliance and invoice management. Our team of tax experts and developers noticed
                how outdated and complicated most invoice systems were, and we set out to change that.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that small business owners should focus on growing their business, not worrying about tax
                paperwork. That's why we've created an automated solution that ensures every invoice is correctly
                categorized, validated, and reconciled with relevant orders and despatch documents.
              </p>
              <p className="text-gray-600">
                Today, PayPath helps thousands of small businesses manage their invoices with ease, ensuring tax
                compliance while saving them time and reducing errors.
              </p>
            </div>
          </div>
        </section>

        {/* Problem We're Solving Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Problem We're Solving</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Small businesses face significant challenges with tax compliance
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 mb-4">
              Small businesses often struggle with organizing and ensuring their invoices meet compliance standards for
              tax filing. Missing or incorrect tax details, invoice mismatches, and disorganized records can lead to
              penalties, delayed filings, and extra administrative work.
            </p>
            <p className="text-gray-600 mb-4">
              Many small business owners lack the technical knowledge or tools to easily reconcile their invoices with
              orders and despatch records, making tax season a stressful and time-consuming process.
            </p>
            <p className="text-gray-600">
              PayPath simplifies invoice management by providing an automated, structured approach to tax compliance.
              Our program ensures every invoice is correctly categorized, validated, and reconciled with relevant orders
              and despatch documents. With intelligent automation, it minimizes errors, reduces manual effort, and helps
              small business owners stay tax-compliant effortlessly.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Simplicity",
                description: "We believe in making complex tax processes simple and accessible to everyone.",
              },
              {
                title: "Accuracy",
                description:
                  "We ensure every invoice meets compliance standards, minimizing errors and reducing financial risks.",
              },
              {
                title: "Efficiency",
                description:
                  "We build systems that save time, allowing business owners to focus on what matters most - growing their business.",
              },
            ].map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 h-12 w-12 rounded-lg bg-custom-purple/10 flex items-center justify-center text-custom-purple">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">The talented people behind PayPath</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { name: "Abigail Madayag", role: "Team member", bg: "from-custom-purple to-custom-brightPurple" },
                { name: "Ryan Yoon", role: "Team member", bg: "from-custom-brightPurple to-custom-coral" },
                { name: "Jess Dang", role: "Team member", bg: "from-custom-coral to-custom-orange" },
                { name: "Minying Wu", role: "Team member", bg: "from-custom-orange to-custom-purple" },
                { name: "Luke Fisher", role: "Team member", bg: "from-custom-purple to-custom-coral" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className={`mb-4 h-32 w-32 mx-auto rounded-full bg-gradient-to-br ${member.bg}`}></div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose PayPath Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PayPath</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The benefits that make us the right choice for your business
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 mb-4">
              Businesses pay for our product because it saves them time, reduces errors, and ensures compliance with tax
              regulations. By automating invoice management, we eliminate tedious manual work, reduce financial risks,
              and provide businesses with clear financial insights.
            </p>
            <p className="text-gray-600">
              This allows companies to focus on growing their operations rather than dealing with administration.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-custom-purple to-custom-brightPurple text-white rounded-xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of small businesses who have simplified their tax compliance with PayPath.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-custom-purple hover:bg-gray-100">
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <Link href="/help/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
                <span className="text-xl font-bold">PayPath</span>
              </div>
              <p className="text-sm text-gray-500">Simplifying tax compliance for small businesses.</p>
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
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} PayPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
