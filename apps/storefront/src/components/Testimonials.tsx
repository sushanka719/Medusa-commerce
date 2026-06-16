"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { blurDataURL } from "@/lib/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Beauty Editor",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "Aluna's fragrances are absolutely divine. The Midnight Velvet has become my signature scent - I receive compliments everywhere I go.",
  },
  {
    id: 2,
    name: "James Chen",
    role: "Lifestyle Blogger",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "The attention to detail in their products is remarkable. From packaging to scent longevity, everything exceeds expectations.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Interior Designer",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "Their candle collection has transformed my clients' spaces. The Aurora Crystal Diffuser is now a staple in all my projects.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[var(--background)] border-b border-[var(--card-border)]">
      <div className="px-8 md:px-12 lg:px-24 py-12 border-b border-[var(--card-border)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <p className="subtitle mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4">
            Loved by Thousands
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-[var(--accent-secondary)] text-[var(--accent-secondary)]" />
              ))}
            </div>
            <span className="text-[var(--text-secondary)] text-sm">4.9/5 from 2,000+ reviews</span>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-[var(--background)] p-12 hover:bg-[var(--card-bg)] transition-colors"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-[var(--foreground)] text-[var(--foreground)]" />
              ))}
            </div>

            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed font-light text-lg italic font-serif">
              &ldquo;{testimonial.text}&rdquo;
            </p>

            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden grayscale">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
              <div>
                <div className="font-medium text-sm text-[var(--foreground)]">{testimonial.name}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
