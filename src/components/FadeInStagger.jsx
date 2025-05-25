import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FadeInStagger({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const baseDelay = 0.15;

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: index * baseDelay
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  );
}