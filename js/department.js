var app = angular.module('dclm-app', []);

var baseUrl = "http://localhost:8000/api/";

app.controller('Department', function($scope, $http, $filter){
    this.department = {dept_name:'', dept_code:''}
    $scope.save = function(){
        $http({
            url: baseUrl+'departments',
            method: "POST",
            data: this.department,
            contentType: 'application/json'
        }) .then((response) =>{
            $scope.info = response.data.message;
        }, function(error){
            $scope.error = error.data.message;
        })
    }
})