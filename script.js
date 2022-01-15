//Variables
const items = getTodos();

//Selectors
const todoField = document.querySelector('[data-todo=field]');
const todoButton = document.querySelector('[data-todo=button]');
const todoList = document.querySelector('[data-todo=list]');


//Listeners

document.addEventListener('DOMContentLoaded', refreshScreen)
todoButton.addEventListener('click', addItem);
todoList.addEventListener('click', todoAction);

//Functions
function addItem(e){
    e.preventDefault();
    if(todoField.value.length > 1){
        let item = {
            content : todoField.value ,
            status : 'aberto'
        }
    
        items.push(item);
        localStorage.setItem('todos', JSON.stringify(items));
    
        todoField.value = '';
        
        refreshScreen();
        Swal.fire('Boa!', 'Tarefa adicionada com sucesso', 'success');
    }else{
        Swal.fire('Ops...', 'Informe a tarefa', 'error');
    }

}

function refreshScreen(){
    todoList.innerHTML = '';
    if(items.length  > 0){
        items.forEach((item, index) => {
            const todoLi = document.createElement('li');
            const todoCheck = document.createElement('button');
            const todoDelete = document.createElement('button');
            const todoSpan = document.createElement('span');

            //Li
            todoLi.classList.add('todo-item');
            todoLi.setAttribute('data-todo-id', index);
            todoLi.setAttribute('data-todo-status', item.status);

            //Button
            todoCheck.classList.add('todo-button');
            todoCheck.classList.add('todo-check');
            todoCheck.setAttribute('data-action', 'check');
            todoCheck.innerHTML = `<i class='bx bx-check' ></i>`;
            todoDelete.classList.add('todo-button');
            todoDelete.classList.add('todo-delete');
            todoDelete.setAttribute('data-action', 'delete');
            todoDelete.innerHTML = `<i class='bx bx-trash' ></i>`;

            //Span
            todoSpan.innerText = item.content;

            //Inserindo no DOM
            todoLi.appendChild(todoSpan);
            todoLi.appendChild(todoCheck);
            todoLi.appendChild(todoDelete);

            todoList.appendChild(todoLi);
        })
    }
}

function todoAction(e){
    const button = e.target;
    const parent = button.parentElement;
    const id = parent.dataset.todoId;

    switch (button.dataset.action) {

        case 'check':
            items[id].status === 'aberto' ? items[id].status = 'fechado' : items[id].status = 'aberto';
            localStorage.setItem('todos', JSON.stringify(items));
            refreshScreen();
            break;

        case 'delete':
            items.splice(id,1);
            localStorage.setItem('todos', JSON.stringify(items));
            parent.classList.add('bye');
            parent.addEventListener('transitionend', refreshScreen);
            break;

    }
}

function getTodos(){
    if(null === localStorage.getItem('todos')){
        return [];
    }else{
        return JSON.parse(localStorage.getItem('todos'));
    }
}