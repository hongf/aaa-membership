 
import { IGoogleAddress } from './IGoogleAddressProps';


export const getGoogleAddressOption = (auOnly: boolean | undefined) => {
  if (auOnly)
    return {
      types: ['address'],
      componentRestrictions: { country: 'AU' },
    };
  else
    return {
      types: ['address'],
    };
};

export const getValueFromGoogleAddressObject = (
  address: IGoogleAddress,
  types: string[]
): string => {
  if (!address || !address.formatted_address || !types) return '';
  return types
    .map((type) => {
      const matchedCmp = address?.address_components?.find(
        (x) => x.types.indexOf(type) >= 0
      );
      return matchedCmp ? matchedCmp.short_name : '';
    })
    .join(' ');
};
 