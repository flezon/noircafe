"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `${currentBaseUrl}/ezgif-frame-${frameNumber}.jpg`;
        
        img.onload = () => {
          count++;
          setLoadedCount(count);
          if (count === currentFrameCount) {
            setImages(loadedImages);
          }
        };
        img.onerror = () => {
          count++;
          setLoadedCount(count);
        }
        loadedImages[i - 1] = img;
      }
    };

    preloadImages();
  }, [currentFrameCount, currentBaseUrl]);

  const render = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[Math.floor(index)];
    if (!img || !img.complete) return;

    // Clear and draw
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    let scale;

    if (isMobile) {
      // Contain logic for mobile: Shows the ENTIRE image without cropping or zooming. 
      // This matches your source image exactly.
      scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
    } else {
      // Cover logic for desktop: Fills the screen for cinematic effect.
      scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
    }

    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    
    // Perfect centering
    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    
    // Fill background with Noir Black to match the rest of the site
    ctx.fillStyle = "#08060A";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    ctx.drawImage(img, Math.round(offsetX), Math.round(offsetY), Math.round(drawWidth), Math.round(drawHeight));
  }, [images, isMobile]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    render(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Physical pixels for max sharpness
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      render(frameIndex.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex, render]);

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
              Perfeccionando la mezcla... {Math.round((loadedCount / currentFrameCount) * 100)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
