/**
 * Бронирование столика: валидация и отправка заявки.
 * sendBooking — заглушка; для реальной отправки (например, в Telegram-бота)
 * достаточно заменить её тело на fetch к своему API.
 */

/** Оставляет в телефоне только цифры и приводит 8XXXXXXXXXX к 7XXXXXXXXXX. */
export function normalizePhone(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('8') ? `7${digits.slice(1)}` : digits;
}

/** @returns {Record<string, string>} ошибки по полям; пустой объект — всё верно */
export function validateBooking({ name, phone }) {
  const errors = {};
  if (!String(name ?? '').trim()) errors.name = 'Как к вам обращаться?';
  const digits = normalizePhone(phone);
  if (digits.length < 10 || digits.length > 12) errors.phone = 'Проверьте номер: нужно 10–11 цифр';
  return errors;
}

export async function sendBooking(booking, { delay = 900 } = {}) {
  // Имитация запроса к серверу
  await new Promise((resolve) => setTimeout(resolve, delay));
  return { ok: true, booking: { ...booking, phone: normalizePhone(booking.phone) } };
}
