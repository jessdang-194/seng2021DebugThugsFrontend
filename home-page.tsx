"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Menu, Star, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { LanguageSelector } from "@/components/language-selector"
import { Translate } from "@/components/translate"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
            <span className="text-xl font-bold">PayPath</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-custom-purple transition-colors">
              <Translate text="common.home">Home</Translate>
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-custom-purple transition-colors">
              <Translate text="common.about">About</Translate>
            </Link>
            <Link href="/help/faq" className="text-sm font-medium hover:text-custom-purple transition-colors">
              <Translate text="common.faq">FAQ</Translate>
            </Link>
            <Link href="/help/contact" className="text-sm font-medium hover:text-custom-purple transition-colors">
              <Translate text="common.contact">Contact</Translate>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <Button
              variant="outline"
              className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
            >
              <Link href="/login">
                <Translate text="common.login">Log in</Translate>
              </Link>
            </Button>
            <Button className="bg-custom-coral hover:bg-custom-orange text-white">
              <Link href="/signup">
                <Translate text="common.signup">Sign up</Translate>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 px-6 bg-white absolute w-full">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium text-custom-purple transition-colors">
                <Translate text="common.home">Home</Translate>
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-custom-purple transition-colors">
                <Translate text="common.about">About</Translate>
              </Link>
              <Link href="/help/faq" className="text-sm font-medium hover:text-custom-purple transition-colors">
                <Translate text="common.faq">FAQ</Translate>
              </Link>
              <Link href="/help/contact" className="text-sm font-medium hover:text-custom-purple transition-colors">
                <Translate text="common.contact">Contact</Translate>
              </Link>
              <div className="py-2">
                <LanguageSelector />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white w-full"
                >
                  <Link href="/login" className="w-full">
                    <Translate text="common.login">Log in</Translate>
                  </Link>
                </Button>
                <Button className="bg-custom-coral hover:bg-custom-orange text-white w-full">
                  <Link href="/signup" className="w-full">
                    <Translate text="common.signup">Sign up</Translate>
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-custom-lavender via-white to-white py-20 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,124,242,0.15),transparent)]"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-white/80 px-3 py-1 text-sm shadow-sm backdrop-blur-sm border border-custom-lavender/30 w-fit">
                  <span className="text-custom-brightPurple font-medium">Introducing PayPath</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  <Translate text="home.hero.title">
                    Streamline Your Payments with <span className="text-custom-purple">PayPath</span>
                  </Translate>
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  <Translate text="home.hero.subtitle">
                    The all-in-one solution for automated tax-compliant invoice management. We help small businesses
                    eliminate the hassle of tax paperwork.
                  </Translate>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="bg-custom-coral hover:bg-custom-orange text-white">
                    <Link href="/signup">
                      <Translate text="common.getStarted">Get Started</Translate>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
                  >
                    <Translate text="common.learnMore">Learn More</Translate>
                  </Button>
                </div>
              </div>
              <div className="relative h-[350px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-custom-purple via-custom-brightPurple to-custom-coral opacity-90 z-10"></div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Colorful abstract design"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10 z-20"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-30">
                  <div className="flex items-center gap-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-custom-coral text-custom-coral" />
                      ))}
                    </div>
                    <div className="text-sm font-medium">Trusted by 5,000+ businesses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-custom-lavender/20 px-3 py-1 text-sm">
                  <span className="text-custom-purple font-medium">Features</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  <Translate text="home.features.title">Everything You Need</Translate>
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  <Translate text="home.features.subtitle">
                    Our platform provides all the tools you need to streamline your invoice management and ensure tax
                    compliance.
                  </Translate>
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "Invoice Compliance & Validation",
                  description:
                    "Automatically validate invoices against tax regulations. Highlights errors and suggests auto-fixes for country-specific tax rules.",
                  color: "bg-custom-purple",
                },
                {
                  title: "Analytics Dashboard",
                  description:
                    "Track sales, overdue payments, and tax filing deadlines. Get clear overviews of monthly sales volume, delayed shipments, and payments due.",
                  color: "bg-custom-brightPurple",
                },
                {
                  title: "Tax-Ready Reports",
                  description:
                    "Generate monthly reports on sales, payments, and shipments. Export tax-ready PDF and CSV reports for accountants or direct filing.",
                  color: "bg-custom-coral",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center text-white mb-4`}
                    >
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-custom-lavender/20 px-3 py-1 text-sm">
                  <span className="text-custom-purple font-medium">
                    <Translate text="home.pricing.title">Pricing</Translate>
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  <Translate text="home.pricing.title">Simple, Transparent Pricing</Translate>
                </h2>
                <p className="max-w-[700px] text-gray-600 mx-auto">
                  <Translate text="home.pricing.subtitle">
                    Choose the plan that works best for your business needs.
                  </Translate>
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:max-w-3xl lg:mx-auto">
              <Card className="border-none shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 h-1 bg-gradient-to-r from-custom-purple to-custom-brightPurple"></div>
                <CardHeader className="pt-6">
                  <CardTitle>
                    <Translate text="home.pricing.free">Freemium</Translate>
                  </CardTitle>
                  <div className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-4xl font-bold tracking-tight">$0</span>
                    <span className="ml-1 text-xl font-semibold">
                      <Translate text="home.pricing.perMonth">/month</Translate>
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="mt-6 space-y-3">
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-custom-purple" />
                      <span>Up to 10 transactions per month</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-custom-purple" />
                      <span>Basic invoice validation</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-custom-purple" />
                      <span>Simple reporting</span>
                    </li>
                  </ul>
                  <Button className="mt-8 w-full bg-custom-purple hover:bg-custom-brightPurple text-white">
                    <Translate text="common.getStarted">Get Started</Translate>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 h-1 bg-gradient-to-r from-custom-coral to-custom-orange"></div>
                <CardHeader className="pt-6">
                  <CardTitle>
                    <Translate text="home.pricing.premium">Premium</Translate>
                  </CardTitle>
                  <div className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-4xl font-bold tracking-tight">$15</span>
                    <span className="ml-1 text-xl font-semibold">
                      <Translate text="home.pricing.perMonth">/month</Translate>
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      <Translate text="home.pricing.perUser">per user</Translate>
                    </span>
                  </div>
                  <p className="text-sm text-custom-coral font-medium mt-1">
                    <Translate text="home.pricing.firstMonth">First month only $10</Translate>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="mt-6 space-y-3">
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-custom-coral" />
                      <span>Unlimited transactions</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-custom-coral" />
                      <span>Advanced tax compliance validation</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-custom-coral" />
                      <span>Comprehensive analytics dashboard</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-custom-coral" />
                      <span>Tax-ready reports for accountants</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-custom-coral" />
                      <span>Multilingual support (6 languages)</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-custom-coral" />
                      <span>Voice order entry</span>
                    </li>
                  </ul>
                  <Button className="mt-8 w-full bg-custom-coral hover:bg-custom-orange text-white">
                    <Translate text="common.getStarted">Start Free Trial</Translate>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-custom-lavender/20 px-3 py-1 text-sm">
                  <span className="text-custom-purple font-medium">
                    <Translate text="home.testimonials.title">Testimonials</Translate>
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  <Translate text="home.testimonials.title">What Our Users Say</Translate>
                </h2>
                <p className="max-w-[700px] text-gray-600 mx-auto">
                  <Translate text="home.testimonials.subtitle">
                    Hear from small business owners who have simplified their tax compliance with PayPath.
                  </Translate>
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "PayPath has completely transformed how I handle invoices. The automated validation saves me hours every month.",
                  author: "Alex Johnson",
                  role: "Small Business Owner",
                },
                {
                  quote:
                    "I used to dread tax season. With PayPath, I'm always prepared and confident that my invoices are compliant.",
                  author: "Sarah Miller",
                  role: "Freelance Consultant",
                },
                {
                  quote:
                    "The analytics dashboard gives me a clear picture of my business finances. I can spot issues before they become problems.",
                  author: "Michael Chen",
                  role: "E-commerce Entrepreneur",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardHeader>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-custom-coral text-custom-coral" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-custom-lavender/20 px-3 py-1 text-sm">
                  <span className="text-custom-purple font-medium">
                    <Translate text="home.team.title">Our Team</Translate>
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  <Translate text="home.team.title">Meet The Experts</Translate>
                </h2>
                <p className="max-w-[700px] text-gray-600 mx-auto">
                  <Translate text="home.team.subtitle">
                    The talented people behind PayPath who are passionate about simplifying tax compliance.
                  </Translate>
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-5">
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-custom-purple to-custom-brightPurple text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <Translate text="home.cta.title">Ready to Simplify Your Tax Compliance?</Translate>
              </h2>
              <p className="max-w-[600px] text-white/80 md:text-xl">
                <Translate text="home.cta.subtitle">
                  Join thousands of small businesses who have eliminated the hassle of tax paperwork with PayPath.
                </Translate>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button className="bg-white text-custom-purple hover:bg-white/90">
                  <Link href="/signup">
                    <Translate text="common.signup">Sign Up Now</Translate>
                  </Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link href="/help/contact">
                    <Translate text="common.contact">Contact Sales</Translate>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
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
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Tutorials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-custom-purple">
                    <Translate text="common.about">About</Translate>
                  </Link>
                </li>
                <li>
                  <Link href="/help/contact" className="text-gray-500 hover:text-custom-purple">
                    <Translate text="common.contact">Contact</Translate>
                  </Link>
                </li>
                <li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <LanguageSelector variant="footer" />
            </div>
          </div>
          <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} PayPath. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-custom-purple">
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
              <Link href="#" className="text-gray-500 hover:text-custom-purple">
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
              <Link href="#" className="text-gray-500 hover:text-custom-purple">
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
              <Link href="#" className="text-gray-500 hover:text-custom-purple">
                <span className="sr-only">LinkedIn</span>
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
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
