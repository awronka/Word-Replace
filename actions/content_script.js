walk(document.body);
getImages(document.body)
function walk(node) 
{
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{	
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	chrome.storage.sync.get({
 		obj:""
  }, function(items) {
	  // console.log("these are",items.obj)

   	var v = textNode.nodeValue;
		items.obj.forEach(function(word){
			// console.log(word)
				var re =new RegExp('\\b'+word.word+'\\b','g');
				 v = v.replace(re, word.replace);		
		})
	textNode.nodeValue = v;
  });
	
	
	
}

function getImages(node){
	var images = document.getElementsByTagName('img')
	console.log(images[2])
	var newImg = 'https://upload.wikimedia.org/wikipedia/commons/3/33/Nicolas_Cage_2011_CC.jpg'
	images.forEach(function(obj){
		obj.currentSrc = newImg;
		obj.baseURI = newImg;
		obj.src = newImg;
		obj.srcset = newImg;
	})
		
}