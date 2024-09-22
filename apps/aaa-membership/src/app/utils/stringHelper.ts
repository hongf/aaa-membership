export const abbreviate_currency = function (
  num: string | number | undefined,
  fixed?: number,
): string {
  return `$${abbreviate_number(num, fixed)}`;
};

export const abbreviate_number = function (
  value: string | number | undefined,
  fixed?: number,
): string {
  if (!value) {
    return '0';
  } // terminate early
  const num = +value.toString().replace(/,/g, '');
  if (num < 0.001) {
    return `${num * 10000}‱`;
  }
  if (num < 0.01) {
    return `${num * 1000}‰`;
  }
  if (num < 1) {
    return `${num * 100}%`;
  }

  fixed = !fixed || fixed < 0 ? 3 : fixed; // number of decimal places to show
  const b = num.toPrecision(2).split('e'); // get power
  const k = b.length === 1 ? 0 : Math.floor(Math.min(+b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = +c < 0 ? c : Math.abs(+c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
};

export const convertToSentenceCase = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

export const isStringPositiveInteger = (str?: string): boolean => {
  if (!str) {
    return false;
  }
  if (typeof str !== 'string') {
    return false;
  }

  const num = Number(str.replace(/,/g, ''));

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
};

export const getCrlIdByAccessor = (accessor?: string): string =>
  `form-input-${accessor || ''}`;

export const getDuplicatesItems = (list: string[]): string[] =>
  list.filter((item, index) => list.indexOf(item) !== index);

export const isStringBlankOrUndefined = (src: string): boolean =>
  src === '' || src === undefined;

// todo, not able to work out how to detect if a field within dynamic yup schema :(,
// this is bit silly hardcore way, this one works for individual only
export const addIndividualLabelWithOptionalIndicator = (
  isPreview: boolean,
  label: string,
  mandatoryFields: string[],
  fieldName: string,
): string => {
  return `${label}${
    mandatoryFields.includes(fieldName) ? '' : !isPreview ? ' (optional)' : ''
  }`;
};

export const cleanUpStringAsNumber = (src?: string): string => {
  return src ? src.trim().replace(/\s+/g, '') : '';
};

export const cleanUpString = (src?: string): string => {
  return src ? src.trim().replace(/\s+/g, ' ') : '';
};

const preCleanUpStr = (src?: string): string =>
  cleanUpString(src).toUpperCase();

export const isStringSame = (src: string, tar: string): boolean =>
  preCleanUpStr(src) === preCleanUpStr(tar);

export const generateStrFromTemplate = (
  template: string,
  values: unknown[],
): string => {
  const inject = (str: string, obj: Record<string, unknown>) =>
    str.replace(/\${(.*?)}/g, (x, g) => obj[g] as string);
  return inject(template, { ...values });
};

export const formatStrWithPattern = (
  str?: string,
  pattern?: string,
): string | undefined => {
  if (!str || !pattern) return str;
  let i = 0;

  return pattern.replace(/#/g, (_) => str.replace(/ /g, '')[i++]);
};

export const getContextPathFromPathName = (pathname: string): string => {
  return pathname?.split('/')[1];
};

export const getToastOptionsByMessage = (message: string): any => {
  const width = message.length < 100 ? 360 : message.length < 200 ? 480 : 600;
  return {
    duration:
      (message.split(' ').length / 4 > 4 ? message.split(' ').length / 4 : 4) *
      1000,
    style: { width: `${width}px` },
  };
};

export const isValidUrl = (urlString: string): boolean => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

export const isValidEmail = (email: string): boolean => {
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  return regexp.test(email);
};

export const generateUrlParaByParaList = (
  list: { name: string; value?: string }[],
) =>
  list.reduce(
    (accumulator, currentValue) =>
      accumulator +
      generateUrlParaByNameAndValue(currentValue.name, currentValue.value),
    '',
  );

export const generateUrlParaByNameAndValue = (
  name: string,
  value?: string,
): string => (value ? `&${name}=${encodeURI(value.trim())}` : '');

type truncateOptions = {
  length: number;
  omission?: string;
  separator?: string;
};

export const truncate = (str: string, options: truncateOptions) => {
  const { length, omission = '...', separator } = options;

  if (str.length <= length) {
    return str;
  }

  let truncated = str;
  if (separator) {
    truncated = str.slice(0, length);
    const lastIndex = truncated.lastIndexOf(separator);
    if (lastIndex > -1) {
      truncated = truncated.slice(0, lastIndex);
    }
  } else {
    truncated = str.slice(0, length - omission.length);
  }

  return truncated + omission;
};
