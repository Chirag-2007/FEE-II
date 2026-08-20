const box = document.getElementById("box");
const on = document.getElementById("on");
const off = document.getElementById("off");

box.style.borderRadius = "50%";
box.style.border = "2px solid black";
box.style.height = "200px"
box.style.width = "200px"
box.style.backgroundColor = "white"

on.addEventListener("click", () => {
    box.style.backgroundColor = "yellow"
})
off.addEventListener("click", () => {
    box.style.backgroundColor = "white"
})