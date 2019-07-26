//var baseUrl = "http://127.0.0.1:8000/api/";

app.controller('fuelController', function($scope, $http, $routeParams) {
    var id = $routeParams.fuel;
    this.fuel = { model: '', plate: '', milage: '', litre: '', vehicle_model: '' };
    this.fuell = { admin: '', store: '', audit: '', dispenser: '', litre_dispensed: '' }
    $scope.save = function() {
        $http({
            url: baseUrl + 'fuels',
            method: "POST",
            data: this.fuel,
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            $scope.error = error.data.message;
        })
    }

    $http.get(baseUrl + "fuels/" + id)
        .then((data) => {
            $scope.fuels = data.data;
        }, (err) => {
            $scope.verror = err;
        })
    $scope.saves = function() {
        $http({
            url: baseUrl + 'fuels/' + id,
            method: "PUT",
            data: this.fuell,
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            $scope.error = error.data.message;
        })
    }
})
app.controller('fuelViewController', function($scope, $http) {
    $http.get(baseUrl + "fuels")
        .then((data) => {
            $scope.fuells = data.data;
        }, (error) => {
            $scope.error = error;
        })
})