// import xxxx from './color-ctrl-cmp.js'

export default {
  template: `
   <div class="input-type-select">
          <button @click="newNote.type='txt-note'"><i class="icon icon-text-style button-icon"></i></button>
          <button @click="newNote.type='todo-note'"><i class="icon icon-list-bullets-3-heavy button-icon"></i></button>
          <button @click="newNote.type='img-note'"><i class="icon icon-picture-landscape-2 button-icon"></i></button>
      </div>
    `,
  props: [],
  data() {
    return {}
  },
  created: function() {},
  computed: {},
  methods: {},
  // components: {xxxx }
}
