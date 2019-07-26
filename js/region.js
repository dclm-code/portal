app.controller('regionController', function($scope, $http, $filter) {
    this.region = { region_code: '', region_name: '' }

    $scope.save = function() {
        $http({
            url: baseUrl + "regions",
            method: "POST",
            data: this.regions,
            contentType: 'application/json'
        }).then((response) => {
            console.log(response);
            $scope.info = response.data.message;
        }, function(error) {
            console.log(error);
            $scope.error = error.data.message;
        })
    }

    $scope.deleteregion = function(id) {
        $http({
            url: baseUrl + "regions/" + id,
            metod: "DELETE",
            contentType: 'application/json'

        }).then((data) => {
            $scope.info = data.data.message;
            setTimeout(window.location.reload(), 1000);
        }, (error) => {
            $scope.uerror = error
        })
    }
})

app.controller('regionlist', function($scope, $http) {
    $http.get(baseUrl + "regions")
        .then((data) => {
            $scope.regions = data.data;
        }, (err) => {
            $scope.error = err;
        });
})

app.controller('viewregionController', function($scope, $http, $routeParams) {
    this.region = { region_code: '', region_name: '' }
    var id = $routeParams.region;
    $http.get(baseUrl + "regions/" + id)
        .then((data) => {
            $scope.region = data.data;
            $scope.edit = 1;
        }, (err) => {
            $scope.error = err;
        })
})
app.controller('editregionController', function($scope, $http, $routeParams) {
    var id = $routeParams.region;
    this.region = { region_code: '', region_name: '' }
    $http.get(baseUrl + "regions/" + id)
        .then((data) => {
            $scope.region = data.data;
            $scope.edit = 1;
        }, (err) => {
            $scope.error = err;
        })

    $scope.update = function() {
        $http({
            url: baseUrl + "regions/" + id,
            method: "PUT",
            data: this.region,
            contentType: 'application/json'

        }).then((data) => {
            $scope.info = data.data.message
            console.log(data);
        }, error => {
            $scope.ederror = error
            console.log(error)
        })
    }
});