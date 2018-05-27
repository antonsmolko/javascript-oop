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

    bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox');
        const editButton = todoItem.querySelector('button.edit');
        const deleteButton = todoItem.querySelector('button.delete');

        checkbox.addEventListener('change', this.handleChange.bind(this));
        editButton.addEventListener('click', this.handleEdit.bind(this));
        deleteButton.addEventListener('click', this.handleDelete.bind(this));
    }

    handleChange(event) {
        this.presenter.toggleTodoItem(event);
    }

    handleEdit(event) {
        this.presenter.editTodoItem(event);
    }

    handleDelete(event) {
        this.presenter.deleteTodoItem(event);
    }

    handleSubmit(event) {
        event.preventDefault();        
        this.presenter.createTodoItem(this.todoList);
    }

    // Не знаю. Может нижние методы отнести в Model?

    toggleTodoItem(element) {
        element.classList.toggle('completed');
    }

    editTodoItem(element) {
        const title = element.querySelector('.title');
        const editInput = element.querySelector('.textfield');
        const editButton = element.querySelector('.edit');        
        const isEditing = element.classList.contains('editing');

        if (isEditing) {
            title.innerText = editInput.value;
            editButton.innerText = 'Изменить';
        } else {
            editInput.value = title.innerText;
            editButton.innerText = 'Сохранить';
        }

        element.classList.toggle('editing');
    }

    deleteTodoItem(element) {
        this.todoList.removeChild(element);
    }
}