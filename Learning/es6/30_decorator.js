// decorator装饰器
// 装饰器是一种函数，写成@ + 函数名。它可以放在类和类方法的定义前面。用来装饰函数和类。
// 可以这样实现
function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}
const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'
// 上面代码通过装饰器mixins，把Foo对象的方法添加到了MyClass的实例上面。