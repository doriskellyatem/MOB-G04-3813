export function normalizePhone(value: string): string {
  const raw = String(value ?? '')
    .replace(/\s+/g, '')
    .replace(/-/g, '')
    .replace(/\+/g, '');

  if (!raw) return '';

  if (raw.startsWith('250')) {
    return `+${raw}`;
  }

  if (raw.startsWith('0')) {
    return `+250${raw.slice(1)}`;
  }

  if (raw.length === 9) {
    return `+250${raw}`;
  }

  return `+${raw}`;
}

export function formatRwandaPhone(value: string): string {
  const normalized = normalizePhone(value);
  const digits = normalized.replace(/\D/g, '');

  if (digits.length === 12) {
    return `+250 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 12)}`;
  }

  return normalized;
}
