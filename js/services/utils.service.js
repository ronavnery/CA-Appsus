export default {
  saveToStorage,
  loadFromStorage,
  copyStringToClipboard,
  makeId
}



export function makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

export function saveToStorage(key, value) {
  var strValue = JSON.stringify(value);
  try {
      localStorage.setItem(key, strValue);
  } catch (err) {
      if (err.code === 22) {
          console.log('Local Storage Full');

          // localStorage.clear();
          // localStorage.setItem(key, strValue);
      }
  }
}
export function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}



export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function copyStringToClipboard(str) {
  // Create new element
  var el = document.createElement('textarea');
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = {
      position: 'absolute',
      left: '-9999px'
  };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand('copy');
  // Remove temporary element
  document.body.removeChild(el)
}