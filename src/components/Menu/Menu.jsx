import { motion } from 'framer-motion';
import { MENU } from '../../data/content.js';
import { inViewOnce, staggerContainer } from '../motion/presets.js';
import './Menu.css';

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const dots = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.5, delay: 0.15, ease: 'easeOut' } },
};

/** Меню: позиции выезжают по очереди, пунктир «дорисовывается» до цены. */
export function Menu() {
  return (
    <section id="menu" className="section section--alt">
      <div className="container">
        <h2 className="section__title">Меню</h2>
        <motion.ul className="menu" variants={staggerContainer(0.07)} {...inViewOnce}>
          {MENU.map((position) => (
            <motion.li key={position.name} className="menu__item" variants={item} whileHover={{ x: 6 }}>
              <span>{position.name}</span>
              <motion.span className="menu__dots" variants={dots} />
              <span className="menu__price">{position.price} ₽</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
