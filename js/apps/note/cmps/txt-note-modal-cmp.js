import colorCtrl from '../cmps/color-ctrl-cmp.js'
import commonControls from '../cmps/common-ctrls-cmp.js'

export default {
  template: `
    <section :class="'note-color-'+[note.color]">
           
        <!-- <pre>{{localNote}}</pre> -->
        
        <p contenteditable="true"  @input="editText($event)">
            {{localNote.content.txt}}</p>  
        <div class="edit-footer flex space-between">
        <div class="controls">
        <transition name="scale-fade">
         <color-ctrl v-if="showColorCtrl" @close-color="closeColors()" @change-color="emitColorChange($event)"></color-ctrl> 
        </transition>
       <common-controls @open-colors="openColors()" ></common-controls>

        </div>
        <button @click="closeModal">Close</button>
    </div>  

        </section>
    `,
  props: ['note'],
  data() {
    return {
      localNote: {},
      userInput: '',
      showColorCtrl: false
    }
  },
  created() {
    this.localNote = JSON.parse(JSON.stringify(this.note))
    this.userInput = this.localNote.content.txt
  },

  methods: {
    editText(ev) {
      if (ev.target.innerText === '') ev.target.innerText = 'Empty note'
      this.userInput = ev.target.innerText
    },
    openColors() {
      console.log('open colors on note')
      this.showColorCtrl = true
    },
    closeColors() {
      this.showColorCtrl = false
    },
    emitColorChange(color) {
      this.closeColors()
      this.localNote.color = color
      this.$emit('change-color', { color, id: this.note.id })
    },
    closeModal() {
      this.localNote.content.txt = this.userInput
      this.$emit('close-modal', this.localNote)
    }
  },
  components: { commonControls, colorCtrl }
}
