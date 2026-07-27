// HTML -> PARSE -> DOM -> CSS -> CSSDOM
// Html collection is not apart of js. It is neither array nor object.

// let text = document.getElementById("text");
// let btn = document.getElementById("btn");

// btn.addEventListener("click", (e) => {
//     text.innerText = "Chirag Nagpal";
//     console.log("Hello")
// });

const text = document.getElementById("text");
const btn = document.getElementById("btn");

btn.addEventListener("click",() => {
    text.innerHTML = "Chirag Nagpal";
    text.style.color = "red";
    text.style.background = "blue";
});