var searchString = "?name=zhang&age=18";
const search = new URLSearchParams(searchString);

var obj = Object.fromEntries(search.entries());

console.log(obj);//{ name: 'zhang', age: '18' }
