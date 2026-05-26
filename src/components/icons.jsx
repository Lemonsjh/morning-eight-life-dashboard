import React from "react";

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function BatteryCharging(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="M14 7h1a2 2 0 0 1 2 2v1" />
      <path d="M7 7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3" />
      <path d="M21 11v2" />
      <path d="m11 7-3 5h4l-3 5" />
    </svg>
  );
}

export function Check(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

export function CheckCircle2(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

export function ChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function Coffee(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M5 8h11v7a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5Z" />
    </svg>
  );
}

export function ListPlus(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="M11 12H3" />
      <path d="M16 6H3" />
      <path d="M16 18H3" />
      <path d="M19 10v8" />
      <path d="M15 14h8" />
    </svg>
  );
}

export function LogOut(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export function Plus(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function UserRound(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

export function Sparkles(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z" />
      <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9Z" />
    </svg>
  );
}

export function Zap(props) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} {...props}>
      <path d="M13 2 3 14h8l-1 8 10-12h-8Z" />
    </svg>
  );
}
