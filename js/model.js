import { createElement } from './dom.js';

export default class Model {
    
    createTodoItem(title) {
        const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
        const label = createElement('label', { className: 'title' }, title);
        const editInput = createElement('input', { type: 'text', className: 'textfield' });
        const editButton = createElement('button', { className: 'edit' }, 'Изменить');
        const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
        const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);
    
        return listItem;
    }

    addItemToList(todoList, todoItem) {
        todoList.appendChild(todoItem);
    }
}