// console.log("JavaScript");

// let / var/ const
// var --> re-declared, re-assigned, function scope

// var a = 1;
// var a = 5;
// console.log(a); // 5

// function s(){
//     var b = 10;
// }
// console.log(b);

// let --> re-assigned but not re-declared, block scope

// let a = 12;
// a = 23;
// console.log(a); // 23

// const --> not re-assigned, not re-declared, block scope

// console.log(a);
// var a = 5;
// console.log(a);

// console.log(sum(5, 6));
// const sum = function(a, b){ // function expression hoisting not possible
//     return a + b;
// }
// console.log(sum(5, 6));

// function sum(){
//     console.log(arguments);
//     return arguments[0]+arguments[1]; // arguments 1 type ka object h
// }
// console.log(sum(5, 6));

// Arrow Function -->

// const sum = (a,b)=>{
//     return a + b;
// }
// console.log(sum(5, 6));

// Why array index statrt from 0 ?
// ->variable store base address and index or first value address.

// a = [1,2,3,4];
// console.log(a);

// map and filter create new array

// Function -->
// Hoisting - function declaration pr lagta h na ki function expression pr.

// function sum(a, b){ // function expression is not hoisted
//     return a + b;
// }
// console.log(sum(3,4)); // function call

// Arrow Function --> no this keyword, no argument keyword, no super keyword

// let sum = (a, b) => {
//     return a + b;
// }

// let x = sum(3, 4);
// console.log(x);

// console.log({a:1, b:2}); // object - (key, value pair)
// a, b -> Key
// 1, 2 -> Value

// rest operator ->

// const sum = (...rest) => { // saare arguments ko access kr sakte h.
//     console.log(console.log(rest));
// }

// sum(1,2,3,4,5,6,7,8,9);

// let a = [1,2,3,4,5,6,7,8,9];
// console.log(...a); // spread operator -> array ko spread kr diya

// let b = [1,2,7,5,4,3];
// console.log(Math.max(...b));

// HOF / callback function --> ksi function ko as a parameter receive karte h or function ko return karte h.

// IMPORTANT Interview Topic -->
// Closure --> inner function ko access kr sakte h chahe outer ki execution khtm ho gyi ho.

// function outer(){
//     var a = 3;

//     return function inner(){
//         a++;
//         console.log(a);
//     }
// }
// const f = outer();
// f();
// f();

// b = [1,2,3,4,5];
// console.log(b);

// new --> object create karne ma help karta h, runtime pr dynamic memory allocate karta h.

// const b = new Array(1,2,3,4,5);
// console.log(b);

// console.log(b.at(-1)) // negative indexing

// let c = b.map((item) => item * 2);
// console.log(c);

// let d = b.filter((item) => item % 2 == 0);
// console.log(d);

// student[] for dynamic key
// for normal key use dot operator

// const student = {
//     name: "Chirag",
//     age: 19,
//     university : "Chitkara University"
// }

// console.log(student);

// const person = new Object();
// person.name = "Chirag Nagpal",
// person.age = 19,
// console.log(person);

// greet:function(){
//     console.log(this.name); // this keyword jise object ko call karte h ose point karta h.
// };
// greet:() => {
//     console.log(this.name); // undefined
// };

const obj = {
    name: "Chirag",
    city: "Ambala City" 
}

// console.log(obj);

// for(let x in obj){
//     console.log(x);
// }

// console.log(Object.entries(obj)); 

// Object.keys(obj).forEach((elm, idx) => {
//     console.log(obj[elm]);
// });

// Object.keys(obj).forEach((_ , idx) => { // to access only index
//     console.log(idx);
// });

// const {name} = obj;
// console.log(name);

// DOM - Document object model - tree like structure 
// every element in dom is called node.
// hr element object ki tarah behave krte h.

