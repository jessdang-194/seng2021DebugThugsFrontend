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
            <span className="text-xl font-bold">ColorFusion</span>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About ColorFusion</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're on a mission to simplify the submission process and bring color to your workflow.
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
                Founded in 2023, ColorFusion was born from a simple idea: make document submissions beautiful,
                efficient, and stress-free. Our team of designers and developers noticed how outdated and complicated
                most submission systems were, and we set out to change that.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that even the most mundane tasks can be transformed with the right design and user
                experience. That's why we've created a submission platform that not only works flawlessly but also
                brings joy to the process.
              </p>
              <p className="text-gray-600">
                Today, ColorFusion helps thousands of users manage their submissions with ease, all while enjoying our
                carefully crafted color palette and intuitive interface.
              </p>
            </div>
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
                description: "We believe in making complex processes simple and accessible to everyone.",
              },
              {
                title: "Creativity",
                description: "We infuse creativity into every aspect of our platform, from design to functionality.",
              },
              {
                title: "Reliability",
                description:
                  "We build systems you can count on, ensuring your submissions are always secure and accessible.",
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
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">The talented people behind ColorFusion</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Alex Johnson", role: "Founder & CEO" },
              { name: "Sarah Miller", role: "Lead Designer" },
              { name: "Michael Chen", role: "CTO" },
              { name: "Emma Wilson", role: "Head of Customer Success" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 h-32 w-32 mx-auto rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-custom-purple to-custom-brightPurple text-white rounded-xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of users who have transformed their submission process with ColorFusion.
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

