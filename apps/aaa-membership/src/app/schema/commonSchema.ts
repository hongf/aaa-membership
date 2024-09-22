 
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as z from 'zod';
import { ErrorMessages } from './ErrorMessages';
import { isValidEmail, isValidUrl } from '../utils/stringHelper';

dayjs.extend(customParseFormat);

const removeTags = (str: string): string => {
  if (!str) return '';
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
};

export const requiredStringSchema = z
  .string({
    required_error: ErrorMessages.required,
    invalid_type_error: ErrorMessages.required,
  })
  .min(1, ErrorMessages.required);

export const commonSchema = {
  requiredField: requiredStringSchema,
  requiredHtmlField: z.string().refine((val) => removeTags(val).length > 0, {
    message: ErrorMessages.required,
  }),
  requiredSelectField: z
    .string({
      required_error: ErrorMessages.required,
      invalid_type_error: ErrorMessages.required,
    })
    .min(1, ErrorMessages.requiredSelectField),
  requiredNumberSelectField: z
    .number({
      required_error: ErrorMessages.required,
      invalid_type_error: ErrorMessages.required,
    })
    .min(1, ErrorMessages.requiredSelectField),
  requiredBooleanField: z.boolean({
    required_error: ErrorMessages.requiredSelectField,
    invalid_type_error: ErrorMessages.requiredSelectField,
  }),

  positiveNumber: z //optional()
    .number()
    .or(
      z
        .string()
        .regex(/\d+/)
        .transform((val) => (val ? Number(val.replace(/,/g, '')) : '')),
    )
    .refine((n) => !n || n >= 0),

  requiredEmail: z
    .string()
    .min(1, { message: ErrorMessages.required })
    .superRefine((data, ctx) => {
      if (!isValidEmail(data)) {
        ctx.addIssue({
          message: ErrorMessages.invalidEmail,
          code: z.ZodIssueCode.custom,
        });
      }
    }),

  optionalEmail: z
    .string()
    .optional()
    .superRefine((data, ctx) => {
      if (data && !isValidEmail(data)) {
        ctx.addIssue({
          message: ErrorMessages.invalidEmail,
          code: z.ZodIssueCode.custom,
        });
      }
    }),

  url: z.string().superRefine((url, ctx) => {
    if (!isValidUrl(url)) {
      ctx.addIssue({
        message: ErrorMessages.invalidUrl,
        code: z.ZodIssueCode.custom,
      });
    }
  }),

  personName: z
    .string({
      required_error: ErrorMessages.required,
      invalid_type_error: ErrorMessages.required,
    })
    .min(1, ErrorMessages.required),
  //.regex(new RegExp("^[a-zA-Z '-]*$"), ErrorMessages.invalidPersonName),
  //Comment out to take care of existing historical data
  auDateStr: z.string().superRefine((data, ctx) => {
    console.log('auDateStr', data);
    if (!dayjs(data, 'DD/MM/YYYY', true).isValid()) {
      ctx.addIssue({
        message: ErrorMessages.required,
        code: z.ZodIssueCode.custom,
      });
    }
  }),

  removalDateStr: z.string().superRefine((data, ctx) => {
    if (data && !dayjs(data, 'YYYY-MM-DD', true).isValid()) {
      ctx.addIssue({
        message: ErrorMessages.invalidDate,
        code: z.ZodIssueCode.custom,
      });
    }
  }),

  pastDateStr: z.string().superRefine((data, ctx) => {
    if (data && !dayjs(data, 'YYYY-MM-DD', true).isValid()) {
      ctx.addIssue({
        message: ErrorMessages.invalidDate,
        code: z.ZodIssueCode.custom,
      });
    } else if (data && !dayjs(data, 'YYYY-MM-DD', true).isBefore(new Date())) {
      ctx.addIssue({
        message: ErrorMessages.pastDate,
        code: z.ZodIssueCode.custom,
      });
    }
  }),
  
  dob: z.string().superRefine((data, ctx) => {
    if (data && !dayjs(data, 'YYYY-MM-DD', true).isValid()) {
      // test is not valid date
      ctx.addIssue({
        message: ErrorMessages.invalidDate,
        code: z.ZodIssueCode.custom,
      });
    } else if (
      data &&
      !dayjs(data, 'YYYY-MM-DD', true).isBefore(new Date(), 'day')
    ) {
      // test is not in future or today
      ctx.addIssue({
        message: ErrorMessages.pastDate,
        code: z.ZodIssueCode.custom,
      });
    } else if (
      // test catch all 'before inception'
      data &&
      dayjs(data, 'YYYY-MM-DD', true).isBefore(new Date('1899-12-31'))
    ) {
      ctx.addIssue({
        message: ErrorMessages.dobHaveToLaterThan1900,
        code: z.ZodIssueCode.custom,
      });
    }
  }),
 
};
