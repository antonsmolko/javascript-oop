export default class Model {
    constructor() {
        this.id = 1;
        this.todos = [];
    }
    add(value) {
        let newTodo = {
            id: `todo-${this.id}`,
            title: value,
            completed: false,
            editing: false
        };
        this.todos.push(newTodo);
        this.id += 1;
        return newTodo;
    }

    edit(id, title) {
        let editingTodo;
        this.todos.map(todo => {
            if (todo.id === id) {
                todo.editing = !todo.editing;
                todo.title = title;
                editingTodo = todo;
            }
        });
        return editingTodo;
    }

    delete(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    toggle(id) {
        let toggledTodo;
        this.todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
                toggledTodo = todo;
            }
        });
        return toggledTodo;
    }
}