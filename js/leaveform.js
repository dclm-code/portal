//var baseUrl = "http://127.0.0.1:8000/api/";
user = local_store({}, "dclm-user", "get");
app.controller('leaveController', function($scope, $http, $filter, $routeParams) {
    var id = $routeParams.leaveform;
    this.leaveform = { staff_id: '', reliever: '', days_requested: '', period_leave_day: '', period_leave_month: '', period_leave_day_resume: '', period_leave_month_resume: '', number_of_week: '', balance_of_leave: '', public_holiday: '', entitled: '', period_leave_year: '' }
    $scope.save = function() {
        $http({
            url: baseUrl + 'leaveforms',
            method: "POST",
            data: this.leaveform,
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            let msg = error.data.message;
            makeToast(msg, { "type": "is-danger", "duration": 2000 });
        })
    }
$http({
    url: baseUrl + "leaveforms/" + id,
    method: "GET",
    //send authorization token with request.
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    contentType: 'application/json'
}).then((data) => {
    $scope.leaveforms = data.data;
}, (err) => {
    let msg = err.data.message;
    makeToast(msg, { "type": "is-danger", "duration": 2000 });
});

})

app.controller('hodView', function($scope, $http, ) {
    $http({
        url: baseUrl + "leaveforms/",
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.leaveforms = data.data;
    }, (err) => {
        let msg = err.data.message;
        makeToast(msg, { "type": "is-danger", "duration": 2000 });
    });
    
    })

app.controller('adminView', function($scope, $http) {
    $http({
        url: baseUrl + "leaveforms/",
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.leaveforms = data.data;
    }, (err) => {
        let msg = err.data.message;
        makeToast(msg, { "type": "is-danger", "duration": 2000 });
    });
    
    })
app.controller('csView', function($scope, $http) {
    $http({
        url: baseUrl + "leaveforms/",
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.leaveforms = data.data;
    }, (err) => {
        let msg = err.data.message;
        makeToast(msg, { "type": "is-danger", "duration": 2000 });
    });
    
    })
app.controller('statusController', function($scope, $http, $routeParams) {
    var id = $routeParams.leaveform;
    $scope.today = new Date();
   $http({
    url: baseUrl + "leaveforms/" + id,
    method: "GET",
    //send authorization token with request.
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    contentType: 'application/json'
}).then((data) => {
    $scope.leaveform = data.data;
}, (err) => {
    let msg = err.data.message;
    makeToast(msg, { "type": "is-danger", "duration": 2000 });
});

})

app.controller('hodController', function($scope, $http, $routeParams) {
    this.leaveforms = { hod_remark: '', hod_approved: '' }
    var id = $routeParams.leaveform;
    $http({
        url: baseUrl + "leaveforms/" + id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.leaveform = data.data;
    }, (err) => {
        let msg = err.data.message;
        makeToast(msg, { "type": "is-danger", "duration": 2000 });
    });
    
    
    $scope.save = function() {
        $http({
            url: baseUrl + 'leaveforms/' + id,
            method: "PUT",
            data: this.leaveforms,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            let error = error.data.message;
            makeToast(error,{"type": "is-danger", "duration": 2000});
        })
        $scope.reset();
    }
})

app.controller('csController', function($scope, $http, $routeParams) {
    this.leaveforms = { cs_remark: '', cs_approved: '' }
    var id = $routeParams.leaveform;
    $http({
        url: baseUrl + "leaveforms/" + id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.leaveform = data.data;
    }, (err) => {
        let msg = err.data.message;
            makeToast(msg, { "type": "is-danger", "duration": 2000 });
    });
    
    
    $scope.save = function() {
        $http({
            url: baseUrl + 'leaveforms/' + id,
            method: "PUT",
            data: this.leaveforms,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            let error = error.data.message;
            makeToast(error, { "type": "is-danger", "duration": 2000 });
        })
        return ""
    }
})

app.controller('adminController', function($scope, $http, $routeParams) {
    this.leaveforms = { period_leave_approved: '', date_resume: '', basics: '', allowance: '', admin_approved: '', admin_remark: '' }
    var id = $routeParams.leaveform;
    $http({
        url: baseUrl + "leaveforms/" + id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.leaveform = data.data;
    }, (error) => {
        let error = error.data.message;
        makeToast(error, { "type": "is-danger", "duration": 2000 });
    });
    
    
    $scope.save = function() {
        $http({
            url: baseUrl + 'leaveforms/' + id,
            method: "PUT",
            data: this.leaveforms,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            let error = error.data.message;
            makeToast(error, { "type": "is-danger", "duration": 2000 });
        })
        return ""
    }
})