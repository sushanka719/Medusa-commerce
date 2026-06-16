"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Loader2, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import {
  getProductReviews,
  getProductReviewStats,
  getOrderLineItemsForProduct,
  submitReview,
  ProductReview,
  ProductReviewStats,
  OrderLineItemForReview,
} from "@/lib/data/reviews";
import { useAuthStore } from "@/store/auth";

function StarRating({
  rating,
  max = 5,
  size = 14,
  interactive = false,
  onChange,
}: {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || rating;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type={interactive ? "button" : undefined}
          onClick={() => interactive && onChange?.(i + 1)}
          onMouseEnter={() => interactive && setHovered(i + 1)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={interactive ? "cursor-pointer" : "cursor-default pointer-events-none"}
        >
          <Star
            size={size}
            className={i < display ? "fill-[var(--foreground)] text-[var(--foreground)]" : "fill-none text-[var(--card-border)]"}
          />
        </button>
      ))}
    </div>
  );
}

function RatingBar({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--text-secondary)] w-3 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-[var(--card-border)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-[var(--foreground)] rounded-full"
        />
      </div>
      <span className="text-xs text-[var(--text-secondary)] w-4 shrink-0 text-right">{value}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  const date = new Date(review.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8 border-b border-[var(--card-border)] last:border-0"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <StarRating rating={review.rating} size={13} />
          <p className="mt-2 font-medium text-sm text-[var(--foreground)]">
            {review.name ?? "Verified Customer"}
          </p>
        </div>
        <span className="text-xs text-[var(--text-secondary)] shrink-0">{date}</span>
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
        {review.content}
      </p>
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {review.images.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={img.id} src={img.url} alt="" className="w-16 h-16 object-cover border border-[var(--card-border)]" />
          ))}
        </div>
      )}
      {review.response && (
        <div className="mt-4 pl-4 border-l-2 border-[var(--card-border)]">
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] mb-1">Store Response</p>
          <p className="text-sm text-[var(--text-secondary)] font-light">{review.response.content}</p>
        </div>
      )}
    </motion.div>
  );
}

function ReviewForm({
  lineItem,
  onSuccess,
}: {
  lineItem: OrderLineItemForReview;
  onSuccess: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { setError("Please select a rating."); return; }
    if (!content.trim()) { setError("Please write a review."); return; }
    setIsSubmitting(true);
    setError(null);
    try {
      await submitReview({
        order_id: lineItem.order_id,
        order_line_item_id: lineItem.line_item_id,
        rating,
        content: content.trim(),
      });
      setDone(true);
      setTimeout(onSuccess, 1500);
    } catch (e: any) {
      setError(e?.message ?? "Failed to submit review. You may have already reviewed this product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle size={32} className="text-green-500" />
        <p className="font-serif text-lg text-[var(--foreground)]">Review Submitted</p>
        <p className="text-sm text-[var(--text-secondary)]">Thanks! Your review is pending approval.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-3">Your Rating</p>
        <StarRating rating={rating} size={24} interactive onChange={setRating} />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] block mb-2">
          Your Review
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Share your experience with this product..."
          className="w-full p-3 bg-transparent border border-[var(--card-border)] text-[var(--foreground)] text-sm leading-relaxed resize-none focus:border-[var(--foreground)] outline-none transition-colors"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[var(--foreground)] text-[var(--background)] text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting && <Loader2 size={14} className="animate-spin" />}
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default function ProductReviews({ productId }: { productId: string }) {
  const { customer } = useAuthStore();
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [stats, setStats] = useState<ProductReviewStats | null>(null);
  const [lineItems, setLineItems] = useState<OrderLineItemForReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setIsLoading(true);
    try {
      const [{ reviews: r }, s] = await Promise.all([
        getProductReviews(productId),
        getProductReviewStats(productId),
      ]);
      setReviews(r);
      setStats(s);
      if (customer) {
        const items = await getOrderLineItemsForProduct(productId);
        setLineItems(items);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, [productId, customer]);

  const canReview = lineItems.length > 0;
  const lineItem = lineItems[0];
  const distribution = stats?.distribution ?? {};
  const total = stats?.count ?? 0;
  const avg = stats?.average ?? 0;

  return (
    <section className="border-t border-[var(--card-border)] bg-[var(--background)]">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 py-12 border-b border-[var(--card-border)] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">
            {isLoading ? "Reviews" : total > 0 ? `${total} Review${total !== 1 ? "s" : ""}` : "No Reviews Yet"}
          </h2>
        </div>
        {!isLoading && (
          <div>
            {!customer ? (
              <Link href="/login" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2">
                <Lock size={12} /> Sign in to review
              </Link>
            ) : canReview && !showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 border border-[var(--foreground)] text-[var(--foreground)] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
              >
                Write a Review
              </button>
            ) : !canReview ? (
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.15em]">
                Purchase to review
              </p>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-[var(--card-border)]">
        {/* Left: Stats */}
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-12">
          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 size={20} className="animate-spin text-[var(--text-secondary)]" /></div>
          ) : total > 0 ? (
            <div className="space-y-6">
              {/* Average */}
              <div>
                <span className="text-6xl font-serif text-[var(--foreground)]">{avg.toFixed(1)}</span>
                <div className="mt-2">
                  <StarRating rating={Math.round(avg)} size={16} />
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{total} verified review{total !== 1 ? "s" : ""}</p>
                </div>
              </div>
              {/* Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <RatingBar key={star} label={`${star}`} value={distribution[star] ?? 0} total={total} />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8">
              <p className="text-[var(--text-secondary)] text-sm font-light">Be the first to share your experience.</p>
            </div>
          )}

          {/* Review form */}
          <AnimatePresence>
            {showForm && lineItem && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 pt-8 border-t border-[var(--card-border)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-6">Write Your Review</p>
                <ReviewForm
                  lineItem={lineItem}
                  onSuccess={() => { setShowForm(false); load(); }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Reviews list */}
        <div className="w-full lg:w-2/3 px-6 md:px-12 lg:px-16 py-12">
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 size={20} className="animate-spin text-[var(--text-secondary)]" /></div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-2xl text-[var(--foreground)] mb-3">No reviews yet</p>
              <p className="text-sm text-[var(--text-secondary)] font-light">
                {canReview ? "You've purchased this — share your thoughts!" : "Be the first to buy and review this product."}
              </p>
            </div>
          ) : (
            <div>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
