// Saves options to chrome.storage
function save_options() {
    chrome.storage.sync.get({
    obj:""
  }, function(items){
      console.log(items)
      debugger;
      var obj = {};
      obj.word = document.getElementById('word').value;
      obj.replace = document.getElementById('replace').value;
      var arr =items.obj
      arr.push(obj)
      chrome.storage.sync.set({
         obj: arr
        }, function() {
          // Update status to let user know options were saved.
          console.log("hit")
          var status = document.getElementById('status');
          status.textContent = 'Options saved.';
                document.getElementById('word').value = "";
                document.getElementById('replace').value ="";
                setTimeout(function() {
                status.textContent = '';
          });
      });
     })
}


function fillDom(){
  chrome.storage.sync.get({
    obj:""
  }, function(items){
    console.log("These are my", items)
      for(var i =0; i<items.obj.length; i++){
          var node = document.createElement("LI");                 
          var textnode = document.createTextNode(items.obj[i].word)
          node.appendChild(textnode)
          document.getElementById('word-list').appendChild(node)
          var node = document.createElement("LI");                 
          var textnode = document.createTextNode(items.obj[i].replace)
          node.appendChild(textnode)
          document.getElementById('replace-list').appendChild(node)
      }
  })
}

function deleteWords(){
  var removeObj ={};
  removeObj.replace = document.getElementById('replace').value;
  removeObj.word = document.getElementById('word').value;
  console.log(removeObj);
  chrome.storage.sync.get({
    obj:""
  }, function(items){
    var arr = items.obj.filter(function(obj){
      return obj.word != removeObj.word && obj.replace != removeObj.replace
    })
    console.log(arr)
    debugger;
     chrome.storage.sync.set({obj:arr},function(){
      document.getElementById('word').value;
      document.getElementById('replace').value;
     })
  })
}
document.addEventListener('DOMContentLoaded', fillDom);
document.getElementById('save').addEventListener('click',
    save_options);
    
document.getElementById('delete').addEventListener('click', deleteWords);