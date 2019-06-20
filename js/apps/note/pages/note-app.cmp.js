import controlBar from '../cmps/control-bar-cmp.js'
import noteService from '../services/notes.service.js'

export default {
  template: `
        <section class="note-app">
           
            <div class="control-bar">
                 <input type="text" placeholder="" v-model="newNote.txt" @keyup.enter="addNote" class="text-input"/> 
            </div>
            
            
            <ul>
                <li v-for="(note) in notes" @click="toggleNote(note)" :class="{'note-done' : note.isDone}">
                   <h3>{{note.title}}</h3>
                <p> {{note.txt}}</p>  
                    <button @click.stop="deleteNote(i)">x</button>
                </li>
            </ul>
            <div class='editModal'>
               




                <!-- <input type="checkbox" v-model="newNote.isDone"  /> Done? -->
                <!-- <input type="number" v-model.number="newNote.priority" placeholder="Priority"  />  -->
                <button @click="addNote">Add</button>
            </div>
        </section>
    `, 
  data() {
    return {
      notes: noteService.query(),
      newNote: noteService.getEmptyNote()
    }
  },
  methods: {
    addNote() {
      noteService.add(this.newNote)
      this.newNote = noteService.getEmptyNote()
      console.log(this.notes)
    },
    toggleNote(note) {
      console.log('TOGGLING Note')
      noteService.toggle(note)
    },

    deleteNote(noteIdx) {
      // console.log('Ev', ev);
      this.notes.splice(noteIdx, 1)
    },
    keyUp(ev) {
      if (ev.key === 'Enter') {
        this.addNote()
      }
    }
  },
  components: { controlBar }
}


