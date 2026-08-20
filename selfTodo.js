(
    function(){
        const todos = JSON.parse(localStorage.getItem("todos")) || []
        const input = document.getElementById("input")
        const btn = document.getElementById("addbtn")
        const container = document.getElementById("todoTask")

        container.style.overflowY = "scroll"

        function renderTask(task){
            const singleTask = document.createElement("div")
            const content = document.createElement("p")
            const btnBox = document.createElement("div")
            const doneTask = document.createElement("button")
            const removeTask = document.createElement("button")

            doneTask.textContent = "✅"
            removeTask.textContent = "❌"
            btnBox.prepend(doneTask, removeTask)

            content.textContent = task
            singleTask.prepend(content, btnBox)

            container.prepend(singleTask)

            singleTask.style.display = "flex"
            singleTask.style.alignItems = "center"
            singleTask.style.justifyContent = "space-between"
            singleTask.style.marginBottom = "5px"
            singleTask.style.backgroundColor = "lightgray"
            singleTask.style.height = "32px"
            singleTask.style.padding = "5px"
            singleTask.style.borderRadius = "5px"

            doneTask.addEventListener("click", () => {
                if(content.style.textDecoration === "line-through"){
                    content.style.textDecoration = "none";
                }
                else{
                    content.style.textDecoration = "line-through";
                }
            })

            removeTask.addEventListener("click", () => {
                const idx = todos.indexOf(task)
                todos.splice(idx, 1)
                saveTodos()
                singleTask.remove()
            });
        }

        todos.forEach((task) => {
            renderTask(task)
        })

        function saveTodos(){
            console.log(todos);
            localStorage.setItem("todos", JSON.stringify(todos));
        }

        btn.addEventListener("click", () => {
            const task = input.value.trim()
            if(!task){
                alert("Enter a valid task...")
                return;
            }
            todos.unshift(task)
            saveTodos();
            input.value = ""
            input.focus()
            renderTask(task)
        })
    }
)();