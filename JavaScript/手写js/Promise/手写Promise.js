const PROMISE_STATUS_PADDING = "padding";
const PROMISE_STATUS_FULFILLED = "fulfilling";
const PROMISE_STATUS_REJECTED = "rejected";
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}
class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PADDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFn = [];
    this.onRejectedFn = [];
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PADDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PADDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onFulfilledFn.forEach((fn) => {
            fn(value);
          });
        });
      }
    };

    const rejected = (reason) => {
      if (this.status === PROMISE_STATUS_PADDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PADDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onRejectedFn.forEach((fn) => {
            fn(reason);
          });
        });
      }
    };
    try {
      executor(resolve, rejected);
    } catch (error) {
      rejected(error);
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnrejected = (err) => {
      throw err;
    };
    const defaultOnFuifilled = (value) => {
      return value;
    };
    onRejected = onRejected || defaultOnrejected;
    onFulfilled = onFulfilled || defaultOnFuifilled;
    return new HYPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_PADDING) {
        this.onFulfilledFn.push(() => {
          if (onFulfilled) {
            execFunctionWithCatchError(
              onFulfilled,
              this.value,
              resolve,
              reject
            );
          }
        });
        this.onRejectedFn.push(() => {
          if (onRejected) {
            execFunctionWithCatchError(
              onRejected,
              this.reason,
              resolve,
              reject
            );
          }
        });
      }
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(onFinally) {
    this.then(
      () => {
        onFinally();
      },
      () => {
        onFinally();
      }
    );
  }
  static resolve(value) {
    return new HYPromise((resolve, reject) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new HYPromise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(promises) {
    return new HYPromise((resolve, reject) => {
      let value = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            value.push(res);
            if (value.length === promises.length) {
              resolve(value);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
  static allSettled(promises) {
    return new HYPromise((resolve, reject) => {
      const result = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            result.push({
              status: PROMISE_STATUS_FULFILLED,
              value: res,
            });
            if (result.length === promises.length) {
              resolve(result);
            }
          },
          (error) => {
            result.push({
              status: PROMISE_STATUS_REJECTED,
              value: error,
            });
            if (promises.length === result.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }
  static race(promises) {
    return new HYPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }
  static any(promises) {
    let reason = [];
    return new HYPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, (err) => {
          reason.push(err);
          if (reason.length === promises.length) {
            reject(new AggregateError(reason));
          }
        });
      });
    });
  }
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1111);
  }, 3000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2222);
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(3333);
  }, 3000);
});

HYPromise.race([p1, p2, p3])
  .then((res) => {
    console.log("res:", res);
  })
  .catch((err) => {
    console.log("err:", err);
  });

// HYPromise.any([p1, p2, p3])
//   .then((res) => {
//     console.log("res:", res);
//   })
//   .catch((err) => {
//     console.log("err:", err.errors);
//   });
