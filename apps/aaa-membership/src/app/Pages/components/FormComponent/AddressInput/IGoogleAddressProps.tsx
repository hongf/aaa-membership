 
import { ReactNode } from 'react';
export interface IGoogleAddress {
  formatted_address: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}
 
  