// CRUDL
export default {
  getEmptyNote,
  query,
  add,
  toggle
}

var gNotes = []
_createNotes()

function query() {
  return gNotes
}
function add(Note) {
  Note.id = makeId()
  gNotes.unshift(Note)
}
function toggle(Note) {
  Note.isDone = !Note.isDone
}

function _createNotes() {
  add(getEmptyNote('Finish Note App'))
  add(getEmptyNote('Go to the beach'))
}

function getEmptyNote(txt = '') {
  return {
    txt,
    isDone: false,
    priority: 0
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
