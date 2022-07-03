function getPrototypeChain(obj) {
  const pro = Object.getPrototypeOf(obj);
  console.log(pro);
  if (pro != null) {
    getPrototypeChain(pro);
  }
}

getPrototypeChain(new Function());
