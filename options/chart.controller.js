app.controller('ChartCtrl', function($scope, $element){
	$scope.wordData = null;
	$scope.web = null;

	$scope.getAllData= function(){
		// console.log($scope.web[0].wordCounts, $scope.wordData)
		console.log( $scope.new.webSelect)
		console.log($scope.web)
		var arr = $scope.web.filter(function(obj){
			console.log(obj.webAddress)
			return $scope.new.webSelect == obj.webAddress
		})
		makeTable($scope.wordData, arr[0].wordCounts)
	}
	
	$scope.selectedData=null;

// delete all webPage data
 $scope.deleteWebData = function(){
	 	chrome.storage.sync.get({
			hrefs: "",
		}, function(data){
			console.log(data)
			chrome.storage.sync.set({
				hrefs:[]
			})
		})
 }
	
	var setData = function(){
		chrome.storage.sync.get({
			hrefs: "",
			obj: ""
		}, function(data){
			$scope.$evalAsync(function () {
				$scope.wordData = data.obj;
				$scope.web = data.hrefs;
				console.log($scope.web)
			});
		})
	}
    
	setData();
//$scope.getAllData();

//create by site;
	$scope.bySite = function(){
		makeTable()
	}
	
	
		
// chart generator	
	chrome.storage.sync.get({
    obj:""
  }, function(data){
	  makeTable(data.obj)
 
  })	
  
  
  
  
//make Table function
  function makeTable(){
	  console.log(arguments[0])
	  var data = arguments[0]
	  if(arguments.length >1){
		  var data2 = arguments[1]
	  }
	 var buyerData = {
			labels : [],
			datasets : [
				{
					fillColor : "rgba(172,194,132,0.4)",
					strokeColor : "#ACC26D",
					pointColor : "#fff",
					pointStrokeColor : "#9DB86D",
					data : []
				}
			]
		}
		// console.log(data.obj)
		data.forEach(function(wordObj){
			buyerData.labels.push(wordObj.word)
			buyerData.datasets[0].data.push(wordObj.counter)
			
		}) 
		if(data2){
			buyerData.datasets.push({
						fillColor : "rgba(200, 0, 0, 0.4)",
						strokeColor : "#ff0000",
						pointColor : "#fff",
						pointStrokeColor : "#9DB86D",
						data : []
					})
			data2.forEach(function(wordObj){
				buyerData.datasets[1].data.push(wordObj.counter)
			}) 
		}
		var buyers = document.getElementById('buyers').getContext('2d');
		new Chart(buyers).Bar(buyerData);

  }


})