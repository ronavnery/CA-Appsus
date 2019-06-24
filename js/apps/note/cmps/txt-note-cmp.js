// import xxxx from './color-ctrl-cmp.js'

export default {
  template: `
    <div class="note-content">
    <pre> {{note.content.txt}} </pre> 
    </div>
    `,
  props: ['note'],
  data() {
    return {}
  },
  created: function() {},
  computed: {},
  methods: {},
  // components: {xxxx }
}
