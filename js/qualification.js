var app = angular.module('dclm-app', []);

var baseUrl = "http://localhost:8000/api/";
app.controller('signIn', function($scope, $http, $filter){
    this.user = {qualification_code:'', qualification_name:'', }
    $scope.save = function(){
        $http({
            url: baseUrl+'qualifications',
            method: "POST",
            data: this.qualifications,
            contenttype: 'application/json'
        }).then((Response)=> {
            $scope.info = response.data.message
        }, function(error) {
            $scope.error = error.data.message
        })
    }
})