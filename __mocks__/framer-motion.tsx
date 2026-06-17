/* Manual mock for framer-motion used in jsdom tests.
   Renders motion.* as the plain underlying element and makes AnimatePresence a
   pass-through, so enter/exit are synchronous and animation-only props don't
   leak onto the DOM. */
import React from 'react';

type AnyProps = Record<string, unknown> & { children?: React.ReactNode };

const ANIMATION_PROPS = new Set([
  'initial', 'animate', 'exit', 'transition', 'layout', 'layoutId', 'variants',
  'whileHover', 'whileTap', 'whileFocus', 'whileInView', 'drag', 'custom',
  'onAnimationComplete', 'onAnimationStart',
]);

function clean(props: AnyProps): AnyProps {
  const out: AnyProps = {};
  for (const key of Object.keys(props)) {
    if (key !== 'children' && !ANIMATION_PROPS.has(key)) out[key] = props[key];
  }
  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const motion: any = new Proxy(
  {},
  {
    get: (_target, tag: string) => {
      const Comp = (props: AnyProps) =>
        React.createElement(typeof tag === 'string' ? tag : 'div', clean(props), props.children);
      Comp.displayName = `motion.${String(tag)}`;
      return Comp;
    },
  },
);

export const AnimatePresence = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);

export default { motion, AnimatePresence };
