import { addressSchema } from './addressSchema';
import { commonSchema } from './commonSchema';
import { z } from 'zod';

export enum EnumStatus {
  ACTIVE = 'a',
  INACTIVE = 'I',
}
export const memberSchema = z.object({
  id: z.string().optional(),
  title: commonSchema.requiredField,
  lastName: commonSchema.requiredField,
  firstName: commonSchema.requiredField,
  address: addressSchema,
  phone: commonSchema.requiredField,
  email: commonSchema.requiredEmail,
  driverLicenseNumber: z.string().optional(),
  occupation: z.string().optional(),
  dob: commonSchema.dob,
  countryOfBirth: z.string().optional(),
  memberType: commonSchema.requiredSelectField,

  admissionDate: z.string().optional(),
  nextOfKin: z.string().optional(),
  nokPhone: z.string().optional(),

  comment: z.string().optional(),
  status: z.string().optional(),
  membershipStatedFrom: z.string().optional(),
  expiryDate: z.string().optional(),
});
export type IMember = z.infer<typeof memberSchema>;
