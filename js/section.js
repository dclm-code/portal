//var baseUrl = "http://127.0.0.1:8000/api/";
user = local_store({}, "dclm-user", "get");
app.controller('sectionController', function($scope, $http, $filter) {
    this.section = { section_name: '', section_code: '' }

    $scope.save = function() {
        $http({
            url: baseUrl + 'sections',
            method: "POST",
            data: this.section,
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

    $scope.deletesection = function(id) {
        $http({
            url: baseUrl + "sections/" + id,
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

app.controller('Sectionlist', function($scope, $http) {
$http({
    url: baseUrl + "sections",
    method: "GET",
    //send authorization token with request.
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    contentType: 'application/json'
}).then((data) => {
    $scope.sections = data.data;
}, (error) => {
let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
makeToast(msg, { "type": "is-warning", "duration": 2000 });
});

})

app.controller('viewsectionController', function($scope, $http, $routeParams) {
    var id = $routeParams.section;
    $http({
        url: baseUrl + "sections/" + id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.section = data.data;
        }, (error) => { let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
        makeToast(msg, { "type": "is-warning", "duration": 2000 });
        })

})
app.controller('editsectionController', function($scope, $http, $routeParams) {
    this.section = { section_name: '', section_code: '' }
    var id = $routeParams.section;
    $http({
        url: baseUrl + "sections/" + id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.section = data.data;
        }, (err) => { let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
        makeToast(msg, { "type": "is-warning", "duration": 2000 });
        window.location.href = "dashboard.html#/section";
        })

    $scope.update = function() {

        $http({
            url: baseUrl + "sections/" + id,
            method: "PUT",
            data: this.section,
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