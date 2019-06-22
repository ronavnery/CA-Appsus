import controlBar from '../cmps/ctrl-bar-cmp.js'
import txtNote from '../cmps/txt-note-cmp.js'
import todoNote from '../cmps/todo-note-cmp.js'
import colorCtrl from '../cmps/color-ctrl-cmp.js'
import txtInput from '../cmps/txt-input-cmp.js'
import inputTypeSelect from '../cmps/input-type-select-cmp.js'

import noteService from '../services/notes.service.js'

export default {
  template: `
  <section class="note-app">
    {{this.newNote.type}}
      <!-- <component :is="[newNote.type]+'-input'"></component> -->
    <div class="input-bar flex space-between">
      <template v-if="newNote.type === 'txt-note'">
        
        <input type="text" placeholder="Your note..."
        v-model="newNote.content.txt" @keyup.enter="addTxtNote"
        @blur="addTxtNote" class="text-input"/> 
        <input-type-select @input-change="changeInputType($event)"></input-type-select>
      </template>

    <template v-else-if="newNote.type === 'todo-note'">
      <div class="input-bar" >
      <input type="text" placeholder="enter todo" v-model="newNote.content.txt" @keyup.enter="addNote" @blur="addNote" class="text-input"/> </div> 
      </template>


      
    </div>

      <!-- <pre>{{newNote}}</pre> -->

      <!-- <div v-for="(note, i) in notes" @click="editNote(note , i)" "> -->
          <!-- <color-ctrl></color-ctrl> -->


<!--//////////////////// NOTES  //////////////////////////////////// -->

{{activeNoteIdx}} 
          <component :is="note.type" v-for="(note, i) in notes"
          :info="note" @change-color = "changeColor($event,i)" 
          @delete-note="deleteNote(i,$event)" @click.native="editNote(note , i)"
          :class="{ 'hide' :(activeNoteIdx===i) }" ></component >
      
  <!--//////////////////// EDIT MODAL  //////////////////////////////////// -->        
      
      <div class='edit-modal'  v-if = "activeNoteIdx !=-1"
      :class="'note-color-'+[activeNote.color]" >
            
        <p contenteditable="true" @input="editText"> {{activeNote.content.txt}}</p>  
        <div class="edit-footer flex space-between">
          <div class="controls"><h3>control bar</h3></div>
          <button @click="closeModal">Close</button>
        </div>             
      </div>
  </section>
  `,
  data() {
    return {
      notes: noteService.query(),
      newNote: noteService.getEmptyTxtNote(),
      activeNoteIdx: -1,
      colors: 8,
      editedTxt:''
      
    }
  },
  methods: {
    addTxtNote() {
      console.log('this.newNote :', this.newNote)
      if (this.newNote.txt === '') return
      noteService.addTxtNote(this.newNote)
      this.newNote = noteService.getEmptyTxtNote()
      console.log(this.notes)
    },

    deleteNote(noteIdx, ev) {
      // console.log('delete', i, ev)
      this.notes.splice(noteIdx, 1)
    },
    editNote(note, i) {
      console.log('note :', note)
      this.activeNoteIdx = i
    },
    keyUp(ev) {
      if (ev.key === 'Enter') {
        this.addNote()
      }
    },
    closeModal() {
      this.activeNote.content.txt = this.editedTxt
      this.activeNoteIdx = -1
    },
    openColors() {
      console.log('open the color palette')
    },

    changeColor(color, noteIdx) {
      let id = this.notes[noteIdx].id
      noteService.setValue(id, 'color', color)
      this.notes = noteService.query()
      console.log('this.notes :', this.notes)
    },


    editText(ev) {
      console.log(ev.target.innerText)
      this.editedTxt = ev.target.innerText
      console.log('this.editedTxt  :', this.editedTxt );
    },



    changeInputType(ev) {
      console.log('ev is :', ev)
      switch (ev) {
        case 'txt':
          this.newNote = noteService.getEmptyTxtNote()
          break
        case 'todo':
          this.newNote = noteService.getEmptyTodoNote()
          break
        case 'txt':
          this.newNote = noteService.getEmptyImgNote()
          break
      }
    }
  },

  computed: {
    activeNote: function() {
      if (this.activeNoteIdx == -1) return null
      return this.notes[this.activeNoteIdx]
    },
    // editedTxt: function() {
    //   return this.activeNote.content.txt
    // }
  },

  components: {
    controlBar,
    colorCtrl,
    txtNote,
    todoNote,
    'txt-note-input': txtInput,
    'input-type-select': inputTypeSelect
  }
}

// <!-- <input type="checkbox" v-model="newNote.isDone"  /> Done? -->
// <!-- <input type="number" v-model.number="newNote.priority" placeholder="Priority"  />  -->
