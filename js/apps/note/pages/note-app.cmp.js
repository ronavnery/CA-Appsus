import txtNote from '../cmps/txt-note-cmp.js'
import todoNote from '../cmps/todo-note-cmp.js'
import colorCtrl from '../cmps/color-ctrl-cmp.js'
import txtInput from '../cmps/txt-input-cmp.js'
import inputTypeSelect from '../cmps/input-type-select-cmp.js'
import txtNoteModal from '../cmps/txt-note-modal-cmp.js'

import eventBus, { CHANGE_COLOR } from '../../../event-bus.js'

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


<!--//////////////////// NOTES  //////////////////////////////////// -->
    <div className="pinned-notes-container">
    <div class="notes-container flex flex-wrap">
        <component :is="note.type" v-for="(note, i) in notes"
        :note="note" v-if="note.pinned===true" @change-color = "changeColor($event)" @toggle-pin = "togglePin(note.id)"
        @delete-note="deleteNote(i)" @click.native="editNote(i)" 
        :class="{ 'hide' :(activeNoteIdx===i) }" ></component >
    </div>
    </div>

    <div class="notes-container flex column flex-wrap">
        <component :is="note.type" v-for="(note, i) in notes"
        :note="note" v-if="note.pinned===false" @change-color = "changeColor($event)" @toggle-pin = "togglePin(note.id)"
        @delete-note="deleteNote(i)" @click.native="editNote(i)" 
        :class="{ 'hide' :(activeNoteIdx===i) }" ></component >
    </div>
  <!--//////////////////// EDIT MODAL  //////////////////////////////////// -->        
      
    <div   v-if = "activeNoteIdx !=-1">

      <component :is="[activeNote.type]+'-modal'" :note="activeNote" @close-modal="saveEdit" @delete-note="deleteNote(activeNoteIdx,$event)" @change-color="changeColor($event)"></component > 
      <!-- type is {{activeNote.type}}-modal -->
      
                 
    </div>
  </section>
  `,
  data() {
    return {
      notes: noteService.query(),
      newNote: noteService.getEmptyTxtNote(),
      activeNoteIdx: -1,
      colors: 8,
      editedTxt: ''
    }
  },
  methods: {
    addTxtNote() {
      if (this.newNote.content.txt === '') return
      noteService.addTxtNote(this.newNote)
      this.newNote = noteService.getEmptyTxtNote()
    },

    deleteNote(noteIdx) {
      this.notes.splice(noteIdx, 1)
      this.activeNoteIdx = -1
      this.notes = noteService.query()
    },
    editNote( idx) {
      if (this.activeNoteIdx !== -1) return
      this.activeNoteIdx = idx
    },
    saveEdit(editedNote) {
      noteService.setNote(editedNote)
      this.activeNoteIdx = -1
    },
    keyUp(ev) {
      if (ev.key === 'Enter') {
        this.addNote()
      }
    },

    changeColor(colorAndId) {
      noteService.setValue(colorAndId.id, 'color', colorAndId.color)
      this.notes = noteService.query() 
    },

    changeInputType(ev) {
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
    },
    togglePin(noteId) {
      console.log('noteId :', noteId)
      noteService.togglePinned(noteId)
      this.notes = noteService.query() 
    }
  },

  computed: {
    activeNote: {
      get: function() {
        if (this.activeNoteIdx == -1) return null
        return this.notes[this.activeNoteIdx]
      }
      // set: function(editedNote) {
      //   return editedNote
      // }
    }
  },

  components: {
    colorCtrl,
    txtNote,
    todoNote,
    'txt-note-input': txtInput,
    'input-type-select': inputTypeSelect,
    'txt-note-modal': txtNoteModal
  }
}

// <!-- <input type="checkbox" v-model="newNote.isDone"  /> Done? -->
// <!-- <input type="number" v-model.number="newNote.priority" placeholder="Priority"  />  -->

// computed: {
//   fullName: {
//     // getter
//     get: function () {
//       return this.firstName + ' ' + this.lastName
//     },
//     // setter
//     set: function (newValue) {
//       var names = newValue.split(' ')
//       this.firstName = names[0]
//       this.lastName = names[names.length - 1]
//     }
//   }
// }
