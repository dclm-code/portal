//var baseUrl = "http://127.0.0.1:8000/api/";

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
            $scope.error = error.data.message;
        })
    }
    $http.get(baseUrl + "leaveforms/" + id)
        .then((data) => {
            $scope.leaveforms = data.data;
        }, (err) => {
            $scope.verror = err;
        })
})

app.controller('hodView', function($scope, $http, ) {
    $http.get(baseUrl + "leaveforms")
        .then((data) => {
            $scope.leaveforms = data.data;
        }, (error) => {
            $scope.error = error;
        })
})

app.controller('adminView', function($scope, $http) {
    $http.get(baseUrl + "leaveforms")
        .then((data) => {
            $scope.leaveforms = data.data;
        }, (error) => {
            $scope.error = error;
        })
})
app.controller('csView', function($scope, $http) {
    $http.get(baseUrl + "leaveforms")
        .then((data) => {
            $scope.leaveforms = data.data;
        }, (error) => {
            $scope.error = error;
        })
})
app.controller('statusController', function($scope, $http, $routeParams) {
    var id = $routeParams.leaveform;
    $scope.today = new Date();
    $http.get(baseUrl + "leaveforms/" + id)
        .then((data) => {
            $scope.leaveform = data.data;
        }, (error) => {
            $scope.error = error;
        })
})

app.controller('hodController', function($scope, $http, $routeParams) {
    this.leaveforms = { hod_remark: '', hod_approved: '' }
    var id = $routeParams.leaveform;
    $http.get(baseUrl + "leaveforms/" + id)
        .then((data) => {
            $scope.leaveform = data.data;
        }, (err) => {
            $scope.verror = err;
        })
    $scope.save = function() {
        $http({
            url: baseUrl + 'leaveforms/' + id,
            method: "PUT",
            data: this.leaveforms,
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            $scope.error = error.data.message;
        })
        $scope.reset();
    }
})

app.controller('csController', function($scope, $http, $routeParams) {
    this.leaveforms = { cs_remark: '', cs_approved: '' }
    var id = $routeParams.leaveform;
    $http.get(baseUrl + "leaveforms/" + id)
        .then((data) => {
            $scope.leaveform = data.data;
        }, (err) => {
            $scope.verror = err;
        })
    $scope.save = function() {
        $http({
            url: baseUrl + 'leaveforms/' + id,
            method: "PUT",
            data: this.leaveforms,
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            $scope.error = error.data.message;
        })
        return ""
    }
})

app.controller('adminController', function($scope, $http, $routeParams) {
    this.leaveforms = { period_leave_approved: '', date_resume: '', basics: '', allowance: '', admin_approved: '', admin_remark: '' }
    var id = $routeParams.leaveform;
    $http.get(baseUrl + "leaveforms/" + id)
        .then((data) => {
            $scope.leaveform = data.data;
        }, (err) => {
            $scope.verror = err;
        })
    $scope.save = function() {
        $http({
            url: baseUrl + 'leaveforms/' + id,
            method: "PUT",
            data: this.leaveforms,
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            $scope.error = error.data.message;
        })
        return ""
    }
})