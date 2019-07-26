//var app = angular.module("dclm-app", []);
user = local_store({}, "dclm-user", "get");
app.controller('userController', function($scope, $http, $filter) {
    $scope.save = function() {
        user = $("#frmUser").serializeToJSON();
        $http({
            url: baseUrl + 'register',
            method: "POST",
            data: user,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((response) => {
            const myMessage = response.data.info;
            makeToast(myMessage, { type: "is-success", duration: 2000 });
        }, function(error) {
            const myMessage = error.statusText + ": " + error.data.message;
            makeToast(myMessage, { type: "is-danger", duration: 2000 });
        })
    }

    $scope.logout = function() {
        $http({
            url: baseUrl + 'logout',
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((res) => {
            const imsg = res.data.info;
            makeToast(imsg, { type: "is-success", duration: 2000 });
        }, (rerr) => {
            const imsg = rerr.statusText + ": " + rerr.data.message;
            makeToast(imsg, { type: "is-danger", duration: 2000 });
        })
    }
})

app.controller('user-sections', function($scope, $http) {
    $http.get(baseUrl + "sections")
        .then((sects) => {
            $scope.sections = sects.data;
        }, (err) => {
            const msg = err.statusText + ": " + err.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 });
        })
})

app.controller('user-departments', function($scope, $http) {
    $http.get(baseUrl + "departments")
        .then((data) => {
            $scope.user_departments = data.data;
        }, (err) => {
            msg = err.statusText + ": " + err.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 });
        })
})

app.controller('lga', function($scope, $http) {
    $http.get(baseUrl + "group_lgas")
        .then((lga) => {
            $scope.lgas = lga.data;
        }, (err) => {
            const msg = err.statusText + ": " + err.data.message;
        })
})

app.controller('qualification', function($scope, $http) {
    $http.get(baseUrl + "qualifications")
        .then((qualif) => {
            $scope.qualifications = qualif.data;
        }, (err) => {
            const msg = err.statusText + ": " + err.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 });
        })
})

app.controller('gradelevel', function($scope, $http) {
    $http.get(baseUrl + "grade_levels")
        .then((grades) => {
            $scope.gradelevels = grades.data;
        }, (err) => {
            const msg = err.statusText + ": " + err.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 })
        })
})

app.controller('userlist', function($scope, $http) {
    $http({
        url: baseUrl + "users",
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.users = data.data;
    }, (err) => {
        const msg = err.statusText + ": " + err.data.message;
        makeToast(msg, { type: "is-danger", duration: 2000 });
    });
})

app.controller('viewUserController', function($scope, $http, $routeParams) {
    var id = $routeParams.user;
    $http({
        url: baseUrl + "users/" + id,
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.user = data.data;
    }, (err) => {
        const msg = err.statusText + ": " + err.data.message;
        makeToast(msg, { type: "is-danger", duration: 2000 });
    })
})

app.controller('editUserController', function($scope, $http, $routeParams) {
    var id = $routeParams.user;
    $http({
        url: baseUrl + "users/" + id,
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.user = data.data;
        $scope.edit = 1;
    }, (err) => {
        const msg = err.statusText + ": " + err.data.message;
        makeToast(msg, { type: "is-danger", duration: 2000 });
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
            const msg = error.statusText + ": " + error.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 });
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
            $scope.info = data.data.message
        }, (error) => {
            const msg = error.statusText + ": " + error.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 });
        })
    }
})