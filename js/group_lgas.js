//var baseUrl = "http://10.10.11.185:8000/api/";
app.controller('groupLgaController', function($scope, $http, $filter) {
    this.group_lga = { local_govt_name: '', local_govt_code: '', state_id: '' }

    $scope.group = function() {
        $http({
            url: baseUrl + 'group_lgas',
            method: "POST",
            data: this.group_lga,
            contenttype: 'application/json'
        }).then((response) => {
            $scope.info = response.data;
        }, function(error) {
            $scope.error = error;
        })
    }
    $scope.deletegroup_lga = function(id) {
        $http({
            url: baseUrl + "group_lgas/" + id,
            method: "DELETE",
            contentType: 'application/json'
        }).then((data) => {
            $scope.info = data.data.message;
            setTimeout(window.location.reload(), 1000);
        }, (error) => {
            $scope.uerror = error
        })
    }
})

app.controller('grouplist', function($scope, $http) {
    $http.get(baseUrl + "group_lgas")
        .then((data) => {
            $scope.group_lgas = data.data;
        }, (err) => {
            $scope.error;
        })
})

app.controller('viewGroupLgaController', function($scope, $http, $routeParams) {
    var id = $routeParams.group_lga;
    $http.get(baseUrl + "group_lgas/" + id)
        .then((data) => {
            $scope.group_lga = data.data;
        }, (err) => {
            $scope.gerror = err;
        })
})

app.controller('editGroupLgaController', function($scope, $http, $routeParams) {
    var id = $routeParams.group_lga;
    this.group_lga = { local_govt_name: '', local_govt_code: '', state_id: '' }
    $http.get(baseUrl + "group_lgas/" + id)
        .then((data) => {
            $scope.group_lga = data.data;
            $scope.edit = 1
        }, (err) => {
            $scope.ederror = err;
        })

    $scope.update = function() {
        $http({
            url: baseUrl + "group_lgas/" + id,
            method: "PUT",
            data: this.group_lga,
            contentType: 'application/json'

        }).then((data) => {
            $scope.info = data.data.message
            console.log(data)
        }, (error) => {
            console.log(error)
            $scope.ederror = error
        })
    }
})