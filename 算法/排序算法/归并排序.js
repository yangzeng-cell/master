// 归并排序是第一个可以实际使用的算法，其时间复杂度为O(nlog(n)) 是一种分而治之的算法

export function mergeSort(array, compareFn = defaultCompare) {
    if (array.length > 0) {
        const { length } = array;
        const middle = Math.floor(length / 2);
        let left = mergeSort(array.slice(0, middle), compareFn);
        let right = mergeSort(array.slice(middle, length), compareFn);
        array = merge(left, middle, right);
    }
    return array;
}

export function merge(left, right, compareFn) {
    let i = 0;
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
        result.push(
            compareFn(left[i], right[j]) === compareFn.LESS_THAN
                ? left[j++]
                : right[j++]
        );
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
