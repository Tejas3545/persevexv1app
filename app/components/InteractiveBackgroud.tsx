"use client";

import { useState, useEffect } from "react";

interface StarStyle {
  top: string;
  left: string;
  size: string;
  animationDuration: string;
  animationDelay: string;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const generateStars = (count: number): StarStyle[] => {
  return Array.from({ length: count }, () => ({
    top: `${random(0, 100)}%`,
    left: `${random(0, 100)}%`,
    size: `${random(1, 2.5)}px`,
    animationDuration: `${random(2, 4)}s`,
    animationDelay: `${random(0, 2)}s`,
  }));
};

interface InteractiveBackgroundProps {
  mouseX: number;
  mouseY: number;
}

export default function InteractiveBackground({
  mouseX,
  mouseY,
}: InteractiveBackgroundProps) {
  const [stars1, setStars1] = useState<StarStyle[]>([]);
  const [stars2, setStars2] = useState<StarStyle[]>([]);
  const [stars3, setStars3] = useState<StarStyle[]>([]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    setStars1(generateStars(70));
    setStars2(generateStars(50));
    setStars3(generateStars(30));
  }, []);

  const parallax = (factor: number) => {
    if (!hasMounted) return {};
    const x = (mouseX - window.innerWidth / 2) / factor;
    const y = (mouseY - window.innerHeight / 2) / factor;
    return { transform: `translate(${x}px, ${y}px)` };
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {}
      <div
        className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent transition-[background] duration-200 ease-out"
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          background: hasMounted
            ? `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.15), transparent 40%), linear-gradient(to top, rgba(30, 64, 175, 0.6), transparent)`
            : "transparent",
        }}
      />

      {}
      {}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        // eslint-disable-next-line react/forbid-dom-props
        style={parallax(50)}
      >
        {stars1.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-card opacity-60 animate-pulse"
            // eslint-disable-next-line react/forbid-dom-props
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        // eslint-disable-next-line react/forbid-dom-props
        style={parallax(30)}
      >
        {stars2.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-card opacity-80 animate-pulse"
            // eslint-disable-next-line react/forbid-dom-props
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        // eslint-disable-next-line react/forbid-dom-props
        style={parallax(15)}
      >
        {stars3.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-card animate-pulse"
            // eslint-disable-next-line react/forbid-dom-props
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
