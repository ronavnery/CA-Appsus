// CRUDL
import utilities from '../../../services/utils.service.js'

export default {
  getEmptyTxtNote,
  getEmptyTodoNote,
  getEmptyImgNote,
  query,
  add,
  toggle,
  setValue
}

var gNotes = []
_createNotes()

function query() {
  return gNotes
  //   console.log('gNotes :', gNotes);
}
function add(Note) {
  Note.id = makeId()
  gNotes.unshift(Note)
}
function toggle(Note) {
  Note.isDone = !Note.isDone
}

function _createNotes() {
  add(getEmptyTxtNote('Finish Note App', 1))
  add(getEmptyTxtNote('Go to the beach', 2))
  add(getEmptyTodoNote('Buy Flowers', 3))
  console.log('gNotes created', gNotes)
}

function getEmptyTxtNote(txt = '', color) {
  return {
    type: 'txt-note',
    content: {
      txt,
    },
    color,
    pinned: false,
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
    content: {
      todos: [{ txt, isDone: false }],
      color,
      pinned: false,
      lastEdited: Date.now()
    }
  }
}

function setValue(id, attr , val) {
  let note = getNoteById(id)
  note[attr]=val
}

function getNoteById(id) {
  return gNotes.find(note => {
    return note.id === id
  })
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
