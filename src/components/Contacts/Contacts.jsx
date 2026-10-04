import { motion } from 'framer-motion';
import { CONTACTS } from '../../data/content.js';
import { BookingForm } from '../BookingForm/BookingForm.jsx';
import { fadeUp, inViewOnce, staggerContainer } from '../motion/presets.js';
import './Contacts.css';

/** Контакты кофейни и форма брони. */
export function Contacts() {
  return (
    <section id="contacts" className="section">
      <motion.div className="container contacts" variants={staggerContainer(0.15)} {...inViewOnce}>
        <motion.div variants={fadeUp}>
          <h2 className="contacts__title">Приходите в гости</h2>
          <p className="contacts__line">📍 {CONTACTS.address}</p>
          <p className="contacts__line">
            🕗 {CONTACTS.hours[0]}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{CONTACTS.hours[1]}
          </p>
          <p className="contacts__line">
            📞 <a href={CONTACTS.phone.href}>{CONTACTS.phone.label}</a>
          </p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <BookingForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
