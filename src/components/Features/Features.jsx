import { motion } from 'framer-motion';
import { FEATURES } from '../../data/content.js';
import { fadeUp, inViewOnce, staggerContainer } from '../motion/presets.js';
import './Features.css';

/** Три преимущества. Карточки появляются по очереди при прокрутке. */
export function Features() {
  return (
    <section id="about" className="section">
      <motion.div className="container features" variants={staggerContainer(0.12)} {...inViewOnce}>
        {FEATURES.map((feature) => (
          <motion.article key={feature.title} className="feature" variants={fadeUp} whileHover={{ y: -6 }}>
            <motion.div
              className="feature__icon"
              aria-hidden="true"
              whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="feature__title">{feature.title}</h3>
            <p className="feature__text">{feature.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
