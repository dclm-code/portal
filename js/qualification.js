//var baseUrl = "http://10.10.11.185:8000/api/";
user = local_store({}, "dclm-user", "get");
app.controller('qualificationController', function($scope, $http, $filter) {
    this.qualification = { qualification_code: '', qualification_name: '' }

    $scope.save = function() {
        $http({
            url: baseUrl + 'qualifications',
            method: "POST",
            data: this.qualifications,
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

    $scope.deletequalification = function(id) {
        $http({
            url: baseUrl + "qualifications/" + id,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((data) => {
            const msg = data.data.message;
            makeToast(msg, { type: "is-warning", duration: 2000 });
            setTimeout(window.location.reload(), 1000);
        }, (error) => {
            const msg = error.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 });
        })
    }
})


app.controller('qualificationlist', function($scope, $http) {
$http({
    url: baseUrl + "qualifications",
    method: "GET",
    //send authorization token with request.
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    contentType: 'application/json'
}).then((data) => {
    $scope.qualifications = data.data;
}, (err) => { let msg = "There is an error retrieving qualifications.";
makeToast(msg, { "type": "is-danger", "duration": 2000 });
});

})

app.controller('viewQualificationController', function($scope, $http, $routeParams) {
    var id = $routeParams.qualification;
    $http({
        url: baseUrl + "qualifications/" + id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.qualification = data.data;
    }, (err) => { let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
    makeToast(msg, { "type": "is-warning", "duration": 2000 });
    window.location.href = "dashboard.html#/qualification";
    });
    
    })
app.controller('editQualificationController', function($scope, $http, $routeParams) {
    this.qualification = { qualification_code: '', qualification_name: '' }
    var id = $routeParams.qualification;
    $http({
        url: baseUrl + "qualifications/" + id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => { 
            $scope.qualification = data.data;
            $scope.edit = 1;
        }, (err) => {
            let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
        makeToast(msg, { "type": "is-warning", "duration": 2000 });
        window.location.href = "dashboard.html#/qualification";
        });
        
    $scope.update = function() {
        $http({
            url: baseUrl + "qualifications/" + id,
            method: "PUT",
            data: this.qualification,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((data) => {
            $scope.info = data.data.message
        }, (error) => {
            let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
        })
    }
})