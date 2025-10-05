// Answer for item #2 Write a function to merge two sorted arrays without using built-in sort.
export function mergeTwoSortedArrays<T>(
  array1: T[],
  array2: T[],
  isAscending: boolean = true,
): T[] {
  // Explicit conditions for empty arrays
  if (array1.length === 0 && array2.length === 0) {
    return [];
  }

  if (array1.length === 0) return array2;
  if (array2.length === 0) return array1;

  // Validations for data type
  const arrayOneType = typeof array1[0];
  const arrayTwoType = typeof array2[0];

  if (arrayOneType !== arrayTwoType) {
    return [];
  }

  const isArrayOneOfSameType = array1.every(
    (item) => typeof item === arrayOneType,
  );
  const isArrayTwoOfSameType = array2.every(
    (item) => typeof item === arrayTwoType,
  );

  if (!isArrayOneOfSameType || !isArrayTwoOfSameType) {
    return [];
  }



  // Helper functions
  function findIndexOfStartPoint(array: T[]): number {
    if (array.length <= 1) return 0;

    const isArrayAscending = array[0] < array[array.length - 1];

    if (isArrayAscending) {
      return isAscending ? 0 : array.length - 1;
    } else {
      return isAscending ? array.length - 1 : 0;
    }
  }

  // Main logic
  const mergedArray: T[] = [];

  let pointerArrayOne = findIndexOfStartPoint(array1);
  let pointerArrayTwo = findIndexOfStartPoint(array2);

  const pointMovementDirectionForArrayOne = pointerArrayOne === 0 ? 1 : -1;
  const pointMovementDirectionForArrayTwo = pointerArrayTwo === 0 ? 1 : -1;

  const isArrayOnePointerValid = () =>
    pointMovementDirectionForArrayOne === 1
      ? pointerArrayOne < array1.length
      : pointerArrayOne >= 0;
  const isArrayTwoPointerValid = () =>
    pointMovementDirectionForArrayTwo === 1
      ? pointerArrayTwo < array2.length
      : pointerArrayTwo >= 0;

  const shouldTakeFromArrayOne = (val1: T, val2: T) => {
    return isAscending ? val1 <= val2 : val1 >= val2;
  };

  while (isArrayOnePointerValid() && isArrayTwoPointerValid()) {
    const val1 = array1[pointerArrayOne];
    const val2 = array2[pointerArrayTwo];

    if (shouldTakeFromArrayOne(val1, val2)) {
      mergedArray.push(val1);
      pointerArrayOne += pointMovementDirectionForArrayOne;
    } else {
      mergedArray.push(val2);
      pointerArrayTwo += pointMovementDirectionForArrayTwo;
    }
  }

  while (isArrayOnePointerValid()) {
    mergedArray.push(array1[pointerArrayOne]);
    pointerArrayOne += pointMovementDirectionForArrayOne;
  }

  while (isArrayTwoPointerValid()) {
    mergedArray.push(array2[pointerArrayTwo]);
    pointerArrayTwo += pointMovementDirectionForArrayTwo;
  }

  return mergedArray;
}

// Answer for item #3 Given a list of integers, return the first duplicate number (optimize for time and space).
export function GetIndexOfFirstDuplicate(array: number[]): [number, number] {
  const hashSet = new Set<number>();

  for (let i = 0; i < array.length; i++) {
    if (hashSet.has(array[i])) {
      return [array[i], i];
    }
    hashSet.add(array[i]);
  }

  return [-1, -1];
}
