var baseUrl = "http://10.10.11.185:8000/api/";

app.controller('userController', function($scope, $http, $filter) {
    this.user = {
        staff_id: '',
        first_name: '',
        middle_name: '',
        surname: '',
        email: '',
        password: '',
        gender: '',
        phone_number: '',
        date_of_birth: '',
        section_id: '',
        department_id: '',
        location_of_work_id: '',
        location_of_origin_id: '',
        qualification_id: '',
        date_of_employment: '',
        grade_level_id: '',
        next_of_kin_id: '',
        marital_status: '',
        home_address: '',
        role: ''
    }

    $scope.save = function() {
        $http({
            url: baseUrl + 'users',
            method: "POST",
            data: this.user,
            contenttype: 'application/json'
        }).then((response) => {
            const myMessage = response.data.message;
            bulma.toast({
                content: myMessage,
                type: "is-success",
                position: "top-right",
                timeout: '2000'
            });
        }, function(error) {
            const myMessage = error.message;
            bulma.toast({
                content: myMessage,
                type: "is-danger",
                timeout: '2000'
            });
        })
    }
})

app.controller('user-departments', function($scope, $http) {
    $http.get(baseUrl + "departments")
        .then((data) => {
            $scope.user_departments = data.data;
        }, (err) => {
            $scope.user_department_error = err;
        })
})

app.controller('userlist', function($scope, $http) {
    $http.get(baseUrl + "users")
        .then((data) => {
            $scope.users = data.data;
        }, (err) => {
            $scope.error = err;
        });
})

app.controller('viewUserController', function($scope, $http, $routeParams) {
    var id = $routeParams.user;
    $http.get(baseUrl + "users/" + id)
        .then((data) => {
            $scope.user = data.data;
        }, (err) => {
            $scope.verror = err;
        })
})

app.controller('editUserController', function($scope, $http, $routeParams) {
    var id = $routeParams.user;
    $http.get(baseUrl + "users/" + id)
        .then((data) => {
            $scope.user = data.data;
            $scope.edit = 1;
        }, (err) => {
            $scope.ederror = err
        })

    $scope.update = function($scope, $http) {
        this.user = {
            staff_id: '',
            first_name: '',
            middle_name: '',
            surname: '',
            email: '',
            password: '',
            gender: '',
            phone_number: '',
            date_of_birth: '',
            section_id: '',
            department_id: '',
            location_of_work_id: '',
            location_of_origin_id: '',
            qualification_id: '',
            date_of_employment: '',
            grade_level_id: '',
            next_of_kin_id: '',
            marital_status: '',
            home_address: '',
            role: ''
        }

        $http({
            url: baseUrl + "users/" + id,
            method: "PUT",
            data: this.user,
            contentType: 'application/json'
        }).then((data) => {
            $scope.info = data.data.message
        }, (error) => {
            $scope.ederror = error
        })
    }
})

app.controller('remarkUserController', function($scope, $http, $routeParams) {
    var id = $routeParams.user;
    this.remark = { comments: '' }
    $scope.makeremark = function() {
        $http({
            url: baseUrl + "users/" + id,
            method: "PUT",
            data: this.remark,
            contentType: 'application/json'
        }).then((data) => {
            console.log(data);
            $scope.info = data.data.message
        }, (error) => {
            console.log(error);
            $scope.rerror = error
        })
    }
})