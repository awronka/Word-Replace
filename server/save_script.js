// Saves options to chrome.storage
function save_options() {
    chrome.storage.sync.get({
    obj:""
  }, function(items){
      console.log(items.obj)
      // debugger;
      if(document.getElementById('word').value==""){
          var status = document.getElementById('word-error');
          status.textContent = ' NEED A WORD!';
          return
      }
      if(document.getElementById('replace').value==""){
          var status = document.getElementById('replace-error');
          status.textContent = ' NEED A REPLACEMENT!';
          return
      }

      var obj = {};
      obj.word = document.getElementById('word').value;
            //check for duplicates
      var check = items.obj.filter(function(word){
          return word.word === obj.word;
      })
      if(check.length){
          var status = document.getElementById('word-error');
          status.textContent = ' WORD ALREADY EXISTS! DELETE FIRST!';
          return
      }

      obj.replace = document.getElementById('replace').value;
      obj.counter = 0;
      var arr =items.obj
      arr.push(obj)
      chrome.storage.sync.set({
         obj: arr
        }, function() {
          // Update status to let user know options were saved.
          console.log("hit")
          var status = document.getElementById('status');
          status.textContent = 'Options saved.';
                formClear();
                removeList();
                fillDom();
      });
     })
}

function getAll(){
  chrome.storage.sync.get({
    obj:""
  }, function(data){
    return data;
  })
};

function removeList(){
 var element = document.getElementById("word-list");
 var element2 = document.getElementById("replace-list");
 
 while (element.firstChild&&element2.firstChild) {
      element.removeChild(element.firstChild);
      element2.removeChild(element2.firstChild);
    }
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
     chrome.storage.sync.set({obj:arr},function(){
      document.getElementById('word').value="";
      document.getElementById('replace').value="";
      formClear();
      removeList();
      fillDom();
     })
  })
}
document.addEventListener('DOMContentLoaded', fillDom);
document.getElementById('save').addEventListener('click',
    save_options);
    
document.getElementById('delete').addEventListener('click', deleteWords);


function formClear(){
                 document.getElementById('word').value = "";
                document.getElementById('replace').value ="";
                document.getElementById('word-error').textContent="";
                document.getElementById('replace-error').textContent="";
}