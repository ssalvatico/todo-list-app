import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('Piedra del poder'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra de la realidad'),
        new Todo('Piedra del alma'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra de la mente'),
    ],
    filter: Filters.All,
}

/**
 * Inicia el storage
 */
const initStore = () => {
    loadStore();
}

/**
 * Carga el storage en caso de haberlo
 */
const loadStore = () => {
    let estado = localStorage.getItem('state'); 
    if(!estado) return;
    const { todos = [], filter = Filters.All } = JSON.parse(estado);
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * 
 * @param {Filters} filter 
 * @returns {Todo[]}
 */
const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error(`Opción ${filter} no permitida.`);
    }
}

/**
 * 
 * @param {String} descripcion 
 */
const addTodo = ( descripcion ) => {
    if( !descripcion ) throw new Error("Descripción requerida");
    state.todos.push( new Todo(descripcion) );
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    let todoToToggle = state.todos.find( todo => todo.id === todoId )
    todoToToggle.done = !todoToToggle.done;
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

/**
 * Elimina los TODOs que ya fueron completados 
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter ( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

/**
 * @returns String
 */
const getCurrentFilter = () => {
    return state.filter;
}

export default {
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
    addTodo,
}