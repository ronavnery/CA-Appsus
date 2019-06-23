import colorCtrl from './color-ctrl-cmp.js'

export default {
  template: `
<div class="common-ctrl flex space-between ">
  
    <button @click.stop="openColorCtrl($event)" ><i class="icon button-icon icon-color-painting-palette-1"></i></button>   
    
    <button @click.stop="deleteNote($event)"><i class="icon button-icon icon-bin-1-heavy"></i></button>
    
</div>
    `,
  props: ['colors'],
  data() {
    return {  }
  },
  created() {
    // console.log('colors at cmn control',this.colors)
  },
  methods: {
    closeMsg() {
      this.msg = null
    },
    openColorCtrl() {
      console.log('color event emitted form comctrl')
      this.$emit('open-colors')
      // this.showColorCtrl=true
    },
    deleteNote() {
      this.$parent.$emit('delete-note')
    }
  },
  components: { colorCtrl }
}
