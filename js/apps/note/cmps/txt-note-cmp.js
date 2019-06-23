import commonControls from './common-ctrls-cmp.js'
import colorCtrl from '../cmps/color-ctrl-cmp.js'
import eventBus, { CHANGE_COLOR } from '../../../event-bus.js'

export default {
  template: `
    <section class="note" :class="'note-color-'+[note.color]">
    <button @click.stop="deleteNote($event)" class="button-pinned"><i class="icon button-icon icon-pin"></i></button>
    <!-- <i class="icon button-icon icon-pin"></i> -->
       <p> {{note.content.txt}}</p> 
       <transition name="scale-fade">
         <color-ctrl v-if="showColorCtrl" @change-color="emitColorChange" @close-color="closeColors()"></color-ctrl> 
        </transition>
       <common-controls @open-colors="openColors()"></common-controls>
    
    </section>
    `,
  props: ['note'],
  data() {
    return {
      showColorCtrl: false
    }
  },
  mounted() {},
  methods: {
    deleteNote(ev) {
      // this.$emit('deleteNote')
    },
    openColors() {
      console.log('open colors on note')
      this.showColorCtrl = true
    },
    closeColors() {
      this.showColorCtrl = false
    },
    emitColorChange(color) {
      console.log('got color', color, 'id is', this.note.id)
      this.closeColors()
      this.$emit('change-color', { color, id: this.note.id })
    }
  },
  components: { commonControls, colorCtrl }
}
