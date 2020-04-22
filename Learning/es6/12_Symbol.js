// Symbol
// ES6 引入了一种新的原始数据类型Symbol，
// 表示独一无二的值。前7种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）、Symbol。

// 出现原因 ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。

let s = Symbol('hello');
let sss = Symbol('hello');
console.log(s);
console.log(typeof s);

// 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。它是一种类似于字符串的数据类型。
/* 特点：1 接受一个字符串作为参数；
 *      2 参数是一个对象时，就会调用该对象的toString方法，将其转为字符串。
 *      3 Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
 *      4 Symbol 值不能与其他类型的值进行运算，会报错。
 *      5 Symbol 值可以显式转为字符串。
 *      6 Symbol 值也可以转为布尔值，但是不能转为数值。
*/

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();
console.log(s1 === s2) // false
// 有参数的情况
let s3 = Symbol('foo');
let s4 = Symbol('foo');
console.log(s3 === s4) // false

// let sym = Symbol('My symbol');
// console.log("your symbol is " + sym); // TypeError: can't convert symbol to string

let sym1 = Symbol('My symbol');
console.log(String(sym1)) // 'Symbol(My symbol)'
console.log(sym1.toString()) // 'Symbol(My symbol)'
let sym2 = Symbol();
console.log(Boolean(sym2)) // true
console.log(!sym2) // false
// console.log(Number(sym2)) // TypeError
// console.log(sym2 + 2) // TypeError

console.log('-------------分割线-------------');
// Symbol.prototype.description 
// Symbol的一个描述
let sym3 = Symbol('foo');
console.log(sym3.description) // "foo"

// 作为属性名的 Symbol
// Symbol 值是唯一的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
let sym4 = Symbol();
// 第一种写法
let a = {};
a[sym4] = 'Hello!';
console.log(a[sym4]);

// 第二种写法
let b = {
  [sym4]: 'Hello!'
};

// 第三种写法
let c = {};
Object.defineProperty(c, sym4, { value: 'Hello!' });

console.log(a[sym4], b[sym4], c[sym4])// Hello! Hello! Hello!
// 注意，Symbol 值作为对象属性名时，不能用点运算符。

console.log('Symbol()------------分割线------------');
let sym5 = Symbol();
let a1 = {
  [sym5]() {
    console.log('我是symbol');
  }
}
console.log(a1[sym5]);
// sym5 = Symbol('sym6');
a1[sym5] = '变化';
console.log(a1[sym5]);


//4. 实例使用：消除魔术字符串
const shapeType = {
  triangle: Symbol()

};
let abc = Symbol();

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
    case abc:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
};
getArea(shapeType.triangle, { width: 100, height: 100 });
getArea(abc, { width: 100, height: 100 });

// const shapeType = {
//   triangle: Symbol()
// };
// 上面代码中，我们把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合。如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

console.log('------------分割线------------')
// 5. 属性名的遍历
// Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。

//Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
const sym6 = {};
let a2 = Symbol('a');
let b2 = Symbol('b');
sym6[a2] = 'Hello';
sym6[b2] = 'World';
sym6.name = '张三';
console.log(Object.getOwnPropertySymbols(sym6)); //[ Symbol(a), Symbol(b) ]
// 另一个新的 API，Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
console.log(Reflect.ownKeys(sym6)); //[ 'name', Symbol(a), Symbol(b) ]

// 由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

// 6.Symbol.for()，Symbol.keyFor()
// 有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
// Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
let sym7 = Symbol.for('777');
let sym8 = Symbol.for('777');
console.log(sym7 === sym8); // true

// Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
let sym9 = Symbol.for("foo");
console.log(Symbol.keyFor(sym9)) // "foo"

let sym10 = Symbol("foo");
console.log(Symbol.keyFor(sym10)) // undefined
// 上面代码中，变量s2属于未登记的 Symbol 值，所以返回undefined


// 注意，Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。不受函数影响
function foo8() {
  return Symbol.for('bar');
}
let sym11 = foo8();
let sym12 = Symbol.for('bar');
console.log(sym11 === sym12); // true
//Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。
 

console.log('--------------分割线--------------');
// 8.内置的 Symbol 值
// 1)Symbol.hasInstance
// Symbol.hasInstance属性，指向一个内部方法.其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
  
}
// 等同于
// const Even = {
//   [Symbol.hasInstance](obj) {
//     return Number(obj) % 2 === 0;
//   }
// };
console.log(1 instanceof Even); // false
console.log(2 instanceof Even); // true
console.log(12345 instanceof Even); // false

// 2)Symbol.isConcatSpreadable
// Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
let arr1 = ['c', 'd'];
console.log(['a', 'b'].concat(arr1, 'e')); // ['a', 'b', 'c', 'd', 'e']
console.log(arr1[Symbol.isConcatSpreadable]); // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
console.log(['a', 'b'].concat(arr2, 'e')); // ['a', 'b', ['c','d'], 'e']
// 上面代码说明，数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。该属性等于true时，也有展开的效果。
console.log('-----------------------------')
// 类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开。
let obj = {length: 2, 0: 'c', 1: 'd'};
console.log(['a', 'b'].concat(obj, 'e')); // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
console.log(['a', 'b'].concat(obj, 'e')); // ['a', 'b', 'c', 'd', 'e']

// 3)Symbol.species
// Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
class MyArray extends Array {
}

let arr3 = new MyArray(1, 2, 3);
let arr4 = arr3.map(x => x);
let arr5 = arr3.filter(x => x > 1);

console.log(arr4 instanceof MyArray); // true
console.log(arr5 instanceof MyArray); // true
// 上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象.但实际上它们也是MyArray的实例。

class MyArray1 extends Array {
  static get [Symbol.species]() { return Array; }
}

let arr6 = new MyArray1();
let arr7 = arr6.map(x => x);

console.log(arr7 instanceof MyArray1) // false
console.log(arr7 instanceof Array) // true

//上面代码中，arr7生成的衍生对象，就不是MyArray的实例，而直接就是Array的实例。
//由于定义了Symbol.species属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子也说明，定义Symbol.species属性要采用get取值器。

//总之，Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。

// 4)Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
// 5)Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
// 6)Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。
// 7)Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。
// 8)Symbol.iterator属性，指向该对象的默认遍历器方法。

// 总结：Symbol别人无法改些你的方法；类似于Symbol.replace无法被改写。
