import commonControls from './common-ctrls-cmp.js'
import colorCtrl from './color-ctrl-cmp.js'
import txtNote from './txt-note-cmp.js'
import todoNote from './todo-note-cmp.js'
import eventBus, { CHANGE_COLOR } from '../../../event-bus.js'

export default {
  template: `
    <section class="note" :class="'note-color-'+[note.color]">
    <button @click.stop="togglePin($event)" id="button-pinned"><i class="icon  button-icon" v-bind:class="ToggeledPinIcon"></i></button>
 

    <component :is="note.type" :note="note"  />

      <transition name="scale-fade">
         <color-ctrl v-if="showColorCtrl" @change-color="emitColorChange" @close-color="closeColors()"></color-ctrl> 
      </transition>
       <common-controls @open-colors="openColors()"></common-controls>
    
    </section>
    `,
  props: ['note'],
  data() {
    return {
      showColorCtrl: false,
      ToggeledPinIcon: {
        'icon-pin': !this.note.pinned,
        'icon-pin-2': this.note.pinned
      }
    }
  },
  mounted() {},
  methods: {
    togglePin() {
      this.$emit('toggle-pin')
    },
    // toggle(ev){
    //   console.log('ev :', ev);
    // },
    openColors() {
      this.showColorCtrl = true
    },
    closeColors() {
      this.showColorCtrl = false
    },
    emitColorChange(color) {
      this.closeColors()
      this.$emit('change-color', { color, id: this.note.id })
    }
  },
  components: { todoNote, txtNote, commonControls, colorCtrl }
}
