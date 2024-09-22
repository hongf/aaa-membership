export const checkForDuplicates = (arr?: (string | number)[]): boolean => {
  if (!arr || arr.length < 2) return true;
  return new Set(arr).size !== arr.length;
};

//find first duplicated item in array
export const indexForFirstDuplicate = (arr?: (string | number)[]): number => {
  if (!arr || arr.length < 2) return -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr.lastIndexOf(arr[i]) !== i) {
      //return i;
      return arr.lastIndexOf(arr[i]);
    }
  }
  return -1;
};
