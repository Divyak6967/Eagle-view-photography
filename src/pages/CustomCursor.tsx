import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const pos     = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);

  const [clicked,  setClicked]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ── Detect touch/mobile device ──
    const checkMobile = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmall  = window.innerWidth <= 1024;
      setIsMobile(hasTouch || isSmall);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Don't attach any listeners on mobile
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isHoverable = el?.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer'], .vp-card, .vp-strip-card, .vp-elegant-item, .pk-card"
      );
      setHovering(!!isHoverable);
    };

    const onDown = () => setClicked(true);
    const onUp   = () => setClicked(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(raf.current);
    };
  }, [isMobile]);

  // ── On mobile: render nothing, restore default cursor ──
  if (isMobile) {
    return <style>{`* { cursor: auto !important; }`}</style>;
  }

  return (
    <>
      <div ref={glowRef} className={`cc-glow ${hovering ? "cc-glow--hover" : ""}`} />
      <div ref={ringRef} className={`cc-ring ${hovering ? "cc-ring--hover" : ""} ${clicked ? "cc-ring--click" : ""}`} />
      <div ref={dotRef}  className={`cc-dot  ${hovering ? "cc-dot--hover"  : ""} ${clicked ? "cc-dot--click"  : ""}`} />

      <style>{`
        *, *::before, *::after { cursor: none !important; }

        .cc-glow, .cc-ring, .cc-dot {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          will-change: transform;
          z-index: 99999;
          border-radius: 50%;
          transition: width  0.35s cubic-bezier(0.16,1,0.3,1),
                      height 0.35s cubic-bezier(0.16,1,0.3,1),
                      opacity 0.3s ease,
                      background 0.3s ease;
        }

        .cc-glow {
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
        }
        .cc-glow--hover {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%);
        }

        .cc-ring {
          width: 36px; height: 36px;
          border: 1.5px solid rgba(201,168,76,0.55);
          background: transparent;
        }
        .cc-ring--hover {
          width: 52px; height: 52px;
          border-color: rgba(201,168,76,0.9);
          background: rgba(201,168,76,0.05);
        }
        .cc-ring--click {
          width: 28px; height: 28px;
          border-color: #E8C96A;
          background: rgba(201,168,76,0.15);
        }

        .cc-dot {
          width: 5px; height: 5px;
          background: #C9A84C;
          box-shadow: 0 0 8px rgba(201,168,76,0.8);
        }
        .cc-dot--hover {
          width: 7px; height: 7px;
          background: #E8C96A;
          box-shadow: 0 0 14px rgba(201,168,76,1);
        }
        .cc-dot--click {
          width: 3px; height: 3px;
          box-shadow: 0 0 20px rgba(201,168,76,1);
        }
      `}</style>
    </>
  );
};

export default CustomCursor;