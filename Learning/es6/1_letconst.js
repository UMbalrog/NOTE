var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined

//因为变量提升问题，函数内部的tmp覆盖了外部的tmp，所以undefined

/*------------------------------------------*/

{
  let yy = '哈哈哈';
  console.log(yy); 
}
//块级作用域

const constant = '123';

//将一个对象彻底冻结
let constantfun = (obj) => {
  Object.freeze(obj);
  Object.key(obj).forEach((key,i) => {
    if(typeof obj[key] === 'object'){
      constantfun(obj[key]);
    }
  })
}
