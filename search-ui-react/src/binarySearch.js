function binarySearch(array, value, start = 0, end = array.length, numSerc = 0) {
    // var start = start === undefined ? 0 : start;
    // var end = end === undefined ? array.length : end;
    numSerc++
    if (start > end) {
        return 'Number not found. Number of searches required: ' + numSerc;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];
    // console.log(numSerc)
    // console.log(start, end);
    console.log(array)
    console.log(item)
    if (item === value) {
        return 'Number of searches: ' + numSerc;
    }
    else if (item < value) {
        return binarySearch(array, value, index + 1, end, numSerc);
    }
    else if (item > value) {
        return binarySearch(array, value, start, index - 1, numSerc);
    }
  };

  export default binarySearch;