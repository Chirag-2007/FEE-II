(
    function(){
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        const todoContainer = document.getElementById("todo");

        const input = document.createElement("input");
        const addBtn = document.createElement("button");

        input.placeholder = "Enter the task...."
        input.type = "text";

        input.style.padding = "4px"
        input.style.marginRight = "4px"
        input.style.width = "75%"
        input.style.textDecoration = "none"

        addBtn.textContent = "Add"
        addBtn.style.padding = "4px"
        addBtn.style.width = "20%"
        addBtn.style.backgroundColor = "green"
        addBtn.style.border = "1px solid black"
        addBtn.style.borderRadius = "5px"
        addBtn.style.color = "white"

        const todoBox = document.createElement("div");
        todoBox.id = "todoBox";

        todoBox.style.height = "280px"
        todoBox.style.width = "400px"
        todoBox.style.backgroundColor = "white"
        todoBox.style.borderRadius = "10px"
        todoBox.style.margin = "15px"
        todoBox.style.marginLeft = "37px"
        todoBox.style.padding = "10px"
        todoBox.style.marginBottom = "5px"
        todoBox.style.overflowY = "auto";
        todoBox.style.border = "2px solid black";
        
        todoContainer.append(input, addBtn, todoBox);

        function renderTask(task){
            const todoItem = document.createElement("div");
            const content = document.createElement("p");
            const removeBtn = document.createElement("button");

            removeBtn.textContent = "Delete";
            content.textContent = task;

            todoItem.prepend(content, removeBtn);
            todoBox.prepend(todoItem);

            todoItem.style.display = "flex";
            todoItem.style.justifyContent = "space-between";
            todoItem.style.backgroundColor = "#fff";
            todoItem.style.border = "2px solid black";
            todoItem.style.borderRadius = "10px";
            todoItem.style.padding = "10px";
            todoItem.style.marginBottom = "10px";
            todoItem.style.alignItems = "center";
            todoItem.style.transition = "0.2s";

            removeBtn.style.backgroundColor = "#e63946";
            removeBtn.style.color = "white";
            removeBtn.style.border = "none";
            removeBtn.style.padding = "6px 10px";
            removeBtn.style.borderRadius = "5px";
            removeBtn.style.cursor = "pointer";

            removeBtn.addEventListener("click", () => {
                const index = todos.indexOf(task);
                todos.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(todos));
                todoItem.remove();
            });
        }

        todos.forEach(task => { // to re-render the tasks automatically from the localStorage
            renderTask(task);
        });

        addBtn.addEventListener("click", () => {
            const task = input.value;
            todos.unshift(task);
            localStorage.setItem("todos", JSON.stringify(todos));
            console.log(task);
            if(!task){
                alert("Enter a task....");
                return;
            }
            input.value = "";
            input.focus();
            renderTask(task);
        })
    }
)();