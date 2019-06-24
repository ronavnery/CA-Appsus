import colorCtrl from './color-ctrl-cmp.js'
import commonControls from './common-ctrls-cmp.js'
import todoNote from './todo-note-cmp.js'


export default {
  template: `
    <section class="edit-modal" :class="'note-color-'+[note.color]">
    
        <template v-if="(note.type==='txt-note')">
          <p contenteditable="true"  @input="editText($event)">
            {{localNote.content.txt}}</p>  
        </template>
        <template v-else>
            <todo-note :note="note"></todo-note>
        </template>
        <div class="edit-footer flex space-between">
        <div class="controls ">
        <transition name="scale-fade">
         <color-ctrl v-if="showColorCtrl" @close-color="closeColors()" @change-color="emitColorChange($event)"></color-ctrl> 
        </transition>
       <common-controls @delete-note="deleteNote" @open-colors="openColors()" id="ctrls-modal"></common-controls>

        </div>
        <button class="button-close" @click="closeModal">Close</button>
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
    },
    deleteNote() {
      this.parent.$emit('delete-note')
    }
  },
  components: { commonControls, colorCtrl, 'todo-note':todoNote}
}
