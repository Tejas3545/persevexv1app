"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MousePosition {
  x: number;
  y: number;
}

export const CursorBlob: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef<MousePosition>({ x: 0, y: 0 });
  const [displayPosition, setDisplayPosition] = React.useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animationFrame = setInterval(() => {
      setDisplayPosition((prev) => ({
        x: prev.x + (mousePosition.current.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.current.y - prev.y) * 0.15,
      }));
    }, 16);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(animationFrame);
    };
  }, []);

  return (
    <motion.div
      ref={blobRef}
      className="pointer-events-none fixed z-10 mix-blend-screen"
      style={{
        left: `${displayPosition.x}px`,
        top: `${displayPosition.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        left: `${displayPosition.x}px`,
        top: `${displayPosition.y}px`,
      }}
      transition={{
        duration: 0.1,
        ease: "easeOut",
      }}
    >
      {/* Main blob */}
      <div
        className="relative w-40 h-40 rounded-full blur-3xl opacity-50"
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.5), rgba(99, 102, 241, 0.3), transparent)`,
          filter: "blur(40px)",
          animation: "pulse 3s ease-in-out infinite",
        }}
      />

      {/* Floating particles around blob */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translate(0, 0);
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translate(40px, -40px);
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default CursorBlob;
