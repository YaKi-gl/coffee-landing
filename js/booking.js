/**
 * Форма бронирования столика.
 * Сейчас заявка обрабатывается на странице; для реальной отправки
 * (например, в Telegram-бота) достаточно заменить функцию sendBooking.
 */

/** Отправка заявки. Заглушка, которая имитирует успешный ответ сервера. */
async function sendBooking(booking) {
  console.info('Новая заявка на бронь:', booking);
  return { ok: true };
}

export function initBookingForm(form) {
  if (!form) return;
  const success = form.querySelector('[data-role="success"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const booking = Object.fromEntries(new FormData(form));
    const result = await sendBooking(booking);
    if (result.ok) {
      form.reset();
      success.hidden = false;
    }
  });
}
