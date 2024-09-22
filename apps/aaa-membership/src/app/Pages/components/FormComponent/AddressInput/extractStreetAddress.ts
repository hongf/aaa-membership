export const extractStreetAddress = (
  formattedAddress: string,
  country: string,
  state: string,
  postcode: string,
  suburb: string,
): string => {
  // Function to escape special characters for use in a regular expression
  const escapeRegExp = (text: string): string =>
    text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  // Create a regex pattern to remove country, state, postcode, and suburb
  const componentsToRemove = [country, state, postcode, suburb]
    .filter((component) => component) // Filter out empty components
    .map((component) => escapeRegExp(component)) // Escape special characters for regex
    .join('|'); // Combine into a single regex pattern

  // Create the final regex to remove the components
  const regex = new RegExp(`\\b(${componentsToRemove})\\b`, 'gi');

  // Replace the components with an empty string
  let streetAddress = formattedAddress.replace(regex, '').trim();

  // Clean up any remaining commas, spaces, or redundant characters
  streetAddress = streetAddress
    .replace(/,\s*,/g, ',')
    .replace(/,\s*$/, '')
    .trim();

  return streetAddress;
};
