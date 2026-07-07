"use client";

import React from "react";
import { motion } from "motion/react";

interface AnimatedIconProps {
  color?: string;
  size?: number;
  className?: string;
  isHovered?: boolean;
}

export function AnimatedNetworkIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.rect x="16" y="16" width="6" height="6" rx="1" animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.4 }} />
      <motion.rect x="2" y="16" width="6" height="6" rx="1" animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
      <motion.rect x="9" y="2" width="6" height="6" rx="1" animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
      <motion.path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" animate={{ pathLength: isHovered ? [0, 1] : 1, opacity: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5 }} />
      <motion.path d="M12 12V8" animate={{ pathLength: isHovered ? [0, 1] : 1, opacity: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5 }} />
    </motion.svg>
  );
}

export function AnimatedBotIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: isHovered ? [0, -3, 0] : 0 }}
      transition={{ duration: 0.4 }}
    >
      <rect width="18" height="14" x="3" y="5" rx="2" />
      <motion.path d="M12 5V2" animate={{ scaleY: isHovered ? [1, 1.5, 1] : 1, originY: 1 }} transition={{ duration: 0.3 }} />
      <motion.path d="M9 2h6" animate={{ rotate: isHovered ? [0, 15, -15, 0] : 0 }} transition={{ duration: 0.4 }} />
      <motion.path d="M8 10h.01" animate={{ scale: isHovered ? [1, 0, 1] : 1 }} transition={{ duration: 0.3 }} />
      <motion.path d="M16 10h.01" animate={{ scale: isHovered ? [1, 0, 1] : 1 }} transition={{ duration: 0.3, delay: 0.1 }} />
      <motion.path d="M15 15H9" animate={{ scaleX: isHovered ? [1, 0.5, 1] : 1 }} transition={{ duration: 0.3 }} />
    </motion.svg>
  );
}

export function AnimatedBrainIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.8 }} />
      <motion.path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.8 }} />
      <motion.path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
      <motion.path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <motion.path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <motion.path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <motion.path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <motion.path d="M6 18a4 4 0 0 1-1.967-.516" />
      <motion.path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </motion.svg>
  );
}

export function AnimatedBlogIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" animate={{ rotateY: isHovered ? [0, 20, 0] : 0, originX: 1 }} transition={{ duration: 0.5 }} />
      <motion.path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" animate={{ rotateY: isHovered ? [0, -20, 0] : 0, originX: 0 }} transition={{ duration: 0.5 }} />
    </motion.svg>
  );
}

export function AnimatedPodcastIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <motion.path d="M19 10v2a7 7 0 0 1-14 0v-2" animate={{ scale: isHovered ? [1, 1.1, 1] : 1, opacity: isHovered ? [1, 0.5, 1] : 1 }} transition={{ duration: 0.5 }} />
      <motion.line x1="12" x2="12" y1="19" y2="22" animate={{ y: isHovered ? [0, 2, 0] : 0 }} transition={{ duration: 0.4 }} />
    </motion.svg>
  );
}

export function AnimatedEbookIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <motion.path d="M8 7h6" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.4 }} />
      <motion.path d="M8 11h8" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
    </motion.svg>
  );
}

export function AnimatedNewsletterIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <motion.path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" animate={{ d: isHovered ? "m22 7-8.97 -2.7a1.94 1.94 0 0 1-2.06 0L2 7" : "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }} transition={{ duration: 0.3 }} />
    </motion.svg>
  );
}

export function AnimatedCaseStudiesIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: isHovered ? [0, -3, 0] : 0 }}
      transition={{ duration: 0.4 }}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <motion.path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.6 }} />
    </motion.svg>
  );
}

export function AnimatedIncidentIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ y: isHovered ? [0, -4, 0] : 0, rotate: isHovered ? [0, 5, -5, 0] : 0 }} transition={{ duration: 0.5 }}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <motion.path d="M12 9v4" animate={{ scaleY: isHovered ? [1, 1.2, 1] : 1, originY: 1 }} transition={{ duration: 0.3, delay: 0.2 }} />
      <motion.path d="M12 17h.01" animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }} transition={{ duration: 0.3, delay: 0.3 }} />
    </motion.svg>
  );
}

export function AnimatedCredentialIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ y: isHovered ? [0, -3, 0] : 0, rotate: isHovered ? [0, -3, 3, 0] : 0 }} transition={{ duration: 0.5 }}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <motion.circle cx="9" cy="11" r="2" animate={{ y: isHovered ? [0, -3, 0] : 0 }} transition={{ duration: 0.4, delay: 0.1 }} />
      <motion.path d="M6.17 15a3 3 0 0 1 5.66 0" animate={{ scaleY: isHovered ? [1, 1.1, 1] : 1, originY: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
      <motion.path d="M16 10h2" animate={{ x: isHovered ? [0, 2, 0] : 0 }} transition={{ duration: 0.3, delay: 0.2 }} />
      <motion.path d="M16 14h2" animate={{ x: isHovered ? [0, 2, 0] : 0 }} transition={{ duration: 0.3, delay: 0.3 }} />
    </motion.svg>
  );
}

export function AnimatedVisitorIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" animate={{ scaleY: isHovered ? [1, 1.1, 1] : 1, originY: 1 }} transition={{ duration: 0.4 }} />
      <motion.circle cx="9" cy="7" r="4" animate={{ y: isHovered ? [0, -4, 0] : 0 }} transition={{ duration: 0.4, delay: 0.1 }} />
      <motion.path d="m16 11 2 2 4-4" animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.4, delay: 0.2 }} style={{ transformOrigin: '20px 13px' }} />
    </motion.svg>
  );
}

export function AnimatedSafetyIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" animate={{ scaleY: isHovered ? [1, 0.2, 1] : 1 }} transition={{ duration: 0.3 }} style={{ transformOrigin: '12px 12px' }} />
      <motion.circle cx="12" cy="12" r="3" animate={{ x: isHovered ? [0, 3, -3, 0] : 0 }} transition={{ duration: 0.6, delay: 0.3 }} />
    </motion.svg>
  );
}

export function AnimatedGuardIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ y: isHovered ? [0, -5, 0] : 0 }} transition={{ duration: 0.5 }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <motion.path d="m9 12 2 2 4-4" animate={{ scale: isHovered ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.4, delay: 0.2 }} style={{ transformOrigin: '13px 12px' }} />
    </motion.svg>
  );
}

export function AnimatedVehicleIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.7 }} />
      <motion.circle cx="7" cy="17" r="2" animate={{ scale: isHovered ? [0, 1.2, 1] : 1, opacity: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.3, delay: 0.4 }} />
      <motion.circle cx="17" cy="17" r="2" animate={{ scale: isHovered ? [0, 1.2, 1] : 1, opacity: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.3, delay: 0.5 }} />
      <motion.path d="M9 17h6" animate={{ pathLength: isHovered ? [0, 1] : 1, opacity: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.3, delay: 0.6 }} />
    </motion.svg>
  );
}

export function AnimatedUsersIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" animate={{ scaleY: isHovered ? [1, 1.1, 1] : 1, originY: 1 }} transition={{ duration: 0.4 }} />
      <motion.circle cx="9" cy="7" r="4" animate={{ y: isHovered ? [0, -4, 0] : 0 }} transition={{ duration: 0.4, delay: 0.1 }} />
      <motion.path d="M22 21v-2a4 4 0 0 0-3-3.87" animate={{ x: isHovered ? [0, 2, 0] : 0 }} transition={{ duration: 0.4, delay: 0.2 }} />
      <motion.path d="M16 3.13a4 4 0 0 1 0 7.75" animate={{ x: isHovered ? [0, 2, 0] : 0 }} transition={{ duration: 0.4, delay: 0.2 }} />
    </motion.svg>
  );
}

export function AnimatedBriefcaseIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ y: isHovered ? [0, -4, 0] : 0, rotate: isHovered ? [0, -5, 5, 0] : 0 }} transition={{ duration: 0.5 }}>
      <motion.rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <motion.path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" animate={{ y: isHovered ? [0, -3, 0] : 0 }} transition={{ duration: 0.4, delay: 0.1 }} />
    </motion.svg>
  );
}

export function AnimatedMessageIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ scale: isHovered ? [1, 1.1, 1] : 1, rotate: isHovered ? [0, -10, 10, 0] : 0 }} transition={{ duration: 0.5 }}>
      <motion.path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </motion.svg>
  );
}

export function AnimatedLayersIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.polygon points="12 2 2 7 12 12 22 7 12 2" animate={{ y: isHovered ? [0, -6, 0] : 0 }} transition={{ duration: 0.5 }} />
      <motion.polyline points="2 17 12 22 22 17" animate={{ y: isHovered ? [0, 6, 0] : 0 }} transition={{ duration: 0.5 }} />
      <motion.polyline points="2 12 12 17 22 12" animate={{ scaleX: isHovered ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
    </motion.svg>
  );
}

export function AnimatedZapIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ scale: isHovered ? [1, 1.2, 1] : 1, rotate: isHovered ? [0, 15, -15, 0] : 0 }} transition={{ duration: 0.4 }}>
      <motion.polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" animate={{ fill: isHovered ? [null, color, "transparent"] : "transparent" }} transition={{ duration: 0.4 }} />
    </motion.svg>
  );
}

export function AnimatedMonitorIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.rect x="2" y="3" width="20" height="14" rx="2" ry="2" animate={{ y: isHovered ? [0, -3, 0] : 0 }} transition={{ duration: 0.4 }} />
      <motion.line x1="2" y1="10" x2="22" y2="10" animate={{ y: isHovered ? [0, -3, 0] : 0, opacity: isHovered ? [1, 0, 1] : 1 }} transition={{ duration: 0.4 }} />
      <motion.line x1="12" y1="10" x2="12" y2="17" animate={{ scaleY: isHovered ? [1, 1.5, 1] : 1, originY: 1 }} transition={{ duration: 0.3, delay: 0.2 }} />
      <motion.line x1="8" y1="21" x2="16" y2="21" animate={{ scaleX: isHovered ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3, delay: 0.3 }} />
      <motion.line x1="12" y1="17" x2="12" y2="21" />
    </motion.svg>
  );
}

export function AnimatedFileCodeIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5 }} />
      <motion.polyline points="14 2 14 8 20 8" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.3, delay: 0.1 }} />
      <motion.path d="m10 13-2 2 2 2" animate={{ x: isHovered ? [0, -2, 0] : 0 }} transition={{ duration: 0.4, delay: 0.2 }} />
      <motion.path d="m14 17 2-2-2-2" animate={{ x: isHovered ? [0, 2, 0] : 0 }} transition={{ duration: 0.4, delay: 0.3 }} />
    </motion.svg>
  );
}

export function AnimatedRadarIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.4 }} />
      <motion.path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.6, delay: 0.1 }} />
      <motion.path d="M16.24 7.76A6 6 0 1 0 8.25 16.23" animate={{ rotate: isHovered ? [0, 90, 0] : 0 }} transition={{ duration: 0.8 }} style={{ transformOrigin: '12px 12px' }} />
      <motion.circle cx="12" cy="12" r="1" animate={{ scale: isHovered ? [1, 2, 1] : 1 }} transition={{ duration: 0.4 }} />
    </motion.svg>
  );
}

export function AnimatedCheckSquareIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5 }} />
      <motion.polyline points="9 11 12 14 22 4" animate={{ pathLength: isHovered ? [0, 1] : 1, opacity: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
    </motion.svg>
  );
}

export function AnimatedPresentationIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M2 3h20" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.3 }} />
      <motion.path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
      <motion.path d="m7 21 5-5 5 5" animate={{ y: isHovered ? [0, -3, 0] : 0 }} transition={{ duration: 0.4, delay: 0.3 }} />
    </motion.svg>
  );
}
