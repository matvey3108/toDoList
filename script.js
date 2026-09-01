// json-server --watch db.json --port 3000

const buttonAdd = document.querySelector('.add-btn')
const inputTask = document.querySelector('.task-input')
const divAllTask = document.querySelector('.tasks')
const buttonsFilters = document.querySelectorAll('.filter-btn')
const counter = document.querySelector('.counter-span')


let array = []

async function tasksGetter() {
    divAllTask.innerHTML = 'Загрузка Задач'
    try {
        let promise = await fetch('http://localhost:3000/tasks')
        let tasks = await promise.json()
        array = tasks
        render(tasks)
    }
    catch (err) {
        console.log(err, 'err')
    }
    finally {
    }
}

tasksGetter()

buttonsFilters.forEach(btn => btn.addEventListener('click', buttonsFilterFunc))

inputTask.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask()
    }
})
buttonAdd.addEventListener('click', addTask)


function render(tasks) {
    console.log(tasks)
    divAllTask.innerHTML = ''
    counter.innerHTML = `Кол-во задач: ${tasks.length}`
    for (let i = 0; i < tasks.length; i++) {

        let divTask = document.createElement('div')
        divTask.classList.add('task')

        let divCheckName = document.createElement('label')
        divCheckName.classList.add('task-content')

        let divButtons = document.createElement('div')
        divButtons.classList.add('task-actions')

        let nameTask = document.createElement('span')
        nameTask.innerHTML = tasks[i].name
        nameTask.classList.add('nameTask')

        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.classList.add('checkbox')
        checkbox.checked = tasks[i].isChecked
        checkbox.dataset.id = tasks[i].id

        if (checkbox.checked) {
            divTask.classList.add('completed')
        }

        let delButton = document.createElement('button')
        delButton.innerHTML = '🗑️'
        delButton.classList.add('delete-btn')
        delButton.dataset.id = tasks[i].id

        let editButton = document.createElement('button')
        editButton.innerHTML = '✏️'
        editButton.classList.add('edit-btn')
        editButton.dataset.id = tasks[i].id

        divCheckName.append(checkbox)
        divCheckName.append(nameTask)
        divButtons.append(editButton)
        divButtons.append(delButton)

        divTask.append(divCheckName)
        divTask.append(divButtons)

        divAllTask.append(divTask)


        checkbox.addEventListener('click', checkboxFunc)
        delButton.addEventListener('click', deleteFunc)
        editButton.addEventListener('click', editFunc)

    }

}

async function addTask() {
    if(inputTask.value != '') {
        try {
            const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: inputTask.value, isChecked: false, id: crypto.randomUUID() })
            })
            const result = await response.json()
            console.log(result)
        } catch(error) {
            alert(error)
        }
    } else {
        inputTask.placeholder = 'Node String'
        inputTask.classList.add('task-content-alert')
    }
    
    
}

async function deleteFunc(e) {
    try {
        let event = e.currentTarget
        const response = await fetch(`http://localhost:3000/tasks/${event.dataset.id}`, {
            method: 'DELETE',
        });
        
        if(!response.ok) {
            throw new Error(`Сервер вернул ошибку ${response.status}`)
        }
    } catch (error) {
        alert(error)
    }
    
}

async function editFunc(e) {
        let btn = e.currentTarget
        let changeElem = btn.parentNode.parentNode.firstElementChild.lastElementChild
        const inputBtn = document.createElement('input')
        const title = document.createElement('span')
        inputBtn.classList.add('edit-input')
        if (btn.innerHTML === '✏️') {
            inputBtn.value = changeElem.textContent
            changeElem.replaceWith(inputBtn)
            btn.innerHTML = '💾'
            console.log(inputBtn.value)
        } else {
            if(changeElem.value != '') {
                try {
                    console.log(changeElem)
                    const response = await fetch(`http://localhost:3000/tasks/${btn.dataset.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name: changeElem.value})
                    })
                } catch(error) {
                    alert(error)
                }
            } else {
                changeElem.placeholder = 'Node String'
                changeElem.classList.add('task-content-alert')
            }      
        }
}

async function checkboxFunc(e) {
    try {
        let checkbox = e.currentTarget 
        console.log(checkbox.checked)
        const response = await fetch(`http://localhost:3000/tasks/${checkbox.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isChecked: checkbox.checked})
        })
    } catch(error) {
        alert(error)
    }
    
}

function buttonsFilterFunc(e) {
    let btn = e.currentTarget
    buttonsFilters.forEach((button) => {
        if (button.classList[1] === btn.classList[1]) {
            button.classList.add('active')
        }
        else {
            button.classList.remove('active')
        }
    })
    if (btn.classList.contains('all')) {
        render(array)
    }
    if (btn.classList.contains('completed')) {
        render(array.filter(task => task.isChecked === true))
    }
    if (btn.classList.contains('uncompleted')) {
        render(array.filter(task => task.isChecked === false))
    }
}

