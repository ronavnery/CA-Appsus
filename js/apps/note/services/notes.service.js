// CRUDL
import  utilities  from '../../../services/utils.service.js'

export default {
  getEmptyTxtNote,
  query,
  add,
  toggle
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
  add(getEmptyTxtNote('Finish Note App', 'Remeber'))
  add(getEmptyTxtNote('Go to the beach', 'And later'))
  console.log('gNotes created', gNotes)
}

function getEmptyTxtNote(
  txt = '',
  title = '',
  color = 'c-yellow'
  ) {
  return {
    content: {
      txt,
      title
    },
    color,
    pinned: false,
    lastEdited: Date.now()
  }
}

function getEmptyImgNote(
  imageURL = null,
  color = 'c-yellow'
) {
  return {
    content: {
      imageURL,
      color,
      pinned: false,
      lastEdited: Date.now()
    }
  }
}

function getEmptyTodoNote() {
  return {
    content: {
      todos: [{ txt, isDone }],
      color,
      pinned: false,
      lastEdited: Date.now()
    }
  }
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
