walk(document.body);

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
    word: "",
    replace: ""
  }, function(items) {
	  // console.log("these are",items)
   var v = textNode.nodeValue;
	var re =new RegExp('\\b'+items.word+'\\b','g')
	console.log(re)
	 v = v.replace(re, items.replace);
	 v = v.replace(/\bbreak\b/g, "Meow");
	//  v = v.replace(re, "ouch");
	
	
	textNode.nodeValue = v;
  });
	
	
	
}