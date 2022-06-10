async function foo() {
  const a = await bar();
  console.log(a);

  return a;
}

function bar() {
  return new Promise((resolve, rejected) => {
    resolve("111111");
  });
}

console.log(foo());
