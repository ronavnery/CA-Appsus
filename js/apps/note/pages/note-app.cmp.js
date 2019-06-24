import note from '../cmps/note-cmp.js'
import colorCtrl from '../cmps/color-ctrl-cmp.js'
import txtInput from '../cmps/txt-input-cmp.js'
import inputTypeSelect from '../cmps/input-type-select-cmp.js'
import editModal from '../cmps/edit-modal-cmp.js'

import eventBus, {
  CHANGE_COLOR
} from '../../../event-bus.js'

import noteService from '../services/notes.service.js'

export default {
  template: `
 
  <section class="note-app">

    <div class="input-bar flex space-between">
        <input type="text" :placeholder="placeHolderTxt"
        v-model="newNote.content.txt" @keyup.enter="addNote"
        @blur="addNote" class="text-input"/> 
        <input-type-select @input-change="changeInputType($event)"></input-type-select>
    </div>


<!--//////////////////// NOTES  //////////////////////////////////// -->

  <div class="notes-container">
    <h3 v-if="hasPinnedNotes">Pinned Notes</h3>
    <masonry   :cols="{default: 6, 1200: 5 , 1100: 4 ,900: 3, 670: 2}" :gutter="{default: '30px'}">
        <note v-for="(note, i) in pinnedNotes"
        :note="note"  v-show="editedNoteId!==note.id" @toggle-todo="toggleTodo(note.id,$event)" @change-color = "changeColor($event)"
        @toggle-pin = "togglePin(note.id)" @delete-note="deleteNote(note.id)" @click.native="editNote(note.id)"
        :key="i"></note >
    </masonry>

    <h3 v-if="hasPinnedNotes">Others</h3>
    <masonry :cols="{default: 6, 1200: 5 , 1100: 4 ,900: 3, 670: 2}" :gutter="{default: '30px'}"> 
    <note v-for="(note, i) in otherNotes"
        :note="note"  :class="{ 'hide' :(editedNoteId===note.id)  }" @toggle-todo="toggleTodo(note.id,$event)" @change-color = "changeColor($event)"
        @toggle-pin = "togglePin(note.id)" @delete-note="deleteNote(note.id)" @click.native="editNote(note.id)"
        :key="i"></note >
    </masonry>
  </div>
    
  <!--//////////////////// EDIT MODAL  //////////////////////////////////// -->        
      
  <div  v-if = "editedNote" >
     <edit-modal :note="editedNote" @close-modal="saveEdit" @delete-note="deleteNote(editedNoteId,$event)" @change-color="changeColor($event)"
     @toggle-todo=toggleTodo(editedNote.id,$event)></edit-modal > 
  </div>
                 
  </section>
  `,
  data() {
    return {
      notes: noteService.query(),
      newNote: noteService.getEmptyTxtNote(),
      editedNoteId: -1,
    }
  },
  created() {

  },
  methods: {
    addNote() {

      if (this.newNote.content.txt === '') return

      if (this.newNote.type === 'txt-note') {
        noteService.addNote(this.newNote)
        this.newNote = noteService.getEmptyTxtNote()
      } else if

      (this.newNote.type === 'todo-note') {
        let newTodos = this.newNote.content.txt.split(',')
        this.newNote.content = newTodos.map((todo) => {
          return {
            txt: todo,
            isDone: false
          }
        })
        noteService.addNote(this.newNote)
        this.newNote = noteService.getEmptyTxtNote()   
      }

    },

    deleteNote(noteIdx) {
      this.notes.splice(noteIdx, 1)
      this.editedNoteId = -1
      this.notes = noteService.query()
    },
    editNote(id) {
      if (this.editedNoteId !== -1) {
        return
      } else {
        this.editedNoteId = id

      }

    },
    saveEdit(editedNote) {
      noteService.updateNote(editedNote)
      this.editedNoteId = -1
      let notes = noteService.query()
      this.notes = [...notes]
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
      }
    },
    togglePin(noteId) {
      noteService.togglePinned(noteId)
      this.notes = noteService.query()
    },

    toggleTodo(noteId, todoIdx) {
      noteService.toggleTodo(noteId, todoIdx)
    }
  },

  computed: {

    hasPinnedNotes: function () {
      let filteredArr = this.notes.filter(note => {
        return note.pinned
      })
      return filteredArr.length > 0
    },
    pinnedNotes: function () {
      return this.notes.filter((note) => {
        return note.pinned
      })
    },
    otherNotes: function () {
      return this.notes.filter((note) => {
        return !note.pinned
      })
    },
    editedNote: function () {
      if (this.editedNoteId === -1) return null
      let note = this.notes.find((note) => {

        return note.id === this.editedNoteId
      })
      return note
    },
    placeHolderTxt: function () {
      return (this.newNote.type === 'txt-note') ? 'Your note...' : ' Enter todos, seperated by comma'
    }
  },

  components: {
    colorCtrl,
    note,
    'txt-note-input': txtInput,
    'input-type-select': inputTypeSelect,
    'edit-modal': editModal
  }
}