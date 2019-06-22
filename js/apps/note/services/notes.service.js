// CRUDL
import utils from '../../../services/utils.service.js'

export default {
  getEmptyTxtNote,
  getEmptyTodoNote,
  getEmptyImgNote,
  query,
  addTxtNote,
  toggle,
  setValue
}

var gNotes = []
if (utils.loadFromStorage('notes')) {
  gNotes = utils.loadFromStorage('notes')
} else {
  _createNotes()
}

console.log('gNotes :', gNotes);

function query() {
  console.log('gNotes :', gNotes)
  utils.saveToStorage('notes', gNotes)
  return gNotes
}

function addTxtNote(note) {
  note.id = makeId()
  // console.log('note :', note)
  gNotes.unshift(note)
  utils.saveToStorage('notes', gNotes)
}

function toggle(Note) {
  Note.isDone = !Note.isDone
}

function _createNotes() {
  addTxtNote(getEmptyTxtNote('Finish Note App', 1))
  addTxtNote(getEmptyTxtNote('Go to the beach', 2))
  addTxtNote(getEmptyTodoNote('Buy Flowers', 3))
  console.log('gNotes created', gNotes)
}

function getEmptyTxtNote(txt = '', color) {
  return {
    type: 'txt-note',
    content: {
      txt
    },
    color: 1,
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

function setValue(id, attr, val) {
  let note = getNoteById(id)
  note[attr] = val
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
