// import xxxx from './color-ctrl-cmp.js'

export default {
  template: `
   <div class="input-type-select">
          <button @click="emitit('txt')"><i class="icon icon-text-style button-icon"></i></button>
          <button @click="emitit('todo')"><i class="icon icon-list-bullets-3-heavy button-icon"></i></button>
          <button @click="emitit('img')"><i class="icon icon-picture-landscape-2 button-icon"></i></button>
      </div>
    `,
  props: [],
  data() {
    return {}
  },
  created: function() {},
  computed: {},
  methods: {
    emitit: function(val) {
      this.$emit('input-change', val)
    }
  },
  // components: {xxxx }
}
