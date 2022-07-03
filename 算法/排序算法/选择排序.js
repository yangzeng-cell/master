import { swap } from "./冒泡排序";

export function SelectionSort(array, compareFn = defaultCompare) {
    const { length } = array;
    let minIndex;
    for (let i = 0; i < length; i++) {
        minIndex = i;
        for (let j = i; j < length - i; j++) {
            if (compareFn(array[minIndex], array[j]) === Compare.BIGGER_THEN) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            swap(array, i, minIndex);
        }
    }
    return array;
}

/**
 *
 * 选择排序是原址排序算法，首先会找到一个最小值并放到第一位，再把第二个最小值放在第二为
 */
