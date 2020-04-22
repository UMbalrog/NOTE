const [setName, setAge] = [Symbol('setName'), Symbol('setAge')],
  privateData = new WeakMap()

class Person {
  constructor (name, age) {
    privateData.set(this, { name, age })
  }

  [setName] (name) {
    privateData.get(this).name = name
  }

  [setAge] (age) {
    privateData.get(this).age = age
  }

  getAge () {
    return privateData.get(this).age
  }

  getName () {
    return privateData.get(this).name
  }
}

let Per = new Person();

console.log(Per)