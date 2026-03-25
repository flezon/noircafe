"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

interface ScrollCanvasProps {
  baseUrl: string;
}

export default function ScrollCanvas({ baseUrl }: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentBaseUrl = isMobile ? "/images/sequence/Frames-movile" : baseUrl;
  const currentFrameCount = isMobile ? 241 : 240;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0-1) to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, currentFrameCount - 1]);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const preloadImages = async () => {
      setLoadedCount(0);
      setImages([]);
      const loadedImages: HTMLImageElement[] = [];
      let count = 0;

      for (let i = 1; i <= currentFrameCount; i++) {
        const img = new Image();
        // Zero padding for frame numbers (e.g., 001, 010, 100)
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `${currentBaseUrl}/ezgif-frame-${frameNumber}.jpg`;

        img.onload = () => {
          count++;
          setLoadedCount(count);
          if (count === currentFrameCount) {
            // Sort images to ensure they are in order if loaded asynchronously
            // Since we set them directly by index, we just need to confirm completion.
            setImages(loadedImages);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load frame: ${img.src}`);
          count++; // Still count it to progress the loader
          setLoadedCount(count);
        }
        loadedImages[i - 1] = img; // store at index 0..239
      }
    };

    preloadImages();
  }, [currentFrameCount, currentBaseUrl]);

  const render = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[Math.floor(index)];
    if (!img || !img.complete) return;

    // Clear and draw
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Fit image to canvas (cover or contain)
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    // Cover logic
    if (canvasRatio < imgRatio) {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth);
      offsetY = 0;
    } else {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Solid background to keep total consistency
    ctx.fillStyle = "#08060A";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(img, Math.round(offsetX), Math.round(offsetY), Math.round(drawWidth), Math.round(drawHeight));
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    render(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Handle High DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      render(frameIndex.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-noir-black">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full"
        />

        {/* Loading overlay */}
        {loadedCount < currentFrameCount && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-noir-black z-10">
            <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(loadedCount / currentFrameCount) * 100}%` }}
              />
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium font-inter">
              Perfecting the brew... {Math.round((loadedCount / currentFrameCount) * 100)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
