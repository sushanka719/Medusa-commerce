"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  reviews?: number;
  size?: "sm" | "md" | "lg";
  showReviews?: boolean;
}

export default function RatingStars({ 
  rating, 
  reviews, 
  size = "sm", 
  showReviews = true 
}: RatingStarsProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "md":
        return "w-4 h-4";
      case "lg":
        return "w-5 h-5";
      default:
        return "w-3 h-3";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "md":
        return "text-sm";
      case "lg":
        return "text-base";
      default:
        return "text-xs";
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size === "lg" ? 20 : size === "md" ? 16 : 12}
            className={`${getSizeClasses()} ${
              star <= Math.floor(rating)
                ? "fill-[var(--foreground)] text-[var(--foreground)]"
                : star <= rating
                ? "fill-[var(--foreground)]/50 text-[var(--foreground)]/50"
                : "fill-transparent text-[var(--accent-secondary)]"
            } transition-colors`}
          />
        ))}
      </div>
      {showReviews && reviews && (
        <span className={`${getTextSize()} text-[var(--text-secondary)] ml-1`}>
          ({reviews})
        </span>
      )}
    </div>
  );
}
