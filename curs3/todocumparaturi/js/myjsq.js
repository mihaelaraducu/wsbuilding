var nrProduse = 0;

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function checkCookie() {
    const taskList = getCookie("taskList");
    if (taskList) {
        taskList.split('|').forEach(task => {
            document.getElementById("list").insertAdjacentHTML('beforeend', `<li class='task'>${task}</li>`);
        });
    }
}

function saveTasksToCookie() {
    const tasks = [];
    document.querySelectorAll('#list .task').forEach(task => {
        tasks.push(task.innerText);
    });
    setCookie("taskList", tasks.join('|'), 7);
}

function addTask() {
    let task = document.getElementById('task').value;
    if (!task) return;
    const text = `<li class='task'>${task}</li>`;
    document.getElementById('list').insertAdjacentHTML('beforeend', text);
    document.getElementById('task').value = '';
    nrProduse++;
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(nrProduse, text);
        localStorage.setItem('numarProduse', nrProduse);
    }
    saveTasksToCookie(); // Salvează sarcinile în cookie
}

document.getElementById('add').addEventListener('click', addTask);
document.getElementById('list').addEventListener('click', function(event) {
    const element = event.target;
    element.classList.toggle("done");
});

window.onload = function () {
    checkCookie();
    var nr = localStorage.getItem('numarProduse');
    if (typeof(Storage) !== "undefined" && nr > 0) {
        for (let i = 1; i <= nr; i++) {
            document.getElementById("list").insertAdjacentHTML('beforeend', localStorage.getItem(i));
        }
    }
}
