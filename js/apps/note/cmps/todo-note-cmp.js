export default {
  template: `
    <section class="note" @changecolor="changeColor(ev)">
      <i class="icon icon-sm icon-list-bullets-1"></i>
      <li v-for="todo in note.content.todos">{{todo.txt}}</li>
      
    </section>
    `,
      props: ['note'],
      data() {
        return {}
      },
      created() {
      
      },
      methods: {
    deleteNote(ev) {
      this.$emit('deleteNote', ev.target.parentElement)
    },
    
  }
}
