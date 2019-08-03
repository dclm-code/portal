//var baseUrl = "http://10.10.11.185:8000/api/";
user = local_store({}, "dclm-user", "get");
app.controller('departmentController', function($scope, $http, $filter) {
    this.department = { department_name: '', department_code: '' }

    $scope.save = function() {
        $http({
            url: baseUrl + 'departments',
            method: "POST",
            data: this.department,
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

    $scope.deletedepartment = function(id) {
        $http({
            url: baseUrl + "departments/" + id,
            method: "DELETE",
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

app.controller('departmentlist', function($scope, $http) {
    $http({
        url: baseUrl + "departments",
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.token}`
        },   contentType: 'application/json'
    }).then((data) => {
        $scope.departments = data.data;
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
        makeToast(msg, { "type": "is-warning", "duration": 2000 });
    })
})

app.controller('viewDepartmentController', function($scope, $http, $routeParams) {
    var id = $routeParams.department;
    $http({
        url: baseUrl + "departments/" + id,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.token}`
        },   contentType: 'application/json'
    }).then((data) => {
        $scope.info = data.data.message;
        setTimeout(window.location.reload(), 1000);
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
        makeToast(msg, { "type": "is-warning", "duration": 2000 });
    })
})


app.controller('editDepartmentController', function($scope, $http, $routeParams) {
    this.department = { department_name: '', department_code: '' }
    var id = $routeParams.department;
    $http({
        url: baseUrl + "departments/" + id,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.token}`
        },   contentType: 'application/json'
    }).then((data) => {
        $scope.info = data.data.message;
        setTimeout(window.location.reload(), 1000);
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
        makeToast(msg, { "type": "is-warning", "duration": 2000 });
        window.location.href = "dashboard.html#/department";
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