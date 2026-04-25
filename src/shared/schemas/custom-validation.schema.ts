import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { z } from 'zod';

const phoneUtil = PhoneNumberUtil.getInstance();

export const phoneSchema = z.string().refine(
  (val) => {
    try {
      const parsed = phoneUtil.parseAndKeepRawInput(val);

      // Validation logic: must be valid and must match E164 format (+123456789)
      return (
        phoneUtil.isValidNumber(parsed) && phoneUtil.format(parsed, PhoneNumberFormat.E164) === val
      );
    } catch {
      return false;
    }
  },
  {
    message: 'Invalid phone number format. Must be in E.164 format (e.g., +1234567890)',
  },
);
