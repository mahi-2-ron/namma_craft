import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HandwrittenNoteProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  delay?: number;
}

export function HandwrittenNote({ children, className, rotation = -2, delay = 0 }: HandwrittenNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      className={cn(
        "inline-block font-handwriting text-primary text-sm leading-tight bg-white/90 backdrop-blur-sm p-1.5 px-3 rounded-md shadow-sm border border-primary/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
