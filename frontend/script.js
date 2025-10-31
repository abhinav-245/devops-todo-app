const apiUrl = "http://todo_backend:5000/api/todos";

async function getTodos() {
    const res = await fetch(apiUrl);
    const todos = await res.json();
    const list = document.getElementById("todoList");
    list.innerHTML = "";
  
    if (todos.length === 0) {
      list.innerHTML = "<p class='empty'>No tasks yet — add one!</p>";
      return;
    }
  
    todos.forEach(t => {
      const li = document.createElement("li");
      if (t.completed) li.classList.add("completed");
  
      li.innerHTML = `
        <span>${t.title}</span>
        <div>
          <button onclick="toggleComplete(${t.id}, ${!t.completed})">
            ${t.completed ? "Undo" : "Done"}
          </button>
          <button onclick="deleteTodo(${t.id})">🗑</button>
        </div>`;
      list.appendChild(li);
    });
  }

async function addTodo() {
  const title = document.getElementById("todoInput").value;
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  getTodos();
}

async function toggleComplete(id, completed) {
  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  getTodos();
}

async function deleteTodo(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  getTodos();
}

getTodos();
