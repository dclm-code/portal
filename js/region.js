

user = local_store({}, "dclm-user", "get");
app.controller('regionController', function($scope, $http, $filter) {
    this.region = { region_code: '', region_name: '' }

    $scope.save = function() {
        $http({
            url: baseUrl + "regions",
            method: "POST",
            data: this.regions,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((response) => {
            const msg = response.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 });
        }, function(error) {
            const msg = error.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 });
        })

    }

    $scope.deleteregion = function(id) {
        $http({
            url: baseUrl + "regions/" + id,
            metod: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`
            },
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
}, (err) => {
    let msg = "There is an error retrieving sections.";
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
    }, (err) => {
        let msg = "There is an error retrieving region.";
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
                makeToast(msg, { "type": "is-warning", "duration": 2000 });
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
            $scope.info = data.data.message
            console.log(data);
        }, error => {
            $scope.ederror = error
            console.log(error)
        })
    }
});