"use client" 

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
 
export interface MagicTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}
 
interface WordProps {
  children: string;
  progress: any;
  range: number[];
  className?: string;
}
 
const Word: React.FC<WordProps> = ({ children, progress, range, className }) => {
  const opacity = useTransform(progress, range, [0, 1]);
 
  return (
    <span className={`relative inline-block ${className || "text-3xl font-semibold"}`}>
      <span className="absolute opacity-20 left-0 top-0 select-none pointer-events-none">{children}</span>
      <motion.span 
        style={{ opacity: opacity }} 
        className="text-[#8B5CF6]"
      >
        {children}
      </motion.span>
    </span>
  );
};
 
export const MagicText: React.FC<MagicTextProps> = ({ text, className, wordClassName }) => {
  const container = useRef(null);
 
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });
  
  const words = text.split(" ");
 
  return (
    <p 
      ref={container} 
      className={`block p-4 ${className || "leading-normal"}`}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
 
        return (
          <React.Fragment key={i}>
            <Word 
              progress={scrollYProgress} 
              range={[start, end]}
              className={wordClassName}
            >
              {word}
            </Word>
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </p>
  );
};
