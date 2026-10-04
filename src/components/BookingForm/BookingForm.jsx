import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { sendBooking, validateBooking } from '../../services/booking.js';
import './BookingForm.css';

const STATUS = { idle: 'idle', sending: 'sending', done: 'done' };

/** Поле с сообщением об ошибке; при ошибке поле «встряхивается». */
function Input({ error, ...props }) {
  return (
    <div className="booking__field">
      <motion.input
        className={`booking__input ${error ? 'booking__input--error' : ''}`}
        animate={error ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        aria-invalid={Boolean(error)}
        {...props}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            className="booking__error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Анимированная галочка в круге: круг и штрих «прорисовываются». */
function SuccessMark() {
  return (
    <svg className="booking__mark" viewBox="0 0 52 52" aria-hidden="true">
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="var(--success)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.path
        d="M15 27l7 7 15-15"
        fill="none"
        stroke="var(--success)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.45, duration: 0.35, ease: 'easeOut' }}
      />
    </svg>
  );
}

/** Форма брони: валидация → «отправка» со спиннером → экран успеха. */
export function BookingForm() {
  const [status, setStatus] = useState(STATUS.idle);
  const [errors, setErrors] = useState({});
  const [guest, setGuest] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const booking = Object.fromEntries(new FormData(event.currentTarget));
    const found = validateBooking(booking);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus(STATUS.sending);
    const result = await sendBooking(booking);
    if (result.ok) {
      setGuest(booking.name.trim());
      setStatus(STATUS.done);
    } else {
      setStatus(STATUS.idle);
    }
  }

  return (
    <motion.div className="booking" layout transition={{ type: 'spring', stiffness: 200, damping: 24 }}>
      <AnimatePresence mode="wait" initial={false}>
        {status === STATUS.done ? (
          <motion.div
            key="done"
            className="booking__success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <SuccessMark />
            <h3 className="booking__title">Столик забронирован!</h3>
            <p className="booking__note">{guest}, мы перезвоним в течение 15 минут, чтобы подтвердить время.</p>
            <button className="booking__again" onClick={() => setStatus(STATUS.idle)}>
              Забронировать ещё
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="booking__form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h3 className="booking__title">Забронировать столик</h3>
            <Input name="name" id="booking-name" placeholder="Ваше имя" error={errors.name} />
            <Input name="phone" id="booking-phone" type="tel" placeholder="Телефон" error={errors.phone} />
            <motion.button
              className="btn booking__submit"
              type="submit"
              disabled={status === STATUS.sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === STATUS.sending ? (
                  <motion.span key="spin" className="booking__spinner" initial={{ opacity: 0 }} animate={{ opacity: 1, rotate: 360 }} exit={{ opacity: 0 }} transition={{ rotate: { repeat: Infinity, duration: 0.8, ease: 'linear' } }} />
                ) : (
                  <motion.span key="label" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    Отправить
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
