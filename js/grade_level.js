//var baseUrl = "http://192.168.43.196:8000/api/";
user = local_store({}, "dclm-user", "get");
app.controller('gradeLevelController', function($scope, $http, $filter) {
    this.grade_level = { grade_level_name: '', grade_level_code: '' }

    
            $scope.save = function() {
                $http({
                    url: baseUrl + 'grade_levels',
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
        

    $scope.deletegrdel = function(id) {
        $http({
            url: baseUrl + "grade_levels/" + id,
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



app.controller('grade_level_list', function($scope, $http) {
    $http({
        url: baseUrl + "grade_levels",
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.grade_level = data.data;
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
    });

})

app.controller('viewGrade_LevelController', function($scope, $http, $routeParams) {
    var id = $routeParams.grade_level;
    $http({
        url: baseUrl + "grade_levels/" + id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.grade_level = data.data;
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
    });

})

app.controller('editGrade_LevelController', function($scope, $http, $routeParams) {
    var id = $routeParams.grade_level;
    this.grade_level = { grade_level_name: '', grade_level_code: '' }
$http({
    url: baseUrl + "grade_levelss/" + id,
    method: "GET",
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    contentType: 'application/json'
}).then((data) => {
    $scope.grade_level = data.data;
    $scope.edit = 1
}, (err) => {
    let msg = "<b>" + err.statusText + "</b>" + ": <i>" + err.data.info + "</i>";
    makeToast(msg, { "type": "is-warning", "duration": 2000 });
    window.location.href = "dashboard.html#/grade_level";
})
});

    $scope.update = function() {
        $http({
            url: baseUrl + "countries/" + id,
            method: "PUT",
            data: this.grade_level,
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