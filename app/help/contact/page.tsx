"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
        variant: "default",
      })
      setIsSubmitting(false)

      // Reset form
      const form = event.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

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
            <Link href="/about" className="text-sm font-medium hover:text-custom-purple transition-colors">
              About
            </Link>
            <Link href="/help/faq" className="text-sm font-medium hover:text-custom-purple transition-colors">
              FAQ
            </Link>
            <Link href="/help/contact" className="text-sm font-medium text-custom-purple transition-colors">
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to our team using the form below.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-custom-purple/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-custom-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-sm text-gray-500 mt-1">For general inquiries</p>
                    <a href="mailto:info@paypath.com" className="text-custom-purple hover:underline mt-1 block">
                      info@paypath.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-custom-purple/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-custom-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-5pm EST</p>
                    <a href="tel:+1-555-123-4567" className="text-custom-purple hover:underline mt-1 block">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-custom-purple/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-custom-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium">Visit Us</h3>
                    <p className="text-sm text-gray-500 mt-1">Our headquarters</p>
                    <address className="not-italic text-sm mt-1">
                      123 PayPath Way
                      <br />
                      San Francisco, CA 94103
                      <br />
                      United States
                    </address>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger
                        id="subject"
                        className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                      >
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="min-h-[120px] border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-custom-coral hover:bg-custom-orange text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
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
                  <Link\
