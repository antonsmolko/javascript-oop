export default class Presenter {

    init(model, view) {
        this.model = model;
        this.view = view;
    }

    createTodoItem(todoList) {
        if (this.view.addInputValue === '') {
            return alert('Необходимо ввести название задачи.');
        }
        const todoItem = this.model.createTodoItem(this.view.addInputValue);
        this.view.bindEvents(todoItem);
        this.model.addItemToList(todoList, todoItem);
        this.view.addInputValue = '';
    }

    toggleTodoItem(event) {
        const listItem = event.target.parentNode;
        this.view.toggleTodoItem(listItem);
    }

    editTodoItem(event) {
        const listItem = event.target.parentNode;
        this.view.editTodoItem(listItem);
    }

    deleteTodoItem(event) {
        const listItem = event.target.parentNode;
        this.view.deleteTodoItem(listItem);
    }
}