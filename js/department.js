//var baseUrl = "http://10.10.11.185:8000/api/";

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
            $scope.error = error.data.message
        });
    }

    $scope.deletedepartment = function(id) {
        $http({
            url: baseUrl + "departments/" + id,
            method: "DELETE",
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
    $http.get(baseUrl + 'departments')
        .then((data) => {
            $scope.departments = data.data;
        }, (err) => {
            $scope.error = err;
        });
})

app.controller('viewDepartmentController', function($scope, $http, $routeParams) {
    var id = $routeParams.department;
    $http.get(baseUrl + "departments/" + id)
        .then((data) => {
            console.log('data:', data.data)
            $scope.dept = data.data;
        }, (err) => {
            $scope.verror = err;
            console.log(err)
        })

})
app.controller('editDepartmentController', function($scope, $http, $routeParams) {
    this.department = { department_name: '', department_code: '' }
    var id = $routeParams.department;
    $http.get(baseUrl + "departments/" + id)
        .then((data) => {
            $scope.department = data.data;
            $scope.edit = 1;
        }, (err) => {
            $scope.ederror = err;
        })

    $scope.update = function() {

        $http({
            url: baseUrl + "departments/" + id,
            method: "PUT",
            data: this.department,
            contentType: 'application/json'
        }).then((data) => {
            $scope.info = data.data.message
            console.log(data.data.messsage)
        }, (error) => {
            $scope.ederror = error
            console.log(error)
        })
    }
})