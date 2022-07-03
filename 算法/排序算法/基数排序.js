import { findMaxValue, findMinValue } from "./计数排序";

// 基数排序也是整数算法
export function redixSort(array, radixBase = 10) {
    if (array.length < 2) {
        return array;
    }
    const minValue = findMinValue(array);
    const maxValue = findMaxValue(array);
    let significantDigit = 1;
    while ((maxValue - minValue) / significantDigit >= 1) {
        array = countingSortForRasix(
            array,
            radixBase,
            significantDigit,
            minValue
        );
        significantDigit *= radixBase;
    }
    return array;
}

export function countingSortForRasix(
    array,
    radixBase,
    significantDigit,
    minValue
) {
    let bucketsIndex;
    const buckets = [];
    const aux = [];
    for (let i = 0; i < radixBase; i++) {
        buckets[i] = 0;
    }
    for (let i = 0; i < array.length; i++) {
        bucketsIndex = Math.floor(
            ((array[i] - minValue) / significantDigit) % radixBase
        );
        aux[--buckets[bucketsIndex]] = array[i];
    }
    for (let i = 0; i < array.length; i++) {
        array[i] = aux[i];
    }
    return array;
}
