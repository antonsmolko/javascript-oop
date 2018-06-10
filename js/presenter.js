export default class Presenter {

    init(model, view) {
        this.model = model;
        this.view = view;
    }

    renderTodoList() {
        this.view.clearTodoList();
        this.model.todos.forEach(todo => {
            let todoItem = this.view.createTodoItem(todo);
            this.view.bindEvents(todoItem);
            this.view.addItemToList(todoItem);
        });
    }

    createTodoItem(value) {
        let newTodo = this.model.add(value);
        let newTodoItem = this.view.createTodoItem(newTodo);
        this.view.bindEvents(newTodoItem);
        this.view.addItemToList(newTodoItem);
        this.view.addInputValue = '';
    }

    toggleTodoItem(id) {
        let toggledTodo = this.model.toggle(id);
        this.view.toggleTodoItem(toggledTodo);
    }

    editTodoItem(id, title) {
        this.view.editTodoItem(this.model.edit(id, title));
    }

    deleteTodoItem(id) {
        this.model.delete(id);
        this.view.deleteTodoItem(id);
    }
}