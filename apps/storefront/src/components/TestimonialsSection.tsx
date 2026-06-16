"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "New York",
    rating: 5,
    text: "The quality of these candles is exceptional. The scent fills my entire home and lasts for hours. Truly a luxury experience.",
  },
  {
    id: 2,
    name: "James L.",
    location: "London",
    rating: 5,
    text: "I've tried many fragrance oils, but nothing compares to Aluna. The natural ingredients make all the difference.",
  },
  {
    id: 3,
    name: "Emily R.",
    location: "Paris",
    rating: 5,
    text: "Beautiful packaging, amazing scent, and fast delivery. This has become my go-to gift for special occasions.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
      {/* Left: Header */}
      <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">
          What Our Customers Say
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-6 leading-tight">
          Testimonials
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" className="text-[var(--foreground)]" />
            ))}
          </div>
          <span className="text-sm text-[var(--text-secondary)]">4.9 average</span>
        </div>
      </div>

      {/* Right: Testimonials List */}
      <div className="w-full lg:w-2/3 divide-y divide-[var(--card-border)]">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="px-6 md:px-12 lg:px-16 py-12 flex flex-col md:flex-row gap-8 group hover:bg-[var(--section-bg)] transition-colors"
          >
            {/* Number */}
            <span className="text-xs font-medium text-[var(--text-secondary)] mt-2">
              0{index + 1}
            </span>

            {/* Content */}
            <div className="flex-1">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" className="text-[var(--foreground)]" />
                ))}
              </div>

              {/* Quote - Large Editorial Style */}
              <blockquote className="text-2xl md:text-3xl font-serif text-[var(--foreground)] leading-tight mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-[var(--card-border)]" />
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {testimonial.name}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">
                  — {testimonial.location}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
