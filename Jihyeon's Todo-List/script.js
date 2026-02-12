const todoInput = document.querySelector("#whattodo"); 
const todoListContainer = document.querySelector(".todo-box");
const submitBtn = document.querySelector("#submitbtn");

let todos = []; 

function printTodo(item) {
    const li = document.createElement("li");
    li.id = item.id;

    const checkBtn = document.createElement("button");
    checkBtn.className = "check-btn";
    if (item.checked === 1) {
        checkBtn.innerText = "✔";
    }

    const span = document.createElement("span");    
    span.innerText = item.text;
    if (item.checked === 1) {
        span.style.textDecoration = "line-through"; 
        span.style.color = "#ccc";
    }

    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.className = "del-btn";

    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    todoListContainer.appendChild(li);

    checkBtn.onclick = function() {
        toggleTodo(item.id);
    };
    delBtn.onclick = function() {
        deleteTodo(item.id);
    };
}

function loadTodos() {
    const data = localStorage.getItem("TODO");
    if (data !== null) {
        todos = JSON.parse(data);        
        for (let i = 0; i < todos.length; i++) {
            printTodo(todos[i]);
        }
    }
}

submitBtn.onclick = function(e) {
    e.preventDefault();
    const val = todoInput.value;
    
    if (val === "") {
        alert("내용을 입력하세요!");
        return;
    }

    const newObj = {
        text: val,
        id: Date.now(),
        checked: 0
    };

    todos.push(newObj);
    localStorage.setItem("TODO", JSON.stringify(todos));
    printTodo(newObj);
    todoInput.value = "";
    todoInput.focus();
};

function deleteTodo(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1); 
            break;
        }
    }
    localStorage.setItem("TODO", JSON.stringify(todos));
    refresh();  
}

function toggleTodo(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            if (todos[i].checked === 0) {
                todos[i].checked = 1;
            } else {
                todos[i].checked = 0;
            }
            break;
        }
    }
    localStorage.setItem("TODO", JSON.stringify(todos));
    refresh();
}


function refresh() {
    todoListContainer.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        printTodo(todos[i]);
    }
}

document.querySelector(".close").onclick = function(){
    alert("창을 닫지 마십시오.");
}

loadTodos();