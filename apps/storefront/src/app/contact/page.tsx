"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { blurDataURL } from "@/lib/image";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header - Editorial Style */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-6 text-[var(--text-secondary)]">Get in Touch</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--foreground)] mb-6 leading-none">
              Contact <span className="italic block mt-2">Us</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-light leading-relaxed max-w-sm">
              We'd love to hear from you. Reach out for inquiries, collaborations, or just to say hello.
            </p>
          </motion.div>
        </div>
        {/* Hero Image Right Side - 2/3 */}
        <div className="hidden lg:block w-full lg:w-2/3 relative min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1631014858587-71607fd96391?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Aluna candle studio"
            fill
            sizes="66vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </section>

      {/* Contact Content - 1/3 + 2/3 Layout */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        {/* Left: Contact Info - 1/3 */}
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 border-b lg:border-b-0 lg:border-r border-[var(--card-border)] bg-[var(--background)]">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-2xl text-[var(--foreground)] mb-6">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[var(--text-secondary)] mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-1">Email</p>
                    <a href="mailto:hello@aluna.com" className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">hello@aluna.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[var(--text-secondary)] mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-1">Phone</p>
                    <p className="text-[var(--foreground)]">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[var(--text-secondary)] mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-1">Studio</p>
                    <p className="text-[var(--foreground)] leading-relaxed">
                      123 Artisan Avenue<br />
                      Paris, France 75003
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-serif text-2xl text-[var(--foreground)] mb-6">Hours</h3>
              <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                <div className="flex justify-between max-w-xs">
                  <span>Monday - Friday</span>
                  <span className="text-[var(--foreground)]">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span>Saturday</span>
                  <span className="text-[var(--foreground)]">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span>Sunday</span>
                  <span className="text-[var(--foreground)]">Closed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Form - 2/3 */}
        <div className="w-full lg:w-2/3 px-6 md:px-12 lg:px-16 py-16 bg-[var(--background)]">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl space-y-8"
          >
            <h3 className="font-serif text-3xl md:text-4xl text-[var(--foreground)] mb-8">Send us a message</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors"
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors"
                placeholder="jane@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Subject</label>
              <select
                id="subject"
                className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors appearance-none cursor-pointer"
              >
                <option>General Inquiry</option>
                <option>Order Support</option>
                <option>Wholesale</option>
                <option>Press</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-3 mt-8 group"
            >
              <span className="text-sm uppercase tracking-[0.2em] font-medium text-[var(--foreground)] group-hover:text-[var(--text-secondary)] transition-colors">
                Send Message
              </span>
              <ArrowRight size={20} className="text-[var(--foreground)] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
