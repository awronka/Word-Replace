// Saves options to chrome.storage
function save_options() {
  var word = document.getElementById('word').value;
  var replace = document.getElementById('replace').value;
  chrome.storage.sync.set({
    word: word,
    replace: replace
  }, function() {
    // Update status to let user know options were saved.
    console.log("hit")
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using ouch preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    word: "",
    replace: ""
  }, function(items) {
    document.getElementById('word').value = items.word;
    document.getElementById('replace').value = items.replace;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);