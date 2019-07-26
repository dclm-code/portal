//var baseUrl = "http://10.10.11.185:8000/api/";
app.controller('stateController', function($scope, $http, $filter) {

    this.state = { country_id: '', state_name: '', state_code: '', }

    $scope.save = function() {

        $http({
            url: baseUrl + 'states',
            method: "POST",
            data: this.state,
            contenttype: 'application/json'
        }).then((response) => {
            console.log(response);
            $scope.info = response.data.message;
        }, function(error) {
            $scope.error = error;
        })
    }
    $scope.deletestate = function(id) {
        $http({
            url: baseUrl + "states/" + id,
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

app.controller("statelist", function($scope, $http) {
    $http.get(baseUrl + "states")
        .then((data) => {
            $scope.states = data.data;
        }, (err) => {
            $scope.error = err;
        })
})
app.controller("viewStateController", function($scope, $http, $routeParams) {
    var id = $routeParams.state;
    $http.get(baseUrl + "states/" + id)
        .then((data) => {
            $scope.state = data.data;
        }, (err) => {
            $scope.verror = err;
        })

})
app.controller("editStateController", function($scope, $http, $routeParams) {
        var id = $routeParams.state;
        this.state = { country_id: '', state_name: '', state_code: '' }
        $http.get(baseUrl + "states/" + id)
            .then((data) => {
                $scope.state = data.data;
                $scope.edit = 1
            }, (err) => {
                $scope.ederror = err;
            })

        $scope.update = function() {
            $http({
                url: baseUrl + "states/" + id,
                method: "PUT",
                data: this.state,
                contentType: 'application/json'
            }).then((data) => {
                $scope.info = data.data.message
                console.log(data);
            }, (error) => {
                $scope.ederror = error
                console.log(error);
            })

        }
    })
    /*app.service('stateList', function($http) {
        this.states = function(){
            $http({
                url: baseUrl+ "states",
                method:"GET",
                contentType: "application/json"
            }).then((states)=> {
                return states.data;
            }, function(error) {
                return error;
            })
        }
    }
    )*/