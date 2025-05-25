import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FadeInSection({ children, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <motion.div
      id={id} // <-- apply id here so scroll-margin-top works
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}