import { IRefDataItem } from '../../schema/IRefDataItem';

export const RefPersonTitle: IRefDataItem[] = [
  'Mr',
  'Mrs',
  'Ms',
  'Dr',
  'Hon',
  'Jr',
  'Prof',
  'Other',
].map((x) => ({ code: x, name: x }));
