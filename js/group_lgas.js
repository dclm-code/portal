//var baseUrl = "http://10.10.11.185:8000/api/";
user = local_store({}, "dclm-user", "get");
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
    

    $scope.deletegroup_lga = function(id) {
        $http({
            url: baseUrl + "group_lgas/" + id,
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

app.controller('grouplist', function($scope, $http) {
     $http({
        url: baseUrl + "group_lgas",
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.group_lgas = data.data;
    }, (err) => {
        console.log(err);
    });

})


app.controller('viewGroupLgaController', function($scope, $http, $routeParams) {
    var id = $routeParams.group_lga;
$http({
    url: baseUrl + "group_lgas/" + id,
    method: "GET",
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    contentType: 'application/json'
}).then((data) => {
    $scope.group_lga  = data.data;
}, (err) => {
    let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
    makeToast(msg, { "type": "is-warning", "duration": 2000 });
    window.location.href = "dashboard.html#/group_lgas";
});
})


app.controller('editGroupLgaController', function($scope, $http, $routeParams) {
    var id = $routeParams.group_lga;
    this.group_lga = { local_govt_name: '', local_govt_code: '', state_id: '' }
$http({
    url: baseUrl + "group_lgas/" + id,
    method: "GET",
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    contentType: 'application/json'
}).then((data) => {
    $scope.group_lga = data.data;
    $scope.edit = 1
}, (err) => {
    let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
    makeToast(msg, { "type": "is-warning", "duration": 2000 });
    window.location.href = "dashboard.html#/country";
});

$scope.update = function() {
    $http({
        url: baseUrl + "group_lgas/" + id,
        method: "PUT",
        data: this.group_lga,
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: "application/json"
    }).then((data) => {
        $scope.info = data.data.message
        console.log(data);
    }, (error) => {
        $scope.ederror = error
        console.log(error)
    })
}
})