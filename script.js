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

        checkbox.addEventListener('click', checkboxFunc)

        let delButton = document.createElement('button')
        delButton.innerHTML = 'Удалить'
        delButton.classList.add('deleteButton')
        delButton.dataset.id = tasks[i].id

        delButton.addEventListener('click', (e) => {
            deleteFunc(e)
        })

        let editButton = document.createElement('button')
        editButton.innerHTML = 'Изменить'
        editButton.classList.add('editButton')
        editButton.addEventListener('click', editButton)

        editButton.addEventListener('click', (e) => {
            editFunc(e)
        })


        divAllTask.append(divTask)

        divCheckName.append(checkbox)
        divCheckName.append(nameTask)
        divButtons.append(delButton)
        divButtons.append(editButton)

        divTask.append(divCheckName)
        divTask.append(divButtons)
        
    }

}

function addTask() {
    let nameTask = inputTask.value
    inputTask.value = ''
    tasks.push({
        name: nameTask,
        isChecked: false,
        id: crypto.randomUUID(),
    })
    render(tasks)
}

function deleteFunc(e) {
    let btn = e.currentTarget
    let idBtn = btn.dataset.id
    console.log(idBtn)
    tasks = tasks.filter(task => task.id != idBtn)
    render(tasks)

}

function editFunc(e) {
    let btn = e.currentTarget
    let textBtn = btn.parentNode.parentNode.firstElementChild.lastElementChild
    const inputBtn = document.createElement('input')
    const newp = document.createElement('spam')
    if(btn.innerHTML == 'Изменить') {
        inputBtn.value = textBtn.textContent
        textBtn.replaceWith(inputBtn)
        btn.innerHTML = 'Сохранить'
    }
    else {
        newp.innerHTML = textBtn.value
        textBtn.replaceWith(newp)
        btn.innerHTML = 'Изменить'

    }
    
}

function checkboxFunc(e) {
    checkbox = e.currentTarget
    idCheckbox = checkbox.dataset.id
    tasks = tasks.map(task => {
        if(task.id == idCheckbox) {
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

function buttonAllFunc() {
    render(tasks)
}

function buttonCompletedFunc() {   
    render(tasks.filter(task => task.isChecked == true))
}

function buttonUncompletedFunc() {
    render(tasks.filter(task => task.isChecked == false))
}

render(tasks)