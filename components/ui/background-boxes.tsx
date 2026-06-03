"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const numRows = 130;
  const numCols = 90;
  const rows = new Array(numRows).fill(1);
  const cols = new Array(numCols).fill(1);
  
  // Using direct color values with 50% opacity (0.5 alpha)
  const colors = [
    "rgba(125, 211, 252, 0.5)", // sky-300
    "rgba(249, 168, 212, 0.5)", // pink-300
    "rgba(134, 239, 172, 0.5)", // green-300
    "rgba(253, 224, 71, 0.5)",  // yellow-300
    "rgba(252, 165, 165, 0.5)", // red-300
    "rgba(216, 180, 254, 0.5)", // purple-300
    "rgba(147, 197, 253, 0.5)", // blue-300
    "rgba(165, 180, 252, 0.5)", // indigo-300
    "rgba(196, 181, 253, 0.5)", // violet-300
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    target.style.backgroundColor = randomColor;
    target.style.transition = "background-color 0s";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = "transparent";
    target.style.transition = "background-color 0.5s ease";
  };

  return (
    <div
      style={{
        width: `${numRows * 64}px`,
        height: `${numCols * 32}px`,
        transform: `translate(-50%,-50%) skewX(-48deg) skewY(14deg) scale(0.8) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/2 top-1/2 flex z-0 pointer-events-none",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <div
          key={`row` + i}
          className="w-16 h-8 border-l relative"
          style={{ borderColor: "#1F2022" }}
        >
          {cols.map((_, j) => (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              key={`col` + j}
              className="w-16 h-8 border-r border-t relative pointer-events-auto"
              style={{
                borderColor: "#1F2022",
                backgroundColor: "transparent",
                transition: "background-color 0.5s ease",
              }}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="#1F2022"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
