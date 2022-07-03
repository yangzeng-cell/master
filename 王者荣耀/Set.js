const set = new Set();
set.add({});
set.add({});
set.add(null);
set.add(undefined);
set.add(-0);
set.add(0);
set.add(+0);
set.add(NaN);
set.add(NaN);

const keys = set.keys();

console.log(keys);
