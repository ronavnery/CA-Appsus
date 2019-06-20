import controlBar from '../cmps/control-bar-cmp.js'
import noteService from '../services/notes.service.js'

export default {
  template: `
        <section class="Note-app">
           
            <div class="control-bar">
                 <input type="text" placeholder="" v-model="newNote.txt" @keyup.enter="addNote" class="text-input"/> 
            </div>
            
            
            <ul>
                <li v-for="(Note, i) in Notes" @click="toggleNote(Note)" :class="{'Note-done' : Note.isDone}">
                    {{Note.txt}}  
                    <button @click.stop="deleteNote(i)">x</button>
                </li>
            </ul>
            <div>
               
                <input type="checkbox" v-model="newNote.isDone"  /> Done?
                <input type="number" v-model.number="newNote.priority" placeholder="Priority"  /> 
                <button @click="addNote">Add</button>
            </div>
        </section>
    `,
  data() {
    return {
      Notes: noteService.query(),
      newNote: noteService.getEmptyNote()
    }
  },
  methods: {
    addNote() {
      noteService.add(this.newNote)
      this.newNote = noteService.getEmptyNote()
      console.log(this.Notes)
    },
    toggleNote(Note) {
      console.log('TOGGLING Note')
      noteService.toggle(Note)
    },

    deleteNote(NoteIdx) {
      // console.log('Ev', ev);
      this.Notes.splice(NoteIdx, 1)
    },
    keyUp(ev) {
      if (ev.key === 'Enter') {
        this.addNote()
      }
    }
  },
  components: { controlBar }
}


// <!-- <control-bar ></control-bar> -->