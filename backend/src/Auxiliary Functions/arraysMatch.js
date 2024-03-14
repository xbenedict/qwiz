const arraysMatch = (arr1, arr2) => {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Sort the arrays
  let sortedArr1 = arr1.slice().sort();
  let sortedArr2 = arr2.slice().sort();

  // Compare the sorted arrays
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) return false;
  }

  return true;
};

module.exports = arraysMatch;
