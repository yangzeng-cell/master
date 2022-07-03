const promise = new Promise((resolve, reject) => {
  reject("aaaa");
});

promise
  .then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err, "1111");
    }
  )
  .catch((err) => {
    console.log(err, "2222");
  });
