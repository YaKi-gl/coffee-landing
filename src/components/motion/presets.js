/**
 * Общие анимации лендинга: появление блоков при прокрутке.
 */

/** Секция анимируется один раз, когда на экране появилось 30% её высоты. */
export const inViewOnce = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } };

export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
