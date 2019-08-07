

user = local_store({}, "dclm-user", "get");
app.controller('regionController', function($scope, $http, $filter) {
    this.region = { region_code: '', region_name: '' }

    $scope.save = function() {
        $http({
            url: baseUrl + "regions",
            method: "POST",
            data: this.region,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((response) => {
            let msg = "<b>"+response.data.status+"</b>"+response.data.info;
            makeToast(msg, { type: "is-success", duration: 2000 });
        }, function(error) {
            let msg = "<b>"+error.statusText+"</b>:"+error.data.info;
            makeToast(msg, { type: "is-danger", duration: 2000 });
        })

    }

    $scope.deleteregion = function(id) {
        $http({
            url: baseUrl + "regions/" + id,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((data) => {
            console.log(data);
            let msg = "<b>" + data.data.status + "</b>: <i>" + data.data.info + "</i>";
            makeToast(msg, { "type": "is-success", "duration": 2000 });
            setTimeout(window.location.reload(), 5000);
        }, (error) => {
            let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-danger", "duration": 2000 });
        })
    }
})

app.controller('regionlist', function($scope, $http) {
$http({
    url: baseUrl + "regions",
    method: "GET",
    //send authorization token with request.
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    contentType: 'application/json'
}).then((data) => {
    $scope.regions = data.data;
}, (error) => {
    let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
    makeToast(msg, { "type": "is-danger", "duration": 2000 });
});

})

app.controller('viewregionController', function($scope, $http, $routeParams) {
    //this.region = { region_code: '', region_name: '' }
    var id = $routeParams.region;
    $http({
        url: baseUrl + "regions/" + id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.region = data.data;
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
        makeToast(msg, { "type": "is-danger", "duration": 2000 });
    });
    
    })
    
app.controller('editregionController', function($scope, $http, $routeParams) {
    var id = $routeParams.region;
    this.region = { region_code: '', region_name: '' }
        $http({
            url: baseUrl + "regions/" + id,
            method: "GET",
            //send authorization token with request.
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((data) => { 
                $scope.region = data.data;
                $scope.edit = 1;
            }, (err) => {
                let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
                makeToast(msg, { "type": "is-danger", "duration": 2000 });
                window.location.href = "dashboard.html#/region";
            });

    $scope.update = function() {
        $http({
            url: baseUrl + "regions/" + id,
            method: "PUT",
            data: this.region,
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            contentType: 'application/json'

        }).then((data) => {
            let msg = "<b>" + data.data.status + "</b>: <i>" + data.data.info + "</i>";
            makeToast(msg, { "type": "is-success", "duration": 2000 });
        }, error => {
            let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-danger", "duration": 2000 });
        })
    }
});