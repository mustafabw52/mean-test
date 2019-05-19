app.controller("HomeController", function($scope, apiServices) {
  $scope.data = [];
  $scope.genderArray = ['male', 'female', 'others'];
  apiServices.call(`/initialvalues`, {} , 'GET')
    .then((response) => {
			$scope.data = response.data;
		}).catch((error) => {
			console.log(error);
    });
    
  $scope.submit = function() {
    apiServices.call(`/initialvalues`, {data:$scope.data} , 'POST')
    .then((response) => {
			alert(response.message);
		}).catch((error) => {
			console.log(error);
    });
  }
});
