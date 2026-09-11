import todoStore, { Filters } from "../../../store/todo.store";

let element;

export const renderClearCompletedBtn = (elementId) => {
    if( !element ) element = document.querySelector(elementId);
    if( !element ) throw new Error("No se encontro el Id del elemento");
    if(todoStore.getTodos(Filters.Completed)) element.setAttribute('hidden', '');
    else element.removeAttribute('hidden');
    console.log(element);
};