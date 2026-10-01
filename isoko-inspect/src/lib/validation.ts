import type { FieldErrors, InspectionDraft } from '../types';

export const STALL_CODE_PATTERN = /^MSZ-[A-F]\d{2}$/;
export const LOCAL_MOBILE = /^07[2-9]\d{7}$/;
export const INTL_MOBILE = /^\+2507[2-9]\d{7}$/;

export function normalizeStallCode(value: string): string {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, '')
    .toUpperCase();
}

export function normalizePhone(value: string): string {
  const raw = String(value ?? '').replace(/[^\d+]/g, '');
  if (!raw) return '';

  if (raw.startsWith('+250')) {
    return `+${raw.slice(1).replace(/\s+/g, '')}`;
  }

  if (raw.startsWith('250')) {
    return `+${raw}`;
  }

  if (raw.startsWith('0')) {
    return `+250${raw.slice(1)}`;
  }

  return raw.startsWith('+') ? raw : `+${raw}`;
}

export function formatRwandaPhone(value: string): string {
  const normalized = normalizePhone(value);
  const digits = normalized.replace(/\D/g, '');
  if (digits.length !== 12) return normalized;

  return `+250 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 12)}`;
}

export function isValidRwandaPhone(value: string): boolean {
  const normalized = normalizePhone(value);
  return LOCAL_MOBILE.test(normalized.replace(/^\+250/, '0')) || INTL_MOBILE.test(normalized);
}

export function validateInspection(draft: InspectionDraft): { ok: boolean; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const vendorAlias = draft.vendorAlias.trim();
  if (!vendorAlias) {
    errors.vendorAlias = 'Vendor alias is required.';
  } else if (vendorAlias.length < 3 || vendorAlias.length > 40) {
    errors.vendorAlias = 'Use 3 to 40 characters.';
  } else if (!/^[A-Za-z0-9][A-Za-z0-9 '.-]*$/.test(vendorAlias)) {
    errors.vendorAlias = "Only letters, numbers, spaces, and . - ' are allowed.";
  }

  const stallCode = normalizeStallCode(draft.stallCode);
  if (!stallCode) {
    errors.stallCode = 'Stall code is required.';
  } else if (!STALL_CODE_PATTERN.test(stallCode)) {
    errors.stallCode = 'Use a valid code like MSZ-A12.';
  }

  if (!draft.category) {
    errors.category = 'Please select a category.';
  }

  const contactNumber = draft.contactNumber.trim();
  if (!contactNumber) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!isValidRwandaPhone(contactNumber)) {
    errors.contactNumber = 'Use a valid Rwanda mobile number.';
  }

  if (!draft.riskLevel) {
    errors.riskLevel = 'Select a priority risk level.';
  }

  if (!draft.consent) {
    errors.consent = 'Consent is required before saving the inspection.';
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

export function kigaliStamp(iso: string): string {
  if (!iso) return '—';

  try {
    const date = new Date(iso);
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Kigali',
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    });

    const rendered = formatter.format(date);
    const suffix = rendered.includes('GMT') ? ' CAT' : '';
    return `${rendered.replace(/GMT\+?\d+:?\d*/gi, '').trim()}${suffix}`.replace(/\s+/g, ' ');
  } catch {
    const date = new Date(iso);
    const adjusted = new Date(date.getTime() + 2 * 60 * 60 * 1000);
    const day = adjusted.getUTCDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' }).format(adjusted);
    const year = adjusted.getUTCFullYear();
    const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' }).format(adjusted);
    const hours = adjusted.getUTCHours().toString().padStart(2, '0');
    const minutes = adjusted.getUTCMinutes().toString().padStart(2, '0');
    return `${weekday}, ${day} ${month} ${year}, ${hours}:${minutes} CAT`;
  }
}
