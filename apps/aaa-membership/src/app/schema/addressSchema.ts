import { z } from 'zod';
import { commonSchema } from './commonSchema';

export const addressSchema = z.object({
  isManuallyInput: z.boolean().optional(),
  addressLine1: commonSchema.requiredField,
  addressLine2: z.string(), //keep it in case historical data need it
  suburb: z.string(), //some address may not have suburb, only required for Au
  state: z.string(),
  postcode: z.string(),
  // country: commonSchema.requiredSelectField,//australia only
  lat: z.number().optional(),
  lng: z.number().optional(),
  formattedAddress: z.string().optional(),
});

//May need update to atom address format
export type IAddress = z.infer<typeof addressSchema>;

export const addressToString = (address?: IAddress): string => {
  if (!address) return '';

  if (address?.formattedAddress && !address.isManuallyInput) {
    return `${address?.formattedAddress}` || ''; //if formatted address existing, just use formatted address
  }
  return `${address.addressLine1 || ''}${
    address.addressLine2 ? ` ${address.addressLine2}` : ''
  }${address.addressLine1 || address.addressLine2 ? ',' : ''} ${address.suburb || ''} ${address.state || ''} ${
    address.postcode || ''
  } `
    .trim() // Remove leading and trailing whitespace
    .replace(/ +/g, ' '); // Replace multiple spaces with a single space
};
