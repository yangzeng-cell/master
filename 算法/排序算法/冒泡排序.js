export function bubbleSort(array, compareFn = defaultCompare) {
    const { length } = array;
    for (let i = 0; i < length; i++) {
        for (letj = 0; j < length - 1 - i; j++) {
            if (compareFn(array[j], array[j + 1]) === compareFn.Bigger_then) {
                swap(array, j, j + 1);
            }
        }
    }
    return array;
}
export function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}
