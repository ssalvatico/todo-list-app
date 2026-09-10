import { Todo } from "../../models/todo.model";

/**
 * Crea el elemento TODO y lo retorna entre etiquetas `<li></li>`
 * @param {Todo} todo 
 * @returns {HTMLLIElement}
 */
export const createTodoHTML = ( todo ) => {
    if( !todo ) throw new Error("Un objeto Todo es necesario.");
    
    const {done, descripcion, id} = todo;

    const html = `
    <div class="view">
        <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
        <label>${descripcion}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `;
    const liElement = document.createElement('li');
    if(done) liElement.classList.add('completed');
    liElement.setAttribute('data-id', id);

    liElement.innerHTML = html;
    return liElement;
}