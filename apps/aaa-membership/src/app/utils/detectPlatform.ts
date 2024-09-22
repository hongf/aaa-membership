export enum EnumPlatforms {
  BROWSER = 'browser',
  NODE = 'node',
  UNKNOWN = 'unknown',
}
export const detectEnvironment = (): EnumPlatforms => {
  if (typeof window !== 'undefined') {
    return EnumPlatforms.BROWSER;
  } else if (
    typeof process !== 'undefined' &&
    typeof process.versions !== 'undefined' &&
    typeof process.versions.node !== 'undefined'
  ) {
    return EnumPlatforms.NODE;
  } else {
    return EnumPlatforms.UNKNOWN;
  }
};
