var app = angular.module('dclm-app', []);

var baseUrl = "http://localhost:8000/api/";

app.controller('Grade_Level', function($scope, $http, $filter) {
    this.user = {grade_level:'', grade_code:''}
    $scope.save = function() {
        $http({
            url: baseUrl+'grade_level',
            method: "POST",
            data: this.grade_level,
            contentType: 'application/json'
        })  .then((response) =>{
            $scope.info = response.data.message;
        }, function(error){ 
            $scope.error = error.data.message
        })

    }
})