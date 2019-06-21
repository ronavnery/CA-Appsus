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
  add(getEmptyNote('Finish Note App', 'Remeber'))
  add(getEmptyNote('Go to the beach', 'And later'))
  console.log('gNotes created', gNotes)
}

function getEmptyNote(
  txt = '',
  title = '',
  imageURL = '',
  color = 'yellow',
  showCheckbox = false,
  pinned = false
) {
  return {
    txt,
    title,
    imageURL,
    color,
    showCheckbox,
    isDone: false,
    pinned: false,
    lastEdited: Date.now()
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
