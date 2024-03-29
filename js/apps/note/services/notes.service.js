// CRUDL
import { utilService } from '../../../services/utils.service.js'

export default {
  getEmptyTxtNote,
  getEmptyTodoNote,
  getEmptyImgNote,
  query,
  addNote,
  setValue,
  deleteNote,
  togglePinned,
  toggleTodo,
  updateNote
}

var gNotes = []
if (utilService.loadFromStorage('notes')) {
  gNotes = utilService.loadFromStorage('notes')
} else {
  _createNotes()
}

// console.log('gNotes :', gNotes)

function query() {
  utilService.saveToStorage('notes', gNotes)
  return gNotes
}

function addNote(note) {
  note.id = makeId()
  console.log('adding note :', note)
  gNotes.unshift(note)
  utilService.saveToStorage('notes', gNotes)
}


function _createNotes() {
  addNote(getEmptyTxtNote('Finish Note App', 1,true))

  let newTodoNote = 
    {
      type: 'todo-note',
      content: [ 
        { txt: 'Finish Note App',
        isDone: false },
        { txt: 'Live a little',
        isDone: false },
        { txt: 'Do the dishes',
        isDone: true }],
        color: 2,
        pinned: false,
        lastEdited: Date.now()
      } 

  addNote(newTodoNote)

  addNote(getEmptyTxtNote('Get a haircut \n Live a little', 1 ))

  addNote(getEmptyTxtNote('Love me or leave me and let me be lonely \n You wont believe me but I love you only \n I\'d rather be lonley than happy with somebody else...', 4 ))

  addNote(getEmptyTxtNote('Go to the beach \n GO TO THE BEACH!!!', 2))

  addNote(getEmptyTxtNote('O snail \n\tClimb Mount Fuji,   \nBut slowly, \n \t\t slowly!', 3))

  addNote(getEmptyTxtNote('London Bridge is falling down, Falling down, falling down, London Bridge is falling down, My fair Lady.', 5))

  addNote(getEmptyTxtNote('O snail \n\tClimb Mount Fuji,   \nBut slowly, \n \t\t slowly!', 7))

  addNote(getEmptyTxtNote('Buy her flowers\nsay you\'re sorry\nwhatever', 3))

  console.log('gNotes created', gNotes)
}

function getEmptyTxtNote(txt = '', color=1, pinned=false) {
  return {
    type: 'txt-note',
    content: {
      txt
    },
    color,
    pinned,
    lastEdited: Date.now()
  }
}

function getEmptyImgNote(imageURL = null, color) {
  return {
    type: 'img-note',
    content: {
      imageURL,
      color,
      pinned: false,
      lastEdited: Date.now()
    }
  }
}

function getEmptyTodoNote(txt = '', color) {
  return {
    type: 'todo-note',
    content: [{ txt, isDone: false }],
      color,
      pinned: false,
      lastEdited: Date.now()
  }
}

function updateNote(editedNote) {
  let id = editedNote.id
  let idx = getIdxById(id)
  gNotes[idx] = editedNote
  gNotes[idx].id =  makeId()
  console.log('gNote[idx] :', gNotes[idx])
}

function deleteNote(id) {
  let noteIdx = getIdxById(id)
  gNotes.splice(noteIdx, 1)
}

function setValue(id, attr, val) {
  console.log('setting value', id, attr, val)
  let note = getNoteById(id)
  note[attr] = val
  utilService.saveToStorage('notes', gNotes)
}
function togglePinned(noteId) {
  let note = getNoteById(noteId)
  note.pinned = !note.pinned
  utilService.saveToStorage('notes', gNotes)
}

function toggleTodo(id,todoIdx){
  let noteIdx = getIdxById(id)
  let todo = gNotes[noteIdx].content[todoIdx]
  todo.isDone = !todo.isDone
  console.log('todo :', todo);

}


function getNoteById(id) {
  return gNotes.find(note => {
    return note.id === id
  })
}

function getIdxById(id) {
  let idx = gNotes.findIndex(note => note.id === id)
  return idx
}

function makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}
