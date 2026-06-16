"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Leaf, Heart, Award } from "lucide-react";
import { blurDataURL } from "@/lib/image";

const values = [
  {
    icon: Sparkles,
    title: "Artisan Craftsmanship",
    description:
      "Each product is meticulously handcrafted by skilled artisans using time-honored techniques.",
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description:
      "We partner with ethical suppliers to source the finest natural ingredients responsibly.",
  },
  {
    icon: Heart,
    title: "Passion for Quality",
    description:
      "Our unwavering commitment to excellence drives every decision we make.",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description:
      "Recognized globally for our innovative fragrances and exceptional products.",
  },
];

const team = [
  {
    name: "Elena Rivera",
    role: "Founder & Creative Director",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Marcus Chen",
    role: "Head Perfumer",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Sofia Laurent",
    role: "Design Director",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col border-b border-[var(--card-border)]">
      {/* Page Header - Editorial Style */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-6 text-[var(--text-secondary)]">Our Story</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--foreground)] mb-6 leading-none">
              The Art of <span className="italic block mt-2">Aluna</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-light leading-relaxed max-w-sm">
              Born from a passion for artisanal candle making and sustainable luxury home fragrance.
            </p>
          </motion.div>
        </div>
        {/* Hero Image Right Side - 2/3 */}
        <div className="hidden lg:block w-full lg:w-2/3 relative min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1631014858587-71607fd96391?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Aluna studio"
            fill
            sizes="66vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </section>

      {/* Journey Section - 1/3 + 2/3 Layout */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        {/* Left: Content - 1/3 */}
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-8 leading-tight">
              A Journey of Discovery
            </h2>
            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed font-light text-sm md:text-base">
              <p>
                Founded in 2014, Aluna began as a small candle atelier in the heart of
                Paris, where founder Elena Rivera poured her first collection of
                slow-burning scented candles.
              </p>
              <p>
                What started as a passion project quickly evolved into a globally
                recognized brand, known for its commitment to quality and
                sustainability.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Image - 2/3 */}
        <div className="w-full lg:w-2/3 relative min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1737982418598-7b1ef37d87a7?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Aluna atelier"
            fill
            sizes="66vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[var(--background)] border-b border-[var(--card-border)]">
        {/* Header aligned to grid */}
        <div className="px-6 md:px-12 lg:px-16 py-12 border-b border-[var(--card-border)]">
           <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="px-6 md:px-12 lg:px-16 py-8 md:py-12 hover:bg-[var(--section-bg)] transition-colors group"
            >
              <div className="w-12 h-12 mb-6 rounded-full bg-[var(--section-bg)] group-hover:bg-[var(--background)] transition-colors flex items-center justify-center text-[var(--foreground)]">
                <value.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-medium text-[var(--foreground)] mb-4 uppercase tracking-[0.2em] text-xs md:text-sm">{value.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[var(--background)]">
        {/* Header aligned to grid */}
        <div className="px-6 md:px-12 lg:px-16 py-12 border-b border-[var(--card-border)]">
           <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">Meet the Team</h2>
        </div>
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-12 text-center hover:bg-[var(--section-bg)] transition-colors group"
            >
              <div className="relative w-48 h-48 mx-auto mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="192px"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
              <h3 className="font-serif text-2xl text-[var(--foreground)] mb-2 italic">{member.name}</h3>
              <p className="text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
