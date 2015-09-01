
save_hrefs();

function save_hrefs() {
    chrome.storage.sync.get({
    hrefs:[],
    obj:""
  }, function(items){
      // console.log(items.obj)
      var obj ={};
      if(items.hrefs.length ===50){items.href.unshift}
      obj.webAddress = window.location.href;
      obj.wordCounts = webPageWordCount(items.obj)
      var arr = items.hrefs;
      // console.log(obj)
      arr.push(obj)
      // console.log(arr)
      chrome.storage.sync.set({
         hrefs: arr
        }, function() {
          // Update status to let user know options were saved.
          console.log('saved')
      });
     })
}

function webPageWordCount (replacements) {
    //--- Search for "of" as many whole word.
	replacements.forEach(function(wordObj, index){
    var wordStr     = wordObj.word;
    var wordRegex   = new RegExp ("\\b" + wordObj.replace + "\\b", "gi");
    var matchRez    = $(document.body).text ().match (wordRegex);
    var wordCount   = matchRez ? matchRez.length : 0;
	replacements[index].counter = wordCount;
	})
	return replacements
}




