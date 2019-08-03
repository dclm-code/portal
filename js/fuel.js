//var baseUrl = "http://127.0.0.1:8000/api/";
user = local_store({}, "dclm-user", "get");
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
            let msg = error.data.message;
            /**
             * makeToast display user level messages and alerts
             * @msg is the message to be display
             * @type is a bulma css class is-danger=red, is-info=blue
             * is-success=green is-warning=orange @duration is the time
             * for the message to be display before it disappear
             * automatically.
             */
            makeToast(msg, { "type": "is-danger", "duration": 2000 });
        })
    }

    $http({
        url: baseUrl + "fuels",
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.fuels = data.data;
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
    });

    $scope.saves = function() {
        $http({
            url: baseUrl + 'fuels',
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            data: this.fuell,
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            let msg = error.data.message;
            /**
             * makeToast display user level messages and alerts
             * @msg is the message to be display
             * @type is a bulma css class is-danger=red, is-info=blue
             * is-success=green is-warning=orange @duration is the time
             * for the message to be display before it disappear
             * automatically.
             */
            makeToast(msg, { "type": "is-danger", "duration": 2000 });
        })
    }

app.controller('fuelViewController', function($scope, $http) {
    $http({
        url: baseUrl + "fuels",
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.fuells = data.data;
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
    });
})
})