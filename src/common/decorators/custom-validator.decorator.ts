import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

export function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidPhoneNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: function (phone: any, args: ValidationArguments) {
          if (typeof phone !== 'string') return false;

          try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            const parsed = phoneUtil.parseAndKeepRawInput(phone);

            // Must be in international format starting with + and valid
            return (
              phoneUtil.isValidNumber(parsed) &&
              phoneUtil.format(parsed, PhoneNumberFormat.E164) === phone
            );
          } catch {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid phone number`;
        },
      },
    });
  };
}
