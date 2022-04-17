function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}

function deepClone(originValue, map = new WeakMap()) {
  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }
  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }
  if (typeof originValue === "symbol") {
    return Symbol(originValue.description);
  }
  if (typeof originValue === "function") {
    return originValue;
  }
  if (!isObject(valueType)) {
    return originValue;
  }
  if (map.has(originValue)) {
    return map.get(originValue);
  }
  const newValue = Array.isArray(originValue) ? [] : {};
  map.set(originValue, newValue);
  for (const key in originValue) {
    if (Object.hasOwnProperty.call(newValue, key)) {
      newValue[key] = deepClone(originValue[key]);
    }
  }

  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (let key of symbolKeys) {
    newValue[key] = deepClone(originValue[key]);
  }
  return newValue;
}
