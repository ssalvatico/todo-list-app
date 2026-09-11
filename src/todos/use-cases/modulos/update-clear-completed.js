import todoStore, { Filters } from "../../../store/todo.store";

/** @type {HTMLElement} */
let element;

export const renderClearCompletedBtn = (elementId) => {
    if( !element ) element = document.querySelector(elementId);
    if( !element ) throw new Error("No se encontro el Id del elemento");
    if(todoStore.getTodos(Filters.Completed).length) element.classList.remove('hidden');
    else element.classList.add('hidden');
};