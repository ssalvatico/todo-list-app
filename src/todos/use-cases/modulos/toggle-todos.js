import todoStore, { state } from "../../../store/todo.store";

let stateToggle = true;

export const toggleTodosState = () => {
    state.todos.forEach(todo => todo.done = stateToggle);
    stateToggle = !stateToggle;
};