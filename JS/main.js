// calling the elements
let childDiv = document.getElementById("child");
let result = document.getElementById("result");
let addTask = document.getElementById("task");
let btnAdd = document.getElementById("btn-add");
let btnClear = document.getElementById("btn-clear");

// ##################################################

btnClear.style.display = "none"; 

function myTasks () {
    btnAdd.addEventListener("click", function () {
        if (addTask.value === "") {
            event.preventDefault();
        } else {
            const uniqeKey = `task-${Date.now()}`;
            window.localStorage.setItem(uniqeKey, addTask.value);
            printTasks();
        } 
    }); 
}

function printTasks () { 
    result.innerHTML = "";
    let hasTasks = false;

    for (let i = 0; i < localStorage.length; i++) {
        let divCont = document.createElement("div");
        let divBtn = document.createElement("div");
        let viewData = document.createElement("p");
        let btnDone = document.createElement("button");
        let btnDelete = document.createElement("button");

        divCont.style.cssText = `padding:5px; 
        margin-bottom:10px;
        background-color: rgb(231, 225, 225); 
        display:flex;
        justify-content:space-between;
        padding:10px;
        border-radius:3px;`;

        btnDone.style.cssText = `
        width: 100px;
        border: none;
        outline: none;
        padding: 5px;
        background-color: #AA4CD9;
        color: white;
        margin-right:5px;
        border-radius: 3px;`;

        btnDone.innerHTML = `Done`;

        btnDelete.style.cssText = `
        width: 100px;
        border: none;
        outline: none;
        padding: 5px;
        background-color: red;
        color: white;
        border-radius: 3px;`;

        btnDelete.innerHTML = `Delete`;

        btnDone.addEventListener("click", function () {
            divCont.style.textDecoration = "line-through";
        });

        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        viewData.innerHTML = `${i + 1} - ${value}`;

        btnDelete.addEventListener("click", function () {
            window.localStorage.removeItem(key);
            divCont.remove();
            checkClearButton();
        });

        divCont.appendChild(viewData);
        divBtn.appendChild(btnDone);
        divBtn.appendChild(btnDelete);
        divCont.appendChild(divBtn);
        result.appendChild(divCont);
        
        hasTasks = true;
    }

    checkClearButton();

    addTask.value = ""; 
}

function checkClearButton() {
    if (localStorage.length > 0) {
        btnClear.style.display = "block";
    } else {
        btnClear.style.display = "none";
    }
}

btnClear.addEventListener("click", function () {
    localStorage.clear();  
    result.innerHTML = ""; 
    checkClearButton();  
});

myTasks();
printTasks();
