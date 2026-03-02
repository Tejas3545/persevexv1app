"use client";
import React from "react";
import Image from "next/image";
import { useMemo, useEffect, useRef } from "react";

// Geometric shape class for spiral morphing animation
class GeometricShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  sides: number;
  color: string;

  constructor(x: number, y: number, size: number, sides: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
    this.alpha = 0.3 + Math.random() * 0.4;
    this.sides = sides;
    const colors = [
      "59, 130, 246", // blue
      "147, 51, 234", // purple
      "236, 72, 153", // pink
      "14, 165, 233", // sky
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.rotation += this.rotationSpeed;
    this.alpha *= 0.99;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    for (let i = 0; i <= this.sides; i++) {
      const angle = (i / this.sides) * Math.PI * 2;
      const x = Math.cos(angle) * this.size;
      const y = Math.sin(angle) * this.size;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    
    ctx.restore();
  }
}

const SpiralMorphEffect = ({
  opacity,
}: {
  opacity: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef(opacity);
  const shapesRef = useRef<GeometricShape[]>([]);
  const spiralAngleRef = useRef(0);

  useEffect(() => {
    opacityRef.current = opacity;
  }, [opacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = opacityRef.current;

      // Create spiral morphing shapes
      spiralAngleRef.current += 0.08;
      if (Math.random() > 0.7) {
        const radius = 60 + Math.random() * 100;
        const angle = spiralAngleRef.current;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const sides = 3 + Math.floor(Math.random() * 5); // polygons from triangle to heptagon
        const size = 20 + Math.random() * 40;
        shapesRef.current.push(new GeometricShape(x, y, size, sides));
      }

      // Draw and update shapes
      for (let i = shapesRef.current.length - 1; i >= 0; i--) {
        const shape = shapesRef.current[i];
        shape.update();
        shape.draw(ctx);
        
        if (shape.alpha < 0.01) {
          shapesRef.current.splice(i, 1);
        }
      }

      // Draw central pulsing glow
      const pulseSize = 50 + Math.sin(spiralAngleRef.current * 0.5) * 15;
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        pulseSize
      );
      gradient.addColorStop(0, `rgba(59, 130, 246, ${0.6 * opacityRef.current})`);
      gradient.addColorStop(0.5, `rgba(147, 51, 234, ${0.3 * opacityRef.current})`);
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Draw connecting spiral path
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * opacityRef.current})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 360; i += 5) {
        const angle = (i * Math.PI) / 180 + spiralAngleRef.current;
        const radius = 30 + (i / 360) * 120;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      shapesRef.current = [];
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

const AnimatedLogo = ({ logo, progress }: { logo: any; progress: number }) => {
  const animationPath = useMemo(() => {
    switch (logo.animation) {
      case "from-top-left":
        return {
          x1: -500,
          y1: -350,
          r1: -180,
          x2: 0,
          y2: 0,
          r2: 0,
          scale1: 0.3,
          scale2: 1,
        };
      case "from-bottom-left":
        return {
          x1: -500,
          y1: 350,
          r1: 180,
          x2: 0,
          y2: 0,
          r2: 0,
          scale1: 0.3,
          scale2: 1,
        };
      case "from-top":
        return { 
          x1: 0, 
          y1: -400, 
          r1: -360, 
          x2: 0, 
          y2: 0, 
          r2: 0,
          scale1: 0.2,
          scale2: 1,
        };
      case "from-bottom-right":
        return {
          x1: 500,
          y1: 350,
          r1: -180,
          x2: 0,
          y2: 0,
          r2: 0,
          scale1: 0.3,
          scale2: 1,
        };
      case "from-top-right":
        return {
          x1: 500,
          y1: -350,
          r1: 180,
          x2: 0,
          y2: 0,
          r2: 0,
          scale1: 0.3,
          scale2: 1,
        };
      default:
        return { 
          x1: 0, 
          y1: 0, 
          r1: 0, 
          x2: 0, 
          y2: 0, 
          r2: 0, 
          scale1: 1, 
          scale2: 1 
        };
    }
  }, [logo.animation]);

  const movementDuration = 2.0;
  const fadeDuration = 0.5;

  // Easing function for smooth spiral entrance
  const easeOutBack = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const easedProgress = easeOutBack(Math.min(1, progress / movementDuration));

  const currentX =
    animationPath.x1 + (animationPath.x2 - animationPath.x1) * easedProgress;
  const currentY =
    animationPath.y1 + (animationPath.y2 - animationPath.y1) * easedProgress;
  const currentRotation =
    animationPath.r1 + (animationPath.r2 - animationPath.r1) * easedProgress;
  const currentScale =
    animationPath.scale1 + (animationPath.scale2 - animationPath.scale1) * easedProgress;

  const logoAndEffectOpacity = progress > 0.01 ? 1 : 0;

  const effectFadeProgress = Math.max(
    0,
    (progress - movementDuration) / fadeDuration
  );
  const effectFinalOpacity = 1 - effectFadeProgress;

  const isMovementComplete = progress >= movementDuration;
  const isFadeComplete = effectFadeProgress >= 1;

  return (
    <>
      <div
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          opacity: logoAndEffectOpacity,
          transform: `translate(${currentX}px, ${currentY}px)`,
          transition: "opacity 0.2s linear",
          visibility: isFadeComplete ? "hidden" : "visible",
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          // eslint-disable-next-line react/forbid-dom-props
          style={{
            transform: `rotate(${currentRotation}deg) scale(${currentScale})`,
            visibility: isMovementComplete ? "hidden" : "visible",
          }}
          className="relative z-10"
        >
          <div className="p-2 rounded-md shadow-2xl">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={70}
              className="object-contain h-14 w-auto"
            />
          </div>
        </div>
        <div
          // eslint-disable-next-line react/forbid-dom-props
          style={{
            opacity: effectFinalOpacity,
          }}
        >
          <SpiralMorphEffect opacity={effectFinalOpacity} />
        </div>
      </div>
      <div
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          opacity: isMovementComplete ? 1 : 0,
          transition: "opacity 0.4s ease-in",
          transform: `rotate(${animationPath.r2}deg)`,
        }}
      >
        <div className="p-2 rounded-md">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={140}
            height={70}
            className="object-contain w-full"
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(AnimatedLogo);
