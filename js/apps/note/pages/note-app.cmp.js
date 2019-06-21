import controlBar from '../cmps/control-bar-cmp.js'
import noteService from '../services/notes.service.js'

export default {
  template: `
        <section class="note-app">
           
            <div class="control-bar">
                 <input type="text" placeholder="" v-model="newNote.txt" @keyup.enter="addNote" @blur="addNote" class="text-input"/> 
                 <!-- <button @click="addNote">Add</button> -->
            </div>
            
            
            <ul>
                <li v-for="(note, i) in notes" @click="editNote(note , i)" :class="{'note-done' : note.isDone , 'hide' :(activeNoteIdx===i) }">
                    <h3>{{note.title}}</h3>
                    <p> {{note.txt}}</p>  
                    <button @click.stop="deleteNote(i)">x</button>
                </li>
            </ul>
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
      newNote: noteService.getEmptyNote(),
      activeNoteIdx: -1
    }
  },
  methods: {
    addNote() {
      if (this.newNote.txt === '') return
      noteService.add(this.newNote)
      this.newNote = noteService.getEmptyNote()
      console.log(this.notes)
    },

    deleteNote(noteIdx) {
      // console.log('Ev', ev);
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
      console.log('update note :');

    }
  },
  computed: {
    activeNote: function() {
      if (this.activeNoteIdx == -1) return null
      return this.notes[this.activeNoteIdx]
    }
  },

  components: { controlBar }
}

// <!-- <input type="checkbox" v-model="newNote.isDone"  /> Done? -->
// <!-- <input type="number" v-model.number="newNote.priority" placeholder="Priority"  />  -->
