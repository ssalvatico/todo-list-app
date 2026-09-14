(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[];for(let t=0;t<256;++t)e.push((t+256).toString(16).slice(1));function t(t,n=0){return(e[t[n+0]]+e[t[n+1]]+e[t[n+2]]+e[t[n+3]]+`-`+e[t[n+4]]+e[t[n+5]]+`-`+e[t[n+6]]+e[t[n+7]]+`-`+e[t[n+8]]+e[t[n+9]]+`-`+e[t[n+10]]+e[t[n+11]]+e[t[n+12]]+e[t[n+13]]+e[t[n+14]]+e[t[n+15]]).toLowerCase()}var n=new Uint8Array(16);function r(){return crypto.getRandomValues(n)}function i(e,t,n){return!t&&!e&&crypto.randomUUID?crypto.randomUUID():a(e,t,n)}function a(e,n,i){e||={};let a=e.random??e.rng?.()??r();if(a.length<16)throw Error(`Random bytes length must be >= 16`);if(a[6]=a[6]&15|64,a[8]=a[8]&63|128,n){if(i||=0,i<0||i+16>n.length)throw RangeError(`UUID byte range ${i}:${i+15} is out of buffer bounds`);for(let e=0;e<16;++e)n[i+e]=a[e];return n}return t(a)}var o=class{constructor(e){this.id=i(),this.descripcion=e,this.done=!1,this.createdAt=new Date}},s={All:`all`,Completed:`Completed`,Pending:`Pending`},c={todos:[],filter:s.All},l=()=>{u()},u=()=>{let e=localStorage.getItem(`state`);if(!e)return;let{todos:t=[],filter:n=s.All}=JSON.parse(e);c.todos=t,c.filter=n},d=()=>{localStorage.setItem(`state`,JSON.stringify(c))},f={deleteCompleted:()=>{c.todos=c.todos.filter(e=>!e.done),d()},deleteTodo:e=>{c.todos=c.todos.filter(t=>t.id!==e),d()},getCurrentFilter:()=>c.filter,getTodos:(e=s.All)=>{switch(e){case s.All:return[...c.todos];case s.Completed:return c.todos.filter(e=>e.done);case s.Pending:return c.todos.filter(e=>!e.done);default:throw Error(`Opción ${e} no permitida.`)}},initStore:l,loadStore:u,setFilter:(e=s.All)=>{c.filter=e,d()},toggleTodo:e=>{let t=c.todos.find(t=>t.id===e);t.done=!t.done,d()},addTodo:e=>{if(!e)throw Error(`Descripción requerida`);c.todos.push(new o(e)),d()}},p,m=e=>{if(p||=document.querySelector(e),!p)throw Error(`No se encontro el Id del elemento`);f.getTodos(s.Completed).length?p.classList.remove(`hidden`):p.classList.add(`hidden`)},h,g=e=>{if(h||=document.querySelector(e),!h)throw Error(`No se encontro el Id del elemento`);h.innerHTML=f.getTodos(s.Pending).length},_=e=>{if(!e)throw Error(`Un objeto Todo es necesario.`);let{done:t,descripcion:n,id:r}=e,i=`
    <div class="view">
        <input class="toggle" type="checkbox" ${t?`checked`:``}>
        <label>${n}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `,a=document.createElement(`li`);return t&&a.classList.add(`completed`),a.setAttribute(`data-id`,r),a.innerHTML=i,a},v=!0,y=()=>{c.todos.forEach(e=>e.done=v),v=!v},b,x=(e,t=[])=>{if(b||=document.querySelector(e),!b)throw Error(`No existe ese elementId`);b.innerHTML=``,t.forEach(e=>{b.append(_(e))})},S=`<section class="todoapp">
    <header class="header">
        <h1 id="tareas">Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="Agregar tarea..." autofocus>
    </header>
    
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list"></ul>
    </section>

    <footer class="footer">
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <ul class="filters">
            <li>
                <a class="filtro" data-filter="all" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" data-filter="Pending" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" data-filter="Completed" href="#/completed">Completados</a>
            </li>
        </ul>
        <button class="clear-completed hidden">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <p>Creado por <a href="https://github.com/ssalvatico">Santiago Salvático</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`,C={clearCompleted:`.clear-completed`,newTodoInput:`#new-todo-input`,count:`#pending-count`,todoList:`.todo-list`,filters:`.filtro`,toggleAll:`#toggle-all`};f.initStore(),(e=>{let t=()=>{g(C.count)},n=()=>{m(C.clearCompleted)},r=()=>{let e=f.getTodos(f.getCurrentFilter()).reverse();x(C.todoList,e)},i=()=>{t(),n(),r()};(()=>{let t=document.createElement(`div`);t.innerHTML=S,document.querySelector(e).append(t),i()})();let a=document.querySelector(C.clearCompleted),o=document.querySelector(C.newTodoInput),s=document.querySelectorAll(C.filters),c=document.querySelector(C.todoList),l=document.querySelector(C.toggleAll);o.addEventListener(`keyup`,e=>{e.key===`Enter`&&e.target.value.trim().length!==0&&(f.addTodo(e.target.value),e.target.value=``,i())}),c.addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);if(!t)return;let n=t.getAttribute(`data-id`);e.target.classList.contains(`destroy`)?f.deleteTodo(n):f.toggleTodo(n),i()}),a.addEventListener(`click`,e=>{f.deleteCompleted(),i()}),s.forEach(e=>{e.addEventListener(`click`,e=>{s.forEach(e=>e.classList.remove(`selected`)),e.target.classList.add(`selected`),f.setFilter(e.target.dataset.filter),r()})}),l.addEventListener(`click`,e=>{y(),i()})})(`#app`),`serviceWorker`in navigator&&navigator.serviceWorker.register(`sw.js`).then(e=>{console.log(`SW registrado, scope:`,e.scope)}).catch(e=>{console.error(`Error registrando el SW:`,e)});