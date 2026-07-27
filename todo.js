(function(){ //IEFE -> Immediately Evoked Function Expression
    const todos = [];
    const todoContainer = document.getElementById("todo");

    const input = document.createElement("input");
    const btn = document.createElement("button");
    input.placeholder = "Enter task..."
    input.type = "text"

    btn.textContent = "Click";
    const todoList = document.createElement("div");
    todoList.id = "todoList";

    todoContainer.append(input, btn, todoList);

    function renderTask(task){
        const todoitem = document.createElement("div");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        const p = document.createElement("p");
        p.textContent = task;
        todoitem.prepend(p, removeBtn);

        // todoList.append(p); // Last ma apped hoga.
        todoList.prepend(todoitem); // Starting ma Append hoga.

        todoitem.style.display = "flex";
        todoitem.style.justifyContent  ="space-between";
        todoitem.style.marginBottom = "5px";

        removeBtn.addEventListener("click", () => {
        const index = todos.indexOf(task);
        todos.splice(index, 1);
        todoitem.remove();
        });
    }

    function addTodo(){
        const task = input.value;
        todos.unshift = task;
        console.log(task);
        if(!task){
            return;
        }
        input.value = ""; // After adding task in the todo array then input field gets blank.
        input.focus(); // And then again gets focused to add another task.
        renderTask(task);
    }

    btn.addEventListener("click", addTodo); // addTodo -> function reference
})();