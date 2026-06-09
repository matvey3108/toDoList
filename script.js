const buttonAdd = document.querySelector('.button_add')
const inputTask = document.querySelector('.input_task')
const divAllTask = document.querySelector('.divAllTasks')

let tasks = [
    {
        name: 'Помыть посуду',
        isChecked: false,
        id: crypto.randomUUID(),
    },
    {
        name: 'Помыть полы',
        isChecked: false,
        id: crypto.randomUUID(),
    }
]

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

render(tasks)