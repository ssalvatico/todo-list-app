import { renderTodos, renderPendingTodos, renderClearCompletedBtn, toggleTodosState } from './use-cases/archivo-barril';
import todoStore from '../store/todo.store';
import html from './app.html?raw';

/** @type {number} */


const ids = {
	clearCompleted: '.clear-completed',
	newTodoInput: '#new-todo-input',
	count: '#pending-count',
	todoList: '.todo-list',
	filters: '.filtro',
    toggleAll: '#toggle-all',
};


/**
 * Simula la aplicación
 * @param {String} elementId 
 */
export const App = (elementId) => {

    /**
     * Actualiza el conteo de tareas pendientes
     */
    const updatePendingCount = () => {
        renderPendingTodos(ids.count);
    };

    /**
     * 
     */
    const updateClearCompletedBtn = () => {
        renderClearCompletedBtn(ids.clearCompleted);
    };

    /**
     * Renderiza la TODO List
     */
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() ).reverse();
        // updateClearCompletedBtn();
        renderTodos( ids.todoList, todos );
    };

    /**
     * 
     */
    const refreshUI = () => {
        updatePendingCount();
        updateClearCompletedBtn();
        displayTodos();
    };

    /**
     * 
     */
    const mount = ()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        refreshUI();
    };mount();

    // Referencias HTML
    const clearCompletedBtn = document.querySelector(ids.clearCompleted);
    const todoInput = document.querySelector(ids.newTodoInput);
    const filtersLIs = document.querySelectorAll(ids.filters);
    const todoListUL = document.querySelector(ids.todoList);
    const toggleAllBtn = document.querySelector(ids.toggleAll);

    // Listeners
    todoInput.addEventListener('keyup', (event)=>{
        if (event.key !== 'Enter') return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        event.target.value = '';
        refreshUI();
    });

    todoListUL.addEventListener('click', (event) => {
        const todoItem = event.target.closest('[data-id]');
        if (!todoItem) return; // guard: click fuera de un item

        const todoId = todoItem.getAttribute('data-id');

        if (event.target.classList.contains('destroy')) {
            todoStore.deleteTodo(todoId);
        } else {
            todoStore.toggleTodo(todoId);
        }

        refreshUI();
    });

    clearCompletedBtn.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        refreshUI();
    });
 
    filtersLIs.forEach(element => {
	    element.addEventListener('click', (event) => {
            filtersLIs.forEach(elem => elem.classList.remove('selected'));
            event.target.classList.add('selected');

		    todoStore.setFilter(event.target.dataset.filter);
		    displayTodos();
	    });
    });

    toggleAllBtn.addEventListener('click', (event) => {
        toggleTodosState();
        refreshUI();
    });
}