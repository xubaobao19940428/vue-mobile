interface Person {
  name?: string,
  age?: number,
}

export const Person1 = function (person: Person) {
 
  return 'hello'+person.name + person.age
}
