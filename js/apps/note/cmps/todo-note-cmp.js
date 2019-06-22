export default {
  template: `
    <section class="note" @changecolor="changeColor(ev)">
      <i class="icon icon-sm icon-list-bullets-1"></i>
      <li v-for="todo in info.content.todos">{{todo.txt}}</li>
      
       <!-- <pre>{{info}}</pre>  -->
       <!-- <button @click.stop="deleteNote($event)">x</button> -->
    </section>
    `,
  props: ['info'],
  data() {
    return {}
  },
  created() {
    // console.log('info :', this.info)
   
  },
  methods: {
    deleteNote(ev) {
      this.$emit('deleteNote', ev.target.parentElement)
    },
    
  }
}
