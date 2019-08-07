//var baseUrl = "http://10.10.11.185:8000/api/";
user = local_store({}, "dclm-user", "get");
app.controller('stateController', function($scope, $http, $filter) {

    this.state = { country_id: '', state_name: '', state_code: '', }

    $scope.save = function() {
        $http({
            url: baseUrl + 'states',
            method: "POST",
            data: this.state,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((response) => {
            const msg = "<b>"+response.data.status+"</b>:"+response.data.info;
            makeToast(msg, { "type": "is-success", "duration": 2000 });
        }, function(error) {
            const msg = error.data.message;
            makeToast(msg, { "type": "is-danger", "duration": 2000 });
        })

    };
    
    $scope.deletestate = function(id) {
        $http({
            url: baseUrl + "states/" + id,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((data) => {
            //$scope.info = data.data.message;
            let msg = "<b>" + data.data.status + "</b>: <i>" + data.data.info + "</i>";
            makeToast(msg, { "type": "is-success", "duration": 2000 });
            setTimeout(window.location.reload(), 5000);
        }, (error) => {
            let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
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
    $http({
        url: baseUrl + "states/"+id,
        method: "GET",
        headers:{
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
            $scope.state = data.data;
        }, (error) => {
            let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
        })

})
app.controller("editStateController", function($scope, $http, $routeParams) {
        var id = $routeParams.state;
        this.state = { country_id: '', state_name: '', state_code: '' }
        //$http.get(baseUrl + "states/" + id)
        $http({
            url: baseUrl + "states/" + id,
            method: "GET",
            headers:{
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((data) => {
            $scope.state = data.data;
            $scope.edit = 1
        }, (err) => {
            let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
            window.location.href = "dashboard.html#/state";
        })

        $scope.update = function() {
            $http({
                url: baseUrl + "states/" + id,
                method: "PUT",
                data: this.state,
                headers:{
                    Authorization: `Bearer ${user.token}`
                },
                contentType: 'application/json'
            }).then((data) => {
                //$scope.info = data.data.message
                let msg = "<b>" + data.data.status + "</b>: <i>" + data.data.info + "</i>";
                makeToast(msg, { "type": "is-success", "duration": 2000 });
            }, (error) => {
                let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
                makeToast(msg, { "type": "is-warning", "duration": 2000 });
            })

        }
    });