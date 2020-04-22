//四、字符串的扩展
let text = String.fromCodePoint(0x20BB7);
// console.log(text);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//6实例：template模板编译
let data = {
  supplies: ["broom", "mop", "cleaner"]
}
let template = `
  <ul>
    <% for(let i=0; i<data.supplies.length; i++) {%>
      <li><%= data.supplies[i] %></li>
    <% } %>
  </ul>
`;

function complie(template){
  let evalExpr = /<%=(.+?)%>/g;
  let expr = /<%([\s\S]+?)%>/g;
  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');
  template = 'echo(`'+template+'`);';
  let script =
  `(function parse(data){
    let output = "";
    function echo(html){
      output += html;
    }
    ${ template }
    return output;
  })`;
  return script;
};

let parse = eval(complie(template));
// console.log(parse(data));
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//7、标签模板
// alert(123) === alert`123`;

let a = 5;
let b = 10;
// tag`holle ${a+b} world ${a*b}`;
// tag(['holle','world',''], 15, 50);

function tag(s,v1,v2){
  console.log(s[0]);
  console.log(s[1])
  console.log(s[2])
  console.log(v1)
  console.log(v2);
  return 'ok';
};

let total = 30;
// let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  let result = '';
  let i = 0;

  while (i < literals.length) {
    console.log(i)
    result += literals[i++];
    if (i < arguments.length) {
      console.log('内',i);
      result += arguments[i];
    }
  }

  return result;
}

// console.log(msg); // "The total is 30 (31.5 with tax)"

// tag`First line\n line`;
// function tag(string){
//   console.log(string.raw);
// }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//五、字符串新增的方法
/**
 * @example 1
 * String.fromCodePoint()
*/
String.fromCharCode(0x20BB7) //不能识别码点大于0xFFFF的字符
// "ஷ"
String.fromCodePoint(0x20BB7) //可以识别大于0xFFFF的字符与codePointAt()方法相反。
// "𠮷"

/**
 * @example 2
 * String.raw()
*/
String.raw`Hi\n${2+3}!` //该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
String.raw`Hi\\n` === "Hi\\\\n"

/**
 * @example 3
 * codePointAt()   可解决之前方法 charCodeAt() 解不了的字符串的解码问题
 * codePointAt() 方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
*/
let s = '吉';
let m = '𠮷';
// console.log(m.codePointAt(0));

function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
// console.log(is32Bit("𠮷")); // true
// console.log(is32Bit("a")) // false

/**
 * @example 4
 * normalize()   unicode 正规化
*/

/**
 * @example 5
 * 类似于indexOf的作用
 * includes()：返回布尔值，表示是否找到了参数字符串。
 * startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
 * endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
*/

// let s5 = 'Hello world!';
// s5.includes('o');
// s5.startsWith('H');
// s5.endsWith('!');

/**
 * @example 6
 * repeat() 返回一个新字符串，表示将原字符串重复n次。
*/

// console.log('hello'.repeat(5)); //'hellohellohellohellohello'
// console.log('hello'.repeat(2.9)); //'hellohello'
// console.log('hello'.repeat(NaN)); //''
// console.log('hello'.repeat(-0.3)); //''
// console.log('hello'.repeat(-1)); //RangeError
// console.log('hello'.repeat(Infinity)); //RangeError
 
/**
 * @example 7
 * 如果某个字符串不够指定长度，会在头部或尾部补全。
 * padStart() 用于头部补全，padEnd() 用于尾部补全。
 * 常用于数字补全或提示补全
 * '1'.padStart(10, '0') // "0000000001"
 * '12'.padStart(10, '0') // "0000000012"
 * '123456'.padStart(10, '0') // "0000123456"
 * '12'.padStart(10, 'YYYY-MM-DD') //YYYY-MM-12
 * '2019'.padEnd(10, '-MM-DD') //2019-MM-DD
*/

// 'abc'.padStart(10, '0123456789') // '0123456abc'

/**
 * @example 8
 * 它们的行为与 trim() 一致，trimStart() 消除字符串头部的空格，trimEnd() 消除尾部的空格。
*/