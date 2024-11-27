// calling the elements
let childDiv = document.getElementById("child");
let result = document.getElementById("result");
let addTask = document.getElementById("task");
let btnAdd = document.getElementById("btn-add");
let btnClear = document.getElementById("btn-clear");

// ##################################################

btnClear.style.display = "none"; 

// دالة لإضافة مهمة جديدة
function myTasks () {
    btnAdd.addEventListener("click", function () {
        if (addTask.value === "") {
            event.preventDefault();
        } else {
            const uniqeKey = `task-${Date.now()}`;
            window.localStorage.setItem(uniqeKey, addTask.value);
            // طباعة المهام من جديد
            printTasks();
        } 
    }); 
}

// دالة لطباعة المهام من localStorage
function printTasks () { 
    result.innerHTML = "";
    let hasTasks = false;

    // المرور عبر جميع العناصر في localStorage وعرضها
    for (let i = 0; i < localStorage.length; i++) {
        let divCont = document.createElement("div");
        let divBtn = document.createElement("div");
        let viewData = document.createElement("p");
        let btnDone = document.createElement("button");
        let btnDelete = document.createElement("button");

        // تنسيق العناصر
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

        // عند النقر على زر "Done"، يتم تطبيق الخط
        btnDone.addEventListener("click", function () {
            divCont.style.textDecoration = "line-through";
        });

        // الحصول على المفتاح والقيمة من localStorage
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        viewData.innerHTML = `${i + 1} - ${value}`;

        // عند النقر على زر "Delete"، يتم حذف المهمة من localStorage
        btnDelete.addEventListener("click", function () {
            window.localStorage.removeItem(key);
            divCont.remove();
            // بعد حذف المهمة، التحقق إذا كانت هناك مهام متبقية
            checkClearButton();
        });

        divCont.appendChild(viewData);
        divBtn.appendChild(btnDone);
        divBtn.appendChild(btnDelete);
        divCont.appendChild(divBtn);
        result.appendChild(divCont);
        
        // هناك مهام موجودة في localStorage
        hasTasks = true;
    }

    // التحقق من زر "Clear"
    checkClearButton();

    // مسح خانة الإدخال بعد إضافة المهمة
    addTask.value = ""; 
}

// دالة للتحقق من حالة زر "Clear"
function checkClearButton() {
    if (localStorage.length > 0) {
        // إظهار زر "Clear" إذا كانت هناك مهام
        btnClear.style.display = "block";
    } else {
        // إخفاء زر "Clear" إذا كانت القائمة فارغة
        btnClear.style.display = "none";
    }
}

// عند الضغط على زر "Clear"، يتم مسح جميع المهام
btnClear.addEventListener("click", function () {
    localStorage.clear();  // مسح جميع البيانات المخزنة في localStorage
    result.innerHTML = "";  // مسح العناصر من واجهة المستخدم
    checkClearButton();  // التحقق من حالة الزر بعد المسح
});

// تنفيذ الدالة عند تحميل الصفحة
myTasks();
printTasks();
