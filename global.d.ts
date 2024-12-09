import { AnimationControls } from "framer-motion";
import React from "react";

declare module "framer-motion" {
  type PrimitiveMotionValue = number | string | number[] | string[];
  type NestedMotionValue = {
    [key: string]: PrimitiveMotionValue | NestedMotionValue;
  };
  type MotionValue = PrimitiveMotionValue | NestedMotionValue;

  interface TransitionProps {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    repeat?: number;
    repeatType?: string;
    repeatDelay?: number;
    type?: string;
    stiffness?: number;
    damping?: number;
    mass?: number;
    velocity?: number;
    times?: number[];
    delayChildren?: number;
    staggerChildren?: number;
    when?: string | boolean;
  }

  interface MotionProps {
    className?: string;
    animate?: AnimationControls | MotionValue;
    onClick?: () => void;
    id?: string | (() => string);
    style?: React.CSSProperties;
    children?: React.ReactNode;
    initial?: boolean | string | Record<string, MotionValue>;
    animate?: string | Record<string, MotionValue>;
    exit?: string | Record<string, MotionValue>;
    transition?: TransitionProps;
    variants?: {
      [key: string]: {
        [key: string]: MotionValue | TransitionProps;
      };
    };
  }
}
