function a(obj){
    obj.a=2;
    obj={a:3};
    return obj;
}
const obj={a:1};
a(obj);
console.log(obj)
console.log(a(obj))