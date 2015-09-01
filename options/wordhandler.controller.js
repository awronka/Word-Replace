app.controller('WordHandlerCtrl', function($scope, DataFactory){
	
	$scope.data = null;
	$scope.web = null;
	
	$scope.getWords= function(){
		chrome.storage.sync.get({
			    	obj:""
					  }, function(data){
					    $scope.data = data;
						console.log($scope.data)
					  });
	}
	
	$scope.getWebInfo = function(){
		console.log($scope.web)
			// chrome.storage.sync.get({
			//     	hrefs:""
			// 		  }, function(data){
			// 		    $scope.web = data;
			// 			console.log($scope.web)
			// 			// chrome.storage.sync.set({
			// 			// 	hrefs:[]
			// 			// })
			// 		  });
	}
	
	var setData = function(){
		chrome.storage.sync.get({
			hrefs: "",
			obj: ""
		}, function(data){
			$scope.data = data.obj;
			$scope.web = data.hrefs;
		})
	}
	
	setData();
	
})