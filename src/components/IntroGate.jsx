import React, { useCallback, useEffect, useRef, useState } from "react";

const EXIT_DURATION_MS = 900;
const REDUCED_EXIT_DURATION_MS = 180;

export function IntroGate({ onEnter }) {
  const [spotlight, setSpotlight] = useState({ x: "50vw", y: "50vh" });
  const [isExiting, setIsExiting] = useState(false);
  const exitTimerRef = useRef(null);

  useEffect(() => {
    setSpotlight({ x: `${window.innerWidth / 2}px`, y: `${window.innerHeight / 2}px` });
    document.body.classList.add("intro-locked");

    return () => {
      document.body.classList.remove("intro-locked");
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  const moveSpotlight = useCallback(
    (event) => {
      if (isExiting) return;
      setSpotlight({ x: `${event.clientX}px`, y: `${event.clientY}px` });
    },
    [isExiting],
  );

  const startIntroExit = useCallback(() => {
    if (isExiting) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsExiting(true);
    exitTimerRef.current = window.setTimeout(
      onEnter,
      prefersReducedMotion ? REDUCED_EXIT_DURATION_MS : EXIT_DURATION_MS,
    );
  }, [isExiting, onEnter]);

  return (
    <section
      className={`intro-gate${isExiting ? " intro-gate--exiting" : ""}`}
      onPointerMove={moveSpotlight}
      style={{
        "--spotlight-x": spotlight.x,
        "--spotlight-y": spotlight.y,
      }}
    >
      <div className="intro-reveal" aria-hidden="true" />
      <div className="intro-vignette" aria-hidden="true" />
      <div className="intro-cursor" aria-hidden="true" />

      <div className="intro-content">
        <p className="intro-kicker">08:00 WAKE PROTOCOL</p>
        <h1 className="intro-title">点亮早八生还模式</h1>
        <button className="intro-start" type="button" onClick={startIntroExit} disabled={isExiting}>
          启动今日续航
        </button>
      </div>
    </section>
  );
}
