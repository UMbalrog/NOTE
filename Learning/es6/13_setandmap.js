// Set 和 Map 数据结构
// 1.  Set  ES6一种新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set本身是一个构造函数，用来生成 Set 数据结构。
const a1 = new Set([2, 3, 5, 4, 5, 2, 2]);

const b1 = new Set([2, 3, {a:23}, {a:23}, '8', '8', 8, [123], [123]]);

// console.log('a1',a1); // 2 3 5 4
// console.log(Object.prototype.toString.apply(a1)); //Set

for (let i of b1) {
  console.log(i);
}
console.log('-----------分割线----------')
for (let k in b1){
  console.log(k)
}
// 2 3 { a: 23 } { a: 23 } 8 [ 123 ] [ 123 ]

// Set函数可以接受一个数组（或者具有 iterable(迭代器) 接口的其他数据结构）作为参数，用来初始化。

let items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(items.size) // 5
// let list1 = new Set(document.querySelectorAll('div'));
// console.log(list1)

// Set 加入值的时候时判断两个值是否相等，使用的算法叫做“Same-value-zero equality”，类似于精确相等（===），主要的区别是Set 中 NaN 等于 NaN。而且实际中NaN!==NaN。另外，两个对象总是不相等的。

console.log('-----------分割线-----------');
// Set 实例的属性和方法
/*
 * Set.prototype.constructor：构造函数，默认就是Set函数。
 * Set.prototype.size：返回Set实例的成员总数。
 * Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
 * Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
 * Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
 * Set.prototype.clear()：清除所有成员，没有返回值。
*/
//Array.from 方法可以将 Set 结构转为数组
let from = new Set([1, 2, 3, 4, 5]);
console.log(Array.from(from)); //[ 1, 2, 3, 4, 5 ]

//遍历操作 Set 结构的实例有四个遍历方法，可以用于遍历成员
/*
 * Set.prototype.keys()：返回键名的遍历器
 * Set.prototype.values()：返回键值的遍历器
 * Set.prototype.entries()：返回键值对的遍历器
 * Set.prototype.forEach()：使用回调函数遍历每个成员
*/
console.log('red-----------分割线-----------');
let set2 = new Set(['red', 'green', 'blue']);

for (let item of set2.keys()) {
  console.log(item);
}
// red green blue

for (let item of set2.values()) {
  console.log(item);
}
// red green blue

for (let item of set2.entries()) {
  console.log(item);
}
// ["red", "red"] ["green", "green"] ["blue", "blue"]
// Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致.
let set3 = new Set(['red', 'green', 'blue']);
for (let x of set3) {
  console.log('forof', x);
};
let set4 = new Set([1, 4, 9]);
set4.forEach((value, key) => console.log(key + ' : ' + value));
// 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。
let set5 = new Set(['red', 'green', 'blue']);
console.log([...set5]);
// ['red', 'green', 'blue']
// 数组的map和filter方法也可以间接用于 Set 了。
let set6 = new Set([1, 2, 3]);
set6 = new Set([...set6].map(x => x * 2));
console.log(set6);
// 返回Set结构：{2, 4, 6}

console.log('WeakSet----------分割线-----------');
// WeakSet
// WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。首先，WeakSet 的成员只能是对象，而不能是其他类型的值.
// 特点：1、 WeakSet 中的对象都是弱引用，垃圾回收机制不考虑 WeakSet 对该对象的引用，成员会随时消失。
//      2、 WeakSet 不可遍历。

let wa = [[1, 2], [3, 4]];
let ws = new WeakSet(wa);
console.log(ws);
// 注意：是wa数组的成员成为 WeakSet 的成员，而不是wa数组本身。这意味着，数组的成员只能是对象。
// let wb = [3, 4];
// let ws1 = new WeakSet(wb);
// console.log(ws1); //报错
// Uncaught TypeError: Invalid value used in weak set(…)

// WeakSet 结构有以下三个方法。
/*
 * WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
 * WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员.
 * WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
*/

// WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

// Map
// Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
let map = new Map();
let mo = {p: 'Hello World'};

map.set(mo, 'content')
console.log(map.get(mo)); // "content"

// 作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
// 不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。
let map1 = new Map([
  ['name', '张三', '李四'],
  ['title', 'Author'],
  ['age']
]);

console.log(map1.size); // 2
console.log(map1.get('name')); // "张三"
console.log(map1.get('title')); // "Author"
console.log(map1.get('age')); // undefined

// 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
const map2 = new Map();
// let abc = ['a'];
map2.set(['a'], 555);
console.log(map2.get(['a'])); // undefined
// 表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。 

// 由上可知，Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。=
// 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
console.log('----------分割线----------');
// Map实例的属性和操作方法
/*
 * Map.prototype.size  返回 Map 结构的成员总数。
 * Map.prototype.set(key, value) 方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
 * Map.prototype.get(key)  get方法读取key对应的键值，如果找不到key，返回undefined。
 * Map.prototype.has(key)  has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
 * Map.prototype.delete(key) delete方法删除某个键，返回true。如果删除失败，返回false。
 * Map.prototype.clear() clear方法清除所有成员，没有返回值。
 * 遍历方法
 * Map.prototype.keys()：返回键名的遍历器。
 * Map.prototype.values()：返回键值的遍历器。
 * Map.prototype.entries()：返回所有成员的遍历器。
 * Map.prototype.forEach()：遍历 Map 的所有成员。
*/
console.log('Map--------分割线---------')
// Map与其他数据结构的互相转换
// Map转为数组
let map3 = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
console.log([...map3]);

// Map 转为对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
let map4 = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(map4); // { yes: true, no: false }

// 对象转为 Map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
objToStrMap({yes: true, no: false}); // Map {"yes" => true, "no" => false}

// Map 转为 JSON 
// Map 的键名都是字符串，这时可以选择转为对象 JSON。
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}
let map5 = new Map().set('yes', true).set('no', false);
strMapToJson(map5); // '{"yes":true,"no":false}'

// Map 的键名有非字符串，这时可以选择转为数组 JSON。
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}
let map6 = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(map6) // '[[true,7],[{"foo":3},["abc"]]]'

// JSON 转为 Map
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes": true, "no": false}') // Map {'yes' => true, 'no' => false}

function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]') // Map {true => 7, Object {foo: 3} => ['abc']}


// WeakMap 
// WeakMap结构与Map结构类似，也是用于生成键值对的集合。
// 与Map有两点区别:
//  1.WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
//  2.WeakMap的键名所指向的对象，不计入垃圾回收机制。
//  3.不可遍历
// WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

// let wmp = new WeakMap();
// let element = document.getElementById('example');
// wmp.set(element, 'some information');
// wmp.get(element) // "some information"

// 总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

// WeakMap 的语法 
// WeakMap只有四个方法可用：get()、set()、has()、delete()。
// WeakMap 的用途
// 一是应用的典型场合就是 DOM 节点作为键名；
// 二是部署私有属性。
const _counter = new WeakMap();
const _action = new WeakMap();
class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}
const c = new Countdown(2, () => console.log('DONE'));
console.log(c);
c.dec()
c.dec() // DONE


/* 总结，
 * Set, 它类似于数组，但是成员的值都是唯一的，没有重复的值。Set本身是一个构造函数，用来生成 Set 数据结构。
 * WeakSet
 * WeakSet 结构与 Set 类似，也是不重复的值的集合，但是有几个区别。
 *  1、 WeakSet 的成员只能是对象，而不能是其他类型的值.
 *  2、 WeakSet 中的对象都是弱引用，垃圾回收机制不考虑 WeakSet 对该对象的引用，成员会随时消失。
 *  3、 WeakSet 不可遍历。

 * Map, 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
 * WeakMap, 结构与Map结构类似，也是用于生成键值对的集合。
 *  1.WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
 *  2.WeakMap的键名所指向的对象，不计入垃圾回收机制。
 *  3.不可遍历
*/