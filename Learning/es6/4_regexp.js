// 六、正则的扩展
/**
 * @example 1正则的构造
 * String.fromCodePoint()
*/

let reg = new RegExp(/abc/ig, 'i').flags; //原有正则对象的修饰符是ig，它会被第二个参数i覆盖。
// console.log(reg);

// const r1 = /hello/;
// const r2 = /hello/u;
// console.log(r1.unicode);
// console.log(r2.unicode);
