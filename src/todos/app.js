import { renderTodos } from './use-cases/archivo-barril';
import todoStore from '../store/todo.store';
import html from './app.html?raw';

/** @type {number} */
let counter = 0;

const ids = {
    ClearCompleted: '.clear-completed',
    NewTodoInput: '#new-todo-input',
    Count: '#pending-count',
    TodoList: '.todo-list',
};


/**
 * Simula la aplicación
 * @param {String} elementId 
 */
export const App = (elementId) => {

    /**
     * Renderiza la TODO List
     */
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() ).reverse();
        renderTodos( ids.TodoList, todos );
    }
    

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const clearCompletedBtn = document.querySelector(ids.ClearCompleted);
    const todoInput = document.querySelector(ids.NewTodoInput);
    const todoListUL = document.querySelector(ids.TodoList);
    const count = document.querySelector(ids.Count);

    // Listeners
    todoInput.addEventListener('keyup', (event)=>{
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        count.innerText = ++counter;
        event.target.value = '';
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const todoId = event.target.closest('[data-id]').getAttribute('data-id');
        todoStore.toggleTodo(todoId);
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const todoId = event.target.closest('[data-id]').getAttribute('data-id');
        if( event.target.getAttribute('class') === 'destroy') {
            todoStore.deleteTodo(todoId);
            displayTodos();
        }
    });

    clearCompletedBtn.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    });

}