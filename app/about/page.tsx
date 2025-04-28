import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Translate } from "@/components/translate"
import { LanguageSelector } from "@/components/language-selector"
import { NavHeader } from "@/components/nav-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-lavender/30 via-white to-white">
      {/* Header */}
      <NavHeader />

      <main className="container py-12 md:py-20">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <Translate text="about.hero.title">About PayPath</Translate>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <Translate text="about.hero.subtitle">
                We're on a mission to eliminate the hassle of tax-compliant invoice management for small businesses.
              </Translate>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/small-business-owner.png"
                alt="Small business owner serving a customer during grand opening"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <Translate text="about.story.title">Our Story</Translate>
              </h2>
              <p className="text-gray-600 mb-4">
                <Translate text="about.story.p1">
                  Founded in 2023, PayPath was born from a simple observation: small businesses spend too much time
                  struggling with tax compliance and invoice management. Our team of tax experts and developers noticed
                  how outdated and complicated most invoice systems were, and we set out to change that.
                </Translate>
              </p>
              <p className="text-gray-600 mb-4">
                <Translate text="about.story.p2">
                  We believe that small business owners should focus on growing their business, not worrying about tax
                  paperwork. That's why we've created an automated solution that ensures every invoice is correctly
                  categorized, validated, and reconciled with relevant orders and despatch documents.
                </Translate>
              </p>
              <p className="text-gray-600">
                <Translate text="about.story.p3">
                  Today, PayPath helps thousands of small businesses manage their invoices with ease, ensuring tax
                  compliance while saving them time and reducing errors.
                </Translate>
              </p>
            </div>
          </div>
        </section>

        {/* Problem We're Solving Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <Translate text="about.problem.title">Problem We're Solving</Translate>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <Translate text="about.problem.subtitle">
                Small businesses face significant challenges with tax compliance
              </Translate>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 mb-4">
              <Translate text="about.problem.p1">
                Small businesses often struggle with organizing and ensuring their invoices meet compliance standards
                for tax filing. Missing or incorrect tax details, invoice mismatches, and disorganized records can lead
                to penalties, delayed filings, and extra administrative work.
              </Translate>
            </p>
            <p className="text-gray-600 mb-4">
              <Translate text="about.problem.p2">
                Many small business owners lack the technical knowledge or tools to easily reconcile their invoices with
                orders and despatch records, making tax season a stressful and time-consuming process.
              </Translate>
            </p>
            <p className="text-gray-600">
              <Translate text="about.problem.p3">
                PayPath simplifies invoice management by providing an automated, structured approach to tax compliance.
                Our program ensures every invoice is correctly categorized, validated, and reconciled with relevant
                orders and despatch documents. With intelligent automation, it minimizes errors, reduces manual effort,
                and helps small business owners stay tax-compliant effortlessly.
              </Translate>
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <Translate text="about.values.title">Our Values</Translate>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <Translate text="about.values.subtitle">The principles that guide everything we do</Translate>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "about.values.simplicity.title",
                titleDefault: "Simplicity",
                description: "about.values.simplicity.desc",
                descriptionDefault: "We believe in making complex tax processes simple and accessible to everyone.",
              },
              {
                title: "about.values.accuracy.title",
                titleDefault: "Accuracy",
                description: "about.values.accuracy.desc",
                descriptionDefault:
                  "We ensure every invoice meets compliance standards, minimizing errors and reducing financial risks.",
              },
              {
                title: "about.values.efficiency.title",
                titleDefault: "Efficiency",
                description: "about.values.efficiency.desc",
                descriptionDefault:
                  "We build systems that save time, allowing business owners to focus on what matters most - growing their business.",
              },
            ].map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 h-12 w-12 rounded-lg bg-custom-purple/10 flex items-center justify-center text-custom-purple">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    <Translate text={value.title}>{value.titleDefault}</Translate>
                  </h3>
                  <p className="text-gray-600">
                    <Translate text={value.description}>{value.descriptionDefault}</Translate>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <Translate text="about.team.title">Meet Our Team</Translate>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <Translate text="about.team.subtitle">The talented people behind PayPath</Translate>
            </p>
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
            <h2 className="text-3xl font-bold mb-4">
              <Translate text="about.why.title">Why Choose PayPath</Translate>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <Translate text="about.why.subtitle">
                The benefits that make us the right choice for your business
              </Translate>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 mb-4">
              <Translate text="about.why.p1">
                Businesses pay for our product because it saves them time, reduces errors, and ensures compliance with
                tax regulations. By automating invoice management, we eliminate tedious manual work, reduce financial
                risks, and provide businesses with clear financial insights.
              </Translate>
            </p>
            <p className="text-gray-600">
              <Translate text="about.why.p2">
                This allows companies to focus on growing their operations rather than dealing with administration.
              </Translate>
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-custom-purple to-custom-brightPurple text-white rounded-xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              <Translate text="home.cta.title">Ready to Get Started?</Translate>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              <Translate text="home.cta.subtitle">
                Join thousands of small businesses who have simplified their tax compliance with PayPath.
              </Translate>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-custom-purple hover:bg-gray-100">
                <Link href="/signup">
                  <Translate text="common.signup">Sign Up Now</Translate>
                </Link>
              </Button>
              <Button className="bg-custom-orange text-black hover:bg-custom-orange/90">
                <Link href="/help/contact">
                  <Translate text="common.contact">Contact Sales</Translate>
                </Link>
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
                <Image
                  src="/images/paypath-logo.png"
                  alt="PayPath Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
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
            <div>
              <LanguageSelector variant="footer" />
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
