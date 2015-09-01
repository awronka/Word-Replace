storeCounter(document.body);
getImages(document.body);
function walk(node, replacements) 
{
			var child, next;
			// console.log(replacements)
			switch ( node.nodeType )  
			{
				case 1:  // Element
				case 9:  // Document
				case 11: // Document fragment
					child = node.firstChild;
					while ( child ) 
					{	
						next = child.nextSibling;
						walk(child, replacements);
						child = next;
					}
					break;
		
				case 3: // Text node
					handleText(node, replacements);
					break;
			}
}

function storeCounter(node){
		chrome.storage.sync.get({
 		obj:""
		  }, function(replacements) {
		  walk(document.body, replacements);
		  checkWordCount(replacements)
		  })		
}

function handleText(textNode, replacements) 
{
   	var v = textNode.nodeValue;
		replacements.obj.forEach(function(word, index){
			// console.log(index)
				var re =new RegExp('\\b'+word.word+'\\b','g');
				// console.log(v.replace(re, word.replace))
				 v = v.replace(re, word.replace);
				//  replacements.obj[index].counter++
				//  console.log(replacements.obj[index].counter)	
		})
	// console.log(v)
	textNode.nodeValue = v;
}

function getImages(node){
	// console.log(window.location.href)
	var images = document.getElementsByTagName('img')
	// console.log(images[2])
	// var newImg = 'https://upload.wikimedia.org/wikipedia/commons/3/33/Nicolas_Cage_2011_CC.jpg'
	// images.forEach(function(obj){
	// 	obj.currentSrc = newImg;
	// 	obj.baseURI = newImg;
	// 	obj.src = newImg;
	// 	obj.srcset = newImg;
	// })
		
}

function checkWordCount (replacements) {
    //--- Search for "of" as many whole word.
	replacements.obj.forEach(function(wordObj, index){
    var wordStr     = wordObj.word;
    var wordRegex   = new RegExp ("\\b" + wordObj.replace + "\\b", "gi");
    var matchRez    = $(document.body).text ().match (wordRegex);
    var wordCount   = matchRez ? matchRez.length : 0;
	replacements.obj[index].counter += wordCount;
	})
	// console.log(replacements.obj)
	chrome.storage.sync.set({
		obj: replacements.obj
	})
}