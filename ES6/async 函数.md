async 函数有多种使用形式。

// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};

async函数返回一个 Promise 对象。

async函数内部return语句返回的值，会成为then方法回调函数的参数。

async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
上面代码中，函数f内部return命令返回的值，会被then方法回调函数接收到。
async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log('resolve', v),
  e => console.log('reject', e)
)
//reject Error: 出错了

async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
上面代码中，await命令的参数是数值123，这时等同于return 123。

另一种情况是，await命令后面是一个thenable对象（即定义了then方法的对象），那么await会将其等同于 Promise 对象。

class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();
// 1000
上面代码中，await命令后面是一个Sleep对象的实例。这个实例不是 Promise 对象，但是因为定义了then方法，await会将其视为Promise处理。

await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。

async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了

注意，上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。

任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。

async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world

另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。

async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world


错误处理
如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
防止出错的方法，也是将其放在try...catch代码块之中。
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}
如果有多个await命令，可以统一放在try...catch结构中。

async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }

  第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

let foo = await getFoo();
let bar = await getBar();
上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。

// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间。

第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。

async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}
上面代码会报错，因为await用在普通函数之中了。但是，如果将forEach方法的参数改成async函数，也有问题。

function dbFuc(db) { //这里不需要 async
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}
上面代码可能不会正常工作，原因是这时三个db.post()操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。

async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
另一种方法是使用数组的reduce()方法。

async function dbFuc(db) {
  let docs = [{}, {}, {}];

  await docs.reduce(async (_, doc) => {
    await _;
    await db.post(doc);
  }, undefined);
}
上面例子中，reduce()方法的第一个参数是async函数，导致该函数的第一个参数是前一步操作返回的 Promise 对象，所以必须使用await等待它操作结束。另外，reduce()方法返回的是docs数组最后一个成员的async函数的执行结果，也是一个 Promise 对象，导致在它前面也必须加上await。

上面的reduce()的参数函数里面没有return语句，原因是这个函数的主要目的是db.post()操作，不是返回值。而且async函数不管有没有return语句，总是返回一个 Promise 对象，所以这里的return是不必要的。

如果确实希望多个请求并发执行，可以使用Promise.all方法。当三个请求都会resolved时，下面两种写法效果相同。

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
第四点，async 函数可以保留运行堆栈。

const a = () => {
  b().then(() => c());
};
上面代码中，函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，而是继续执行。等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经消失了。如果b()或c()报错，错误堆栈将不包括a()。

现在将这个例子改成async函数。

const a = async () => {
  await b();
  c();
};
上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()。


async 函数的实现原理
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。
下面给出spawn函数的实现，基本就是前文自动执行器的翻版。
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}

实例：按顺序完成异步操作
实际开发中，经常遇到一组异步操作，需要按照顺序完成。比如，依次远程读取一组 URL，然后按照读取的顺序输出结果。

Promise 的写法如下。

function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
上面代码使用fetch方法，同时远程读取一组 URL。每个fetch操作都返回一个 Promise 对象，放入textPromises数组。然后，reduce方法依次处理每个 Promise 对象，然后使用then，将所有 Promise 对象连起来，因此就可以依次输出结果。

这种写法不太直观，可读性比较差。下面是 async 函数实现。

async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
上面代码确实大大简化，问题是所有远程操作都是继发。只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。

async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
上面代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。


