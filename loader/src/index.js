console.log("hello HXY!");

class Person {
  constructor(name){
    this._name = name
  }

  set name(name){
    this._name = name+1
  }
}

const person = new Person("HXY")
person.name = 1
console.log(person._name);