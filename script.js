const buttonAdd = document.querySelector('.button_add')
const inputTask = document.querySelector('.input_task')
const divAllTask = document.querySelector('.divAllTasks')
const allButton = document.querySelector('.buttonAll')
const completedButton = document.querySelector('.buttonCompleted')
const uncompletedButton = document.querySelector('.buttonUncompleted')

let tasks = [
    {
        name: 'Помыть посуду',
        isChecked: false,
        id: crypto.randomUUID(),
    },
    {
        name: 'Помыть полы',
        isChecked: true,
        id: crypto.randomUUID(),
    }
]

allButton.addEventListener('click', buttonAllFunc)
completedButton.addEventListener('click', buttonCompletedFunc)
uncompletedButton.addEventListener('click', buttonUncompletedFunc)

buttonAdd.addEventListener('click', addTask)

divAllTask.addEventListener('click', checkboxFunc)
divAllTask.addEventListener('click', deleteFunc)
divAllTask.addEventListener('click', editFunc)

function render(tasks) {  
    divAllTask.innerHTML = ''
    for(let i = 0; i<tasks.length; i++) {

        let divTask = document.createElement('div')
        divTask.classList.add('divTask')

        let divCheckName = document.createElement('div')
        divCheckName.classList.add('divCheckName')

        let divButtons = document.createElement('div')
        divButtons.classList.add('divButtons')

        let nameTask = document.createElement('p')
        nameTask.innerHTML = tasks[i].name
        nameTask.classList.add('nameTask')

        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.classList.add('checkbox')
        checkbox.checked = tasks[i].isChecked
        checkbox.dataset.id = tasks[i].id

        let delButton = document.createElement('button')
        delButton.innerHTML = 'Удалить'
        delButton.classList.add('deleteButton')
        delButton.dataset.id = tasks[i].id

        let editButton = document.createElement('button')
        editButton.innerHTML = 'Изменить'
        editButton.classList.add('editButton')

        divCheckName.append(checkbox)
        divCheckName.append(nameTask)
        divButtons.append(delButton)
        divButtons.append(editButton)
        
        divTask.append(divCheckName)
        divTask.append(divButtons)
        
        divAllTask.append(divTask)
    }

}

function addTask() {
    let nameTask = inputTask.value
    inputTask.value = ''
    tasks = [
        ...tasks,
        {
            name: nameTask,
            isChecked: false,
            id: crypto.randomUUID(),
        }
    ]
    render(tasks)
}

function deleteFunc(e) {
    let btn = e.currentTarget
    let idBtn = btn.dataset.id
    if(btn.classList.contains('deleteButton')) {
        tasks = tasks.filter(task => task.id != idBtn)
        render(tasks)
    }
}

function editFunc(e) {
    let btn = e.currentTarget
    let textBtn = btn.parentNode.parentNode.firstElementChild.lastElementChild
    const inputBtn = document.createElement('input')
    const title = document.createElement('p')
    if(btn.classList.contains('editButton')) {
        if(btn.innerHTML === 'Изменить') {
            inputBtn.value = textBtn.textContent
            textBtn.replaceWith(inputBtn)
            btn.innerHTML = 'Сохранить'
        }
        else {
            title.innerHTML = textBtn.value
            textBtn.replaceWith(title)
            btn.innerHTML = 'Изменить'

        }
    }
}

function checkboxFunc(e) {
    checkbox = e.currentTarget
    idCheckbox = checkbox.dataset.id
    if(checkbox.classList.contains('checkbox')) {
        tasks = tasks.map(task => {
            if(task.id === idCheckbox) {
                return {
                    ...task, 
                    isChecked: !task.isChecked 
                }
            }
            else {
                return task
            }
        })
        render(tasks)
    }
}

function buttonAllFunc() {
    render(tasks)
}

function buttonCompletedFunc() {   
    render(tasks.filter(task => task.isChecked === true))
}

function buttonUncompletedFunc() {
    render(tasks.filter(task => task.isChecked === false))
}

render(tasks)