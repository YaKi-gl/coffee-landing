import { describe, expect, it } from 'vitest';
import { normalizePhone, sendBooking, validateBooking } from './booking.js';

describe('normalizePhone', () => {
  it('убирает пробелы, скобки и дефисы', () => {
    expect(normalizePhone('+7 (999) 123-45-67')).toBe('79991234567');
  });

  it('заменяет ведущую 8 на 7', () => {
    expect(normalizePhone('8 999 123 45 67')).toBe('79991234567');
  });
});

describe('validateBooking', () => {
  it('принимает корректные данные', () => {
    expect(validateBooking({ name: 'Анна', phone: '+7 999 123-45-67' })).toEqual({});
  });

  it('требует имя', () => {
    expect(validateBooking({ name: '  ', phone: '89991234567' }).name).toBeTruthy();
  });

  it('отклоняет слишком короткий номер', () => {
    expect(validateBooking({ name: 'Анна', phone: '123' }).phone).toBeTruthy();
  });
});

describe('sendBooking', () => {
  it('возвращает заявку с нормализованным телефоном', async () => {
    const result = await sendBooking({ name: 'Анна', phone: '8 (999) 123-45-67' }, { delay: 0 });
    expect(result.ok).toBe(true);
    expect(result.booking.phone).toBe('79991234567');
  });
});
