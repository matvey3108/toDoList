const buttonAdd = document.querySelector('.add-btn')
const inputTask = document.querySelector('.task-input')
const divAllTask = document.querySelector('.tasks')
const buttonsFilters = document.querySelectorAll('.filter-btn')

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

console.log(buttonsFilters)
for(let i = 0; i<buttonsFilters.length; i++) {
    buttonsFilters[i].addEventListener('click', buttonsFIlterFunc)
}

buttonAdd.addEventListener('click', addTask)


function render(tasks) {  
    divAllTask.innerHTML = ''
    for(let i = 0; i<tasks.length; i++) {

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

        if(checkbox.checked) {
            divTask.classList.add('completed')
        }

        let delButton = document.createElement('button')
        delButton.innerHTML = '🗑️'
        delButton.classList.add('delete-btn')
        delButton.dataset.id = tasks[i].id

        let editButton = document.createElement('button')
        editButton.innerHTML = '✏️'
        editButton.classList.add('edit-btn')

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
    tasks = tasks.filter(task => task.id != idBtn)
    render(tasks)
}

function editFunc(e) {
    let btn = e.currentTarget
    let textBtn = btn.parentNode.parentNode.firstElementChild.lastElementChild
    const inputBtn = document.createElement('input')
    const title = document.createElement('span')
    if(btn.innerHTML === '✏️') {
        inputBtn.value = textBtn.textContent
        textBtn.replaceWith(inputBtn)
        btn.innerHTML = '💾'
    }
    else {
        title.innerHTML = textBtn.value
        textBtn.replaceWith(title)
        btn.innerHTML = '✏️'

    }
}


function checkboxFunc(e) {
    checkbox = e.currentTarget
    idCheckbox = checkbox.dataset.id
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

// function buttonAllFunc() {
//     allButton.classList.add('active')
//     completedButton.classList.remove('active')
//     uncompletedButton.classList.remove('active')
//     render(tasks)
// }

// function buttonCompletedFunc() {   
//     allButton.classList.remove('active')
//     completedButton.classList.add('active')
//     uncompletedButton.classList.remove('active')
//     render(tasks.filter(task => task.isChecked === true))
// }

// function buttonUncompletedFunc() {
//     allButton.classList.remove('active')
//     completedButton.classList.remove('active')
//     uncompletedButton.classList.add('active')
//     render(tasks.filter(task => task.isChecked === false))
// }

function buttonsFIlterFunc(e) {
    let btn = e.currentTarget
    console.log(btn.innerHTML)
    buttonsFilters.forEach((button) => {
            if(button.innerHTML == btn.innerHTML) {
                button.classList.add('active')
            }
            else {
                button.classList.remove('active')
            }
        })
    if(btn.innerHTML == 'Все') {
        console.log(tasks, 'все')
        render(tasks)
    }
    if(btn.innerHTML == 'Выполненные') {
        console.log(tasks, 'выполненные')
        render(tasks.filter(task => task.isChecked === true))
    }
    if(btn.innerHTML == 'Активные') {
        console.log(tasks, 'невыполненные')
        render(tasks.filter(task => task.isChecked === false))
    }
}

render(tasks)