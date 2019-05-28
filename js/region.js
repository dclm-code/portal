var app = angular.module('dclm-app', []);

var baseUrl = "http://localhost:8000/api/";

app.controller('Region', function($scope, $http, $filter){
    this.region = {reg_code:'', reg_name:''}
    $scope.save = function(){
        $http({
            url: baseUrl+'region',
            method: "POST",
            data: this.region,
            contentType: 'application/json'
        }).then((response) =>{
            $scope.info = response.data.message;
        }, function(error){
            $scope.error = error.data.message;
        })
    }
})