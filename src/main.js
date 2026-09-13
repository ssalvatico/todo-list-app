import './style.css'
import { App } from './todos/app';
import todoStore from './store/todo.store'

todoStore.initStore();

App('#app');

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js')
		.then((registration) => {
			console.log('SW registrado, scope:', registration.scope);
		})
		.catch((error) => {
			console.error('Error registrando el SW:', error);
		});
}