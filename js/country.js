//get the user object from local storage
//this object is created at login. Every user successfully
//login can be validated.
user = local_store({}, "dclm-user", "get");
app.controller('countryController', function($scope, $http, $filter) {

    $scope.save = function() {
        $http({
            url: baseUrl + 'countries',
            method: "POST",
            data: this.country,
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


    $scope.deletecountry = function(id) {
        $http({
            url: baseUrl + "countries/" + id,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((data) => {
            $scope.info = data.data.message;
            setTimeout(window.location.reload(), 1000);
        }, (error) => {
            let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
        })
    }

})

app.controller('country', function($scope, $http) {
    $http({
        url: baseUrl + "countries",
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.countries = data.data;
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
    });

})
app.controller('viewCountryController', function($scope, $http, $routeParams) {
    var id = $routeParams.country;
    $http({
        url: baseUrl + "countries/" + id,
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.country = data.data;
    }, (err) => {
        let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
        makeToast(msg, { "type": "is-warning", "duration": 2000 });
        window.location.href = "dashboard.html#/country";
    });
})

app.controller('editCountryController', function($scope, $http, $routeParams) {
    this.country = { country_code: '', country_name: '' }
    var id = $routeParams.country;
    $http({
        url: baseUrl + "countries/" + id,
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.country = data.data;
        $scope.edit = 1
    }, (err) => {
        let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
        makeToast(msg, { "type": "is-warning", "duration": 2000 });
        window.location.href = "dashboard.html#/country";
    });

    $scope.update = function() {
        $http({
            url: baseUrl + "countries/" + id,
            method: "PUT",
            data: this.country,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: "application/json"
        }).then((data) => {
            $scope.info = data.data.message
        }, (error) => {
            let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
        })
    }
})