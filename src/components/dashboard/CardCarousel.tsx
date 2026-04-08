"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ResourceCardData } from "@/lib/mockData";

/* Inline card rendering to avoid server/client component boundary issues */
function CarouselCard({
  card,
  isActive,
}: {
  card: ResourceCardData;
  isActive: boolean;
}) {
  const isFeatured = card.variant === "featured";

  return (
    <div
      className="w-[350px] min-w-[350px] h-[235px] rounded-[25px] flex flex-col justify-between overflow-hidden select-none"
      style={{
        background: isFeatured
          ? "linear-gradient(135deg, #4C49ED 0%, #0A06F4 100%)"
          : "#FFFFFF",
        boxShadow: isActive
          ? "0 8px 30px rgba(0,0,0,0.15)"
          : "0.28px 0.56px 0.56px rgba(0,0,0,0.25)",
      }}
    >
      {/* Top content */}
      <div className="px-7 pt-6 flex-1">
        <div className="flex items-center gap-2.5 mb-6">
          <Image
            src={card.icon}
            alt={card.resourceName}
            width={20}
            height={20}
            style={
              isFeatured
                ? {
                    filter:
                      "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                  }
                : {}
            }
          />
          <span
            className={`text-xl ${
              isFeatured ? "text-white" : "text-text-body"
            }`}
            style={{ fontFamily: "var(--font-lato), Lato, sans-serif" }}
          >
            {card.resourceName}
          </span>
        </div>
        <div>
          <p
            className={`text-[28px] font-bold leading-tight ${
              isFeatured ? "text-white" : "text-text-body"
            }`}
          >
            {card.statusLabel}
          </p>
          <p
            className={`text-sm mt-0.5 ${
              isFeatured ? "text-white/70" : "text-text-muted"
            }`}
          >
            {card.statusCount} / {card.totalCount}
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div
        className="h-[70px] rounded-b-[25px] flex items-center px-7"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.15), rgba(255,255,255,0))",
        }}
      >
        <Link
          href={card.href}
          className={`flex items-center gap-6 text-base font-medium transition-opacity hover:opacity-80 ${
            isFeatured ? "text-white" : "text-text-body"
          }`}
          tabIndex={isActive ? 0 : -1}
        >
          Open Details
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

interface CardCarouselProps {
  cards: ResourceCardData[];
}

export default function CardCarousel({ cards }: CardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const getCardStyle = (index: number): React.CSSProperties => {
    const total = cards.length;
    let offset = index - activeIndex;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const isActive = offset === 0;
    const absOffset = Math.abs(offset);

    return {
      transform: `translateX(${offset * 280}px) scale(${isActive ? 1 : 0.88})`,
      zIndex: 10 - absOffset,
      opacity: absOffset > 1 ? 0 : 1,
      filter: isActive ? "none" : "brightness(0.85) blur(1px)",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "absolute" as const,
      left: "50%",
      marginLeft: "-175px", // half of card width
    };
  };

  return (
    <div className="flex flex-col items-center">
      {/* Carousel container */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: 260 }}
      >
        {/* Prev button */}
        <button
          onClick={goPrev}
          className="absolute left-0 z-20 w-[44px] h-[44px] rounded-full bg-bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-accent-blue hover:text-white group"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}
          aria-label="Previous card"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-heading group-hover:text-white transition-colors"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Cards stack */}
        <div
          className="relative"
          style={{ width: 350, height: 235 }}
        >
          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={card.id} style={getCardStyle(index)}>
                <CarouselCard card={card} isActive={isActive} />
              </div>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          className="absolute right-0 z-20 w-[44px] h-[44px] rounded-full bg-bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-accent-blue hover:text-white group"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}
          aria-label="Next card"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-heading group-hover:text-white transition-colors"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-4">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              index === activeIndex
                ? "w-6 h-2.5 bg-accent-blue"
                : "w-2.5 h-2.5 bg-text-muted/40 hover:bg-text-muted/70"
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
