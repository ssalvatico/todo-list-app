import todoStore, { Filters } from "../../../store/todo.store";

let element;
 /**
  * Renderiza el numero de tareas pendientes
  * @param {String} elementId 
  */
export const renderPendingTodos = (elementId) => {
    if( !element ) element = document.querySelector(elementId);
    if( !element ) throw new Error("No se encontro el Id del elemento");
    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
};