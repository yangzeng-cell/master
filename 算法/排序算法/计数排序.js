// 是一个分布式排序算法，分布式排序使用以组织好的辅助数据结构称为桶，然后合并，得到排序好的数组，计数排序会使用一个临时数组，时间复杂度是0（n+k）
// 是用来排序整数的算法
export function countingSort(array) {
    if (array.length < 2) {
        return array;
    }
    const maxValue = findMaxValue(array);
    const counts = new Array(maxValue + 1);
    array.forEach((element) => {
        if (!counts[element]) {
            counts[element] = 0;
        }
        counts[element]++;
    });
    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while (count > 0) {
            array[sortedIndex++] = i;
            count--;
        }
    });
    return array;
}

export function findMaxValue(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (max < array[i]) {
            max = array[i];
        }
    }
    return max;
}

export function findMinValue(array) {
    let min = array[0];
    for (let i = 1; i < array.length; i++) {
        if (min > array[i]) {
            min = array[i];
        }
    }
    return min;
}
