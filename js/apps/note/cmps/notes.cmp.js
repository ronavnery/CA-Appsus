
import todoService from '../services/todo.service.js';


Vue.component('todo-app', {

    template: `
        <section class="todo-app">
            <h3>Todos</h3>
            <ul>
                <li v-for="(todo, i) in todos" @click="toggleTodo(todo)" :class="{'todo-done' : todo.isDone}">
                    {{i+1}} {{todo.txt}} Priority: {{todo.priority}}
                    <button @click.stop="deleteTodo(i)">x</button>
                </li>
            </ul>
            <div>
                <input type="text" placeholder="What todo?" v-model="newTodo.txt" @keyup.enter="addTodo" />
                <input type="checkbox" v-model="newTodo.isDone"  /> Done?
                <input type="number" v-model.number="newTodo.priority" placeholder="Priority"  /> 
                <button @click="addTodo">Add</button>
            </div>
        </section>
    `,
    data() {
        return {
            todos: todoService.query(),
            newTodo : todoService.getEmptyTodo()
        }
    },
    methods: {
        addTodo(){
            todoService.add(this.newTodo);
            this.newTodo = todoService.getEmptyTodo();
            console.log(this.todos);
        },
        toggleTodo(todo) {
            console.log('TOGGLING TODO');
            todoService.toggle(todo);
        },

        deleteTodo(todoIdx) {
            // console.log('Ev', ev);
            this.todos.splice(todoIdx, 1)
        },
        keyUp(ev) {
            if (ev.key === 'Enter') {
                this.addTodo();
            }
        }
    }



})