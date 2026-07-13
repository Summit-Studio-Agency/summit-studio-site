'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Slide-in direction. */
  from?: 'up' | 'left' | 'right' | 'none';
  /** Render as a different element (e.g. 'li', 'span'). */
  as?: 'div' | 'li' | 'span';
}

/**
 * Fades + slides content into view once, when scrolled near. When the user
 * prefers reduced motion, content simply appears with no transform.
 */
export function Reveal({ children, className, delay = 0, from = 'up', as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();

  const offset = { up: { y: 16 }, left: { x: -20 }, right: { x: 20 }, none: {} }[from];

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  );
}
