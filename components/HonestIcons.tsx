"use client";

import React from "react";
import { motion } from "motion/react";

interface AnimatedIconProps {
  color?: string;
  size?: number;
  className?: string;
  isHovered?: boolean;
}

export function AnimatedCrowdIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.circle cx="12" cy="7" r="3" animate={{ y: isHovered ? [0, -2, 0] : 0 }} transition={{ duration: 0.4 }} />
      <motion.path d="M12 14c-4 0-7 2-7 6h14c0-4-3-6-7-6z" animate={{ scaleY: isHovered ? [1, 1.1, 1] : 1, originY: 1 }} transition={{ duration: 0.4 }} />
      <motion.circle cx="5" cy="9" r="2" animate={{ y: isHovered ? [0, -2, 0] : 0 }} transition={{ duration: 0.4, delay: 0.1 }} />
      <motion.path d="M5 15c-2 0-4 1-4 4h4" animate={{ scaleY: isHovered ? [1, 1.1, 1] : 1, originY: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
      <motion.circle cx="19" cy="9" r="2" animate={{ y: isHovered ? [0, -2, 0] : 0 }} transition={{ duration: 0.4, delay: 0.2 }} />
      <motion.path d="M19 15c2 0 4 1 4 4h-4" animate={{ scaleY: isHovered ? [1, 1.1, 1] : 1, originY: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
    </motion.svg>
  );
}

export function AnimatedNetworkNodesIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.circle cx="12" cy="5" r="3" animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.4 }} />
      <motion.circle cx="5" cy="17" r="3" animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
      <motion.circle cx="19" cy="17" r="3" animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
      <motion.line x1="10.5" y1="7.5" x2="6.5" y2="14.5" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5 }} />
      <motion.line x1="13.5" y1="7.5" x2="17.5" y2="14.5" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
      <motion.line x1="8" y1="17" x2="16" y2="17" animate={{ pathLength: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
    </motion.svg>
  );
}

export function AnimatedAuditStampIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <motion.circle cx="12" cy="15" r="3" animate={{ scale: isHovered ? [0, 1.2, 1] : 1, opacity: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5 }} />
      <motion.path d="M12 18l-1.5 3 1.5-1 1.5 1-1.5-3" animate={{ y: isHovered ? [-5, 0] : 0, opacity: isHovered ? [0, 1] : 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
    </motion.svg>
  );
}

export function AnimatedWalkieTalkieIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ y: isHovered ? [0, -3, 0] : 0 }} transition={{ duration: 0.4 }}>
      <rect x="7" y="7" width="10" height="15" rx="2" ry="2" />
      <line x1="10" y1="7" x2="10" y2="3" />
      <motion.path d="M15 4a3 3 0 0 1 3 3" animate={{ opacity: isHovered ? [0, 1, 0] : 0 }} transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }} />
      <motion.path d="M18 2a5 5 0 0 1 5 5" animate={{ opacity: isHovered ? [0, 1, 0] : 0 }} transition={{ duration: 0.6, delay: 0.2, repeat: isHovered ? Infinity : 0 }} />
      <rect x="9" y="10" width="6" height="4" rx="1" ry="1" />
      <circle cx="12" cy="18" r="1" />
    </motion.svg>
  );
}

export function AnimatedSirenIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2" />
      <motion.path d="M5 5l1.5 1.5" animate={{ opacity: isHovered ? [0, 1, 0] : 0 }} transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }} />
      <motion.path d="M19 5l-1.5 1.5" animate={{ opacity: isHovered ? [0, 1, 0] : 0 }} transition={{ duration: 0.5, delay: 0.2, repeat: isHovered ? Infinity : 0 }} />
      <path d="M6 10a6 6 0 0 1 12 0v6H6v-6z" />
      <rect x="4" y="16" width="16" height="4" rx="1" />
      <motion.circle cx="12" cy="10" r="2" animate={{ scale: isHovered ? [1, 1.5, 1] : 1, fill: isHovered ? color : "transparent" }} transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }} />
    </motion.svg>
  );
}

export function AnimatedSmallBuildingIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ y: isHovered ? [0, -3, 0] : 0 }} transition={{ duration: 0.4 }}>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-5 7 5v13" />
      <motion.rect x="10" y="14" width="4" height="7" animate={{ scaleY: isHovered ? [1, 1.2, 1] : 1, originY: 1 }} transition={{ duration: 0.4 }} />
      <motion.circle cx="12" cy="10" r="1" animate={{ scale: isHovered ? [1, 2, 1] : 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
    </motion.svg>
  );
}

export function AnimatedStandaloneBoxIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.rect x="6" y="6" width="12" height="12" rx="2" animate={{ rotate: isHovered ? [0, 90] : 0 }} transition={{ duration: 0.6 }} />
      <motion.circle cx="12" cy="12" r="2" animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
    </motion.svg>
  );
}

export function AnimatedCoffeeChatIcon({ color = "currentColor", size = 20, className = "", isHovered = false }: AnimatedIconProps) {
  return (
    <motion.svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <motion.rect x="3" y="8" width="14" height="12" rx="2" animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }} transition={{ duration: 0.5 }} />
      <motion.path d="M6 3v2" animate={{ y: isHovered ? [0, -2, 0] : 0, opacity: isHovered ? [1, 0, 1] : 1 }} transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }} />
      <motion.path d="M10 3v2" animate={{ y: isHovered ? [0, -2, 0] : 0, opacity: isHovered ? [1, 0, 1] : 1 }} transition={{ duration: 0.6, delay: 0.3, repeat: isHovered ? Infinity : 0 }} />
      <motion.path d="M14 3v2" animate={{ y: isHovered ? [0, -2, 0] : 0, opacity: isHovered ? [1, 0, 1] : 1 }} transition={{ duration: 0.6, delay: 0.1, repeat: isHovered ? Infinity : 0 }} />
      <line x1="3" y1="20" x2="17" y2="20" />
    </motion.svg>
  );
}
