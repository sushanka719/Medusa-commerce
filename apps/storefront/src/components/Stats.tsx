"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 100, suffix: "%", label: "Natural Ingredients" },
  { value: 35, suffix: "+", label: "Countries Shipped" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-[var(--background)] border-b border-[var(--card-border)]">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--card-border)]">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-12 hover:bg-[var(--card-bg)] transition-colors"
          >
            <div className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-2">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
