"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { NavHeader } from "@/components/nav-header"
import { Translate } from "@/components/translate"

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
      <NavHeader />

      <main className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <Translate text="contact.title">Contact Us</Translate>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <Translate text="contact.subtitle">
              Have questions or need assistance? We're here to help. Reach out to our team using the form below.
            </Translate>
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
                    <h3 className="font-medium">
                      <Translate text="contact.email.title">Email Us</Translate>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <Translate text="contact.email.subtitle">For general inquiries</Translate>
                    </p>
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
                    <h3 className="font-medium">
                      <Translate text="contact.phone.title">Call Us</Translate>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <Translate text="contact.phone.subtitle">Mon-Fri, 9am-5pm EST</Translate>
                    </p>
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
                    <h3 className="font-medium">
                      <Translate text="contact.visit.title">Visit Us</Translate>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <Translate text="contact.visit.subtitle">Our headquarters</Translate>
                    </p>
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
                <CardTitle>
                  <Translate text="contact.form.title">Send Us a Message</Translate>
                </CardTitle>
                <CardDescription>
                  <Translate text="contact.form.description">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </Translate>
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        <Translate text="auth.first_name">First name</Translate>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        <Translate text="auth.last_name">Last name</Translate>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Translate text="auth.email">Email</Translate>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      <Translate text="contact.form.subject">Subject</Translate>
                    </Label>
                    <Select>
                      <SelectTrigger
                        id="subject"
                        className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                      >
                        <SelectValue
                          placeholder={<Translate text="contact.form.select_subject">Select a subject</Translate>}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">
                          <Translate text="contact.form.general">General Inquiry</Translate>
                        </SelectItem>
                        <SelectItem value="support">
                          <Translate text="contact.form.support">Technical Support</Translate>
                        </SelectItem>
                        <SelectItem value="billing">
                          <Translate text="contact.form.billing">Billing Question</Translate>
                        </SelectItem>
                        <SelectItem value="feedback">
                          <Translate text="contact.form.feedback">Feedback</Translate>
                        </SelectItem>
                        <SelectItem value="other">
                          <Translate text="contact.form.other">Other</Translate>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      <Translate text="contact.form.message">Message</Translate>
                    </Label>
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
                    {isSubmitting ? (
                      <Translate text="contact.form.sending">Sending...</Translate>
                    ) : (
                      <Translate text="contact.form.send">Send Message</Translate>
                    )}
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
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
            <p>
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
