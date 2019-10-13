function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = arr[arr.length - 1];
    const left = arr.filter((item, index) => item < mid && index < arr.length - 1 );
    const right = arr.filter(item => item > mid);
    return [...quickSort(left), mid, ...quickSort(right)]
}

export default quickSort