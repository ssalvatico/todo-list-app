import { renderTodos, renderPendingTodos } from './use-cases/archivo-barril';
import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';

/** @type {number} */
let counter = 0;


const ids = {
    ClearCompleted: '.clear-completed',
    NewTodoInput: '#new-todo-input',
    Count: '#pending-count',
    TodoList: '.todo-list',
    filters: '.filtro',
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
        renderPendingTodos(ids.Count);
    };


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
    const filtersLIs = document.querySelectorAll(ids.filters);
    const todoListUL = document.querySelector(ids.TodoList);

    // Listeners
    todoInput.addEventListener('keyup', (event)=>{
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        event.target.value = '';
        updatePendingCount();
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const todoId = event.target.closest('[data-id]').getAttribute('data-id');
        todoStore.toggleTodo(todoId);
        updatePendingCount();
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const todoId = event.target.closest('[data-id]').getAttribute('data-id');
        if( event.target.getAttribute('class') === 'destroy') {
            todoStore.deleteTodo(todoId);
            updatePendingCount();
            displayTodos();
        }
    });

    clearCompletedBtn.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    });
 
    filtersLIs.forEach(element => {
        
        element.addEventListener('click', (event) => {
            filtersLIs.forEach(elem => elem.classList.remove('selected'));
            event.target.classList.add('selected');

            switch (event.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                break;
           }

           displayTodos();
        });
    });
}