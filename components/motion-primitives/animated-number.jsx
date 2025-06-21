"use client";
import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
}) {
  const MotionComponent = motion(as);

  const spring = useSpring(value, {
    damping: 20,
    stiffness: 100,
    ...springOptions,
  });

  const display = useTransform(spring, (latest) =>
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <MotionComponent className={cn("tabular-nums", className)}>
      {display}
    </MotionComponent>
  );
}
