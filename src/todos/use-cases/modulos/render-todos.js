import { createTodoHTML } from "./create-todo-html";
import { Todo } from "../../models/todo.model";

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {
    
    if( !element ) element = document.querySelector(elementId);
    if( !element ) throw new Error("No existe ese elementId");
    
    element.innerHTML = '';

    todos.forEach(todo => {
        element.append( createTodoHTML(todo) );
    });
}