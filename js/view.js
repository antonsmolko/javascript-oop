import { createElement } from './dom.js';

export default class View {
    constructor(presenter) {
        this.presenter = presenter;
        this.init();
    }

    init() {
        this.todoForm = document.getElementById('todo-form');
        this.addInput = document.getElementById('add-input');
        this.todoList = document.getElementById('todo-list');
        this.todoItems = document.querySelectorAll('.todo-item');

        this.todoForm.addEventListener('submit', this.handleSubmit.bind(this));
        this.todoItems.forEach(item => this.bindEvents(item));
    }

    set addInputValue(value) {
        this.addInput.value = value;
    }

    get addInputValue() {
        return this.addInput.value;
    }

    clearTodoList() {
        this.todoList.innerHTML = '';
    }

    createTodoItem(todo) {
        const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
        const label = createElement('label', { className: 'title' }, todo.title);
        const editInput = createElement('input', { type: 'text', className: 'textfield' });
        const editButton = createElement('button', { className: 'edit' }, 'Изменить');
        const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
        const listItem = createElement('li', { className: 'todo-item', id: todo.id }, checkbox, label, editInput, editButton, deleteButton);
        
        return listItem;
    }

    bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox');
        const editButton = todoItem.querySelector('button.edit');
        const deleteButton = todoItem.querySelector('button.delete');

        checkbox.addEventListener('change', this.handleCheckboxChange.bind(this));
        editButton.addEventListener('click', this.handleEditButtonClick.bind(this));
        deleteButton.addEventListener('click', this.handleDeleteButtonClick.bind(this));
    }

    addItemToList(todoItem) {
        this.todoList.appendChild(todoItem);
    }

    editTodoItem(todo) {
        const editingItem = this.todoList.querySelector(`#${todo.id}`);
        const title = editingItem.querySelector('.title');
        const editInput = editingItem.querySelector('.textfield');
        const editButton = editingItem.querySelector('.edit');
        editingItem.classList.toggle('editing', todo.editing);
        if (todo.editing) {
            editInput.value = todo.title;
            editButton.innerText = 'Сохранить';
        } else {
            title.innerText = todo.title;
            editButton.innerText = 'Изменить';
        }
    }

    toggleTodoItem(todo) {
        const toggledTodoItem = this.todoList.querySelector(`#${todo.id}`);
        const editButton = toggledTodoItem.querySelector('.edit');
        const deleteButton = toggledTodoItem.querySelector('.delete');
        toggledTodoItem.classList.toggle('completed', todo.completed);
        editButton.disabled = todo.completed;
        deleteButton.disabled = todo.completed;
    }

    deleteTodoItem(id) {
        const deletedItem = this.todoList.querySelector(`#${id}`);
        this.todoList.removeChild(deletedItem);
    }

    handleCheckboxChange(event) {
        const todoItemId = event.target.parentNode.id;
        this.presenter.toggleTodoItem(todoItemId);
    }

    handleEditButtonClick(event) {
        const todoItem = event.target.parentNode;
        const todoItemId = todoItem.id;
        const todoItemTitle = todoItem.querySelector('.title');
        const editInput = todoItem.querySelector('.textfield');
        const isEditing = todoItem.classList.contains('editing');

        if (isEditing) {
            this.presenter.editTodoItem(todoItemId, editInput.value)
        } else {
            this.presenter.editTodoItem(todoItemId, todoItemTitle.innerText);
        }
    }

    handleDeleteButtonClick(event) {
        let deletedItemId = event.target.parentNode.id;
        this.presenter.deleteTodoItem(deletedItemId);
    }

    handleSubmit(event) {
        event.preventDefault();
        let inputValue = event.target.querySelector('#add-input').value;
        if (inputValue === '') {
            return alert('Необходимо ввести название задачи.');
        }      
        this.presenter.createTodoItem(inputValue);
    }
}