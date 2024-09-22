const baseUrl = `/pages${process.env['NX_PUBLIC_ER_FORM_URL_PREFIX']}`;
const len = baseUrl.length;

export const getFormBasePath = (pathname: string, formCode: string): string => {
  return `${pathname.substring(0, pathname.indexOf(baseUrl) + len)}/${formCode}`;
};

// formCode is not required for receipt
export const getFormReceiptBasePath = (pathname: string): string =>
  pathname.substring(0, pathname.indexOf(baseUrl) + len) + '-receipt/';
