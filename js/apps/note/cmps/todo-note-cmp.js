// import xxxx from './color-ctrl-cmp.js'

export default {
  template: `
    <div class="todo-note">
      <ul class="todo-list">
        <li v-for="(todo,todoIdx) in note.content" @click.stop="toggleTodo(todoIdx)"  :class={done:(todo.isDone)} > <span v-if="(todo.isDone) "class="check">&#10004</span >{{todo.txt}}</li>
      </ul>
    </div>
    `,
  props: ['note'],
  data() {
    return {
      toggleTodo(todoIdx) {
        // console.log('todoIdx :', todoIdx)
        this.$parent.$emit('toggle-todo',todoIdx)
      },
      doneStyle: {
        active: true,
        'text-danger': false
      }
    }
  },
  created: function() {},
  computed: {},
  methods: {}
  // components: {xxxx }
}
