//var baseUrl = "http://10.10.11.185:8000/api/";

app.controller('qualificationController', function($scope, $http, $filter) {
    this.qualification = { qualification_code: '', qualification_name: '' }

    $scope.save = function() {
        $http({
            url: baseUrl + 'qualifications',
            method: "POST",
            data: this.qualifications,
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
    $http.get(baseUrl + "qualifications")
        .then((data) => {
            $scope.qualifications = data.data;
        }, (err) => {
            const msg = err.data.message;
            makeToast(msg, { type: "is-danger", duration: 2000 });
        });
})


app.controller('viewQualificationController', function($scope, $http, $routeParams) {
    var id = $routeParams.qualification;
    $http.get(baseUrl + "qualifications/" + id)
        .then((data) => {
            $scope.qualification = data.data;
        }, (err) => {
            $scope.verror = err;
        });
})

app.controller('editQualificationController', function($scope, $http, $routeParams) {
    this.qualification = { qualification_code: '', qualification_name: '' }
    var id = $routeParams.qualification;
    $http.get(baseUrl + "qualifications/" + id)
        .then((data) => {
            $scope.qualification = data.data;
            $scope.edit = 1;
        }, (err) => {
            $scope.ederror = err;
        });

    $scope.update = function() {
        $http({
            url: baseUrl + "qualifications/" + id,
            method: "PUT",
            data: this.qualification,
            contentType: 'application/json'
        }).then((data) => {
            $scope.info = data.data.message
            console.log(data);
        }, (error) => {
            $scope.ederror = error
            console.log(error)
        })
    }
})