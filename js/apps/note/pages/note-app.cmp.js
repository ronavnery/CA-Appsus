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
    
      <!-- <component :is="[newNote.type]+'-input'"></component> -->
    <div class="input-bar flex space-between">
      <div v-if="newNote.type === 'txt-note'">
        <input type="text" placeholder="your note..." v-model="newNote.txt" @keyup.enter="addNote" @blur="addNote" class="text-input"/> </div>
        <input-type-select @click.native="changeInputType(ev)" />
    
      <div class="input-bar" v-else-if="newNote.type === 'todo-note'">
      <input type="text" placeholder="enter todo" v-model="newNote.txt" @keyup.enter="addNote" @blur="addNote" class="text-input"/> </div>



      
</div>


      <!-- <div v-for="(note, i) in notes" @click="editNote(note , i)" :class="{ 'hide' :(activeNoteIdx===i) }"> -->
          <!-- <color-ctrl></color-ctrl> -->


<!--///////////////////////////////////////////////////////////////////// -->
          <component :is="note.type" v-for="(note, i) in notes" :info="note" @change-color = "changeColor($event,i)"  @delete-note="deleteNote(i,$event)"  class="" :colors="colors"></component >
      
          
      
      <div class='edit-modal' v-if = "activeNoteIdx !=-1" >
            
        <h3 contenteditable="true">{{activeNote.title}}</h3>
        <p contenteditable="true"> {{activeNote.txt}}</p>  
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
      colors: 8
    }
  },
  methods: {
    addNote() {
      if (this.newNote.txt === '') return
      noteService.add(this.newNote)
      this.newNote = noteService.getEmptyNote()
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
      this.activeNoteIdx = -1
      console.log('update note :')
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
    changeInputType(ev){
      console.log('ev :', ev);
    }
  },

  computed: {
    activeNote: function() {
      if (this.activeNoteIdx == -1) return null
      return this.notes[this.activeNoteIdx]
    },
    inputType: function() {
      // return newNote.type
    }
  },

  components: {
    controlBar,
    colorCtrl,
    txtNote,
    todoNote,
    'txt-note-input': txtInput,
    'input-type-select':inputTypeSelect
  }
}

// <!-- <input type="checkbox" v-model="newNote.isDone"  /> Done? -->
// <!-- <input type="number" v-model.number="newNote.priority" placeholder="Priority"  />  -->
