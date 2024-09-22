import { z } from 'zod';
import { commonSchema } from './commonSchema';

export const userLoginSchema = z.object({
  userName: commonSchema.requiredField,
  password: commonSchema.requiredField,
});

export type IUserLogin = z.infer<typeof userLoginSchema>;
