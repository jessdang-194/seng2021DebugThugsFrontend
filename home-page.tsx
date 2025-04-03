"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Menu, Star, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
            <span className="text-xl font-bold">ColorFusion</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
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

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 px-6 bg-white absolute w-full">
            <nav className="flex flex-col space-y-4">
              <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
                Home
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
                Features
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
                Pricing
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
                About
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-custom-purple transition-colors">
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white w-full"
                >
                  <Link href="/login" className="w-full">
                    Log in
                  </Link>
                </Button>
                <Button className="bg-custom-coral hover:bg-custom-orange text-white w-full">
                  <Link href="/signup" className="w-full">
                    Sign up
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
                  <span className="text-custom-brightPurple font-medium">Introducing ColorFusion</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Bring Your Ideas to <span className="text-custom-purple">Life</span> with Color
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Create stunning designs with our carefully crafted color palette. Perfect for your next project.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="bg-custom-coral hover:bg-custom-orange text-white">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
                  >
                    Learn More
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
                    <div className="text-sm font-medium">Loved by 10,000+ designers</div>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Everything You Need</h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Our platform provides all the tools you need to create beautiful designs with our custom color
                  palette.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "Custom Palettes",
                  description: "Create and save your own color combinations for future projects.",
                  color: "bg-custom-purple",
                },
                {
                  title: "Color Harmony",
                  description: "Automatically generate harmonious color schemes that work together.",
                  color: "bg-custom-brightPurple",
                },
                {
                  title: "Export Options",
                  description: "Export your colors in various formats for any design software.",
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

        {/* Color Showcase Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Color Palette</h2>
              <p className="max-w-[700px] text-gray-600">
                Explore the beautiful colors that make up our custom palette.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "Purple", hex: "#AD7CF2" },
                { name: "Lavender", hex: "#B4A3E6" },
                { name: "Bright Purple", hex: "#C85AED" },
                { name: "Coral", hex: "#F8885A" },
                { name: "Orange", hex: "#F98858" },
              ].map((color, index) => (
                <div key={index} className="flex flex-col">
                  <div className="h-32 rounded-t-lg shadow-md" style={{ backgroundColor: color.hex }}></div>
                  <div className="bg-white p-4 rounded-b-lg shadow-md">
                    <p className="font-medium">{color.name}</p>
                    <p className="text-sm text-gray-500">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-custom-lavender/20 px-3 py-1 text-sm">
                  <span className="text-custom-purple font-medium">Testimonials</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Users Say</h2>
                <p className="max-w-[700px] text-gray-600 mx-auto">
                  Hear from designers who have transformed their projects with our color palette.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "This color palette completely transformed my design workflow. The colors work so well together!",
                  author: "Alex Johnson",
                  role: "UI Designer",
                },
                {
                  quote: "I've never received so many compliments on my website design. These colors really stand out.",
                  author: "Sarah Miller",
                  role: "Web Developer",
                },
                {
                  quote:
                    "As a brand strategist, finding the perfect color palette is crucial. This one exceeded my expectations.",
                  author: "Michael Chen",
                  role: "Brand Strategist",
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-custom-purple to-custom-brightPurple text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Designs?
              </h2>
              <p className="max-w-[600px] text-white/80 md:text-xl">
                Join thousands of designers who have elevated their projects with our color palette.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="bg-white text-custom-purple hover:bg-gray-100">
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  View Examples
                </Button>
              </div>
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
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Releases
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Blog
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
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-custom-purple">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} ColorFusion. All rights reserved.</p>
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

