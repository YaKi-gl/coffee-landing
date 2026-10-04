import { motion } from 'framer-motion';
import { HERO } from '../../data/content.js';
import './Hero.css';

const line = {
  hidden: { y: '110%' },
  show: (i) => ({ y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

/** Первый экран: строки заголовка выезжают из-под маски, фон медленно приближается. */
export function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero__bg"
        aria-hidden="true"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
      />
      <div className="container hero__content">
        <h1 className="hero__title">
          {HERO.title.map((text, i) => (
            <span key={text} className="hero__line">
              <motion.span className="hero__line-inner" custom={i} variants={line} initial="hidden" animate="show">
                {text}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="hero__text"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          {HERO.text}
        </motion.p>
        <motion.a
          href={HERO.cta.href}
          className="btn hero__cta"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75, type: 'spring', stiffness: 260, damping: 16 }}
          whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-dark)' }}
          whileTap={{ scale: 0.96 }}
        >
          {HERO.cta.label}
        </motion.a>
      </div>
    </section>
  );
}
