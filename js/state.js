var app = angular.module('dclm-app', []);

var baseUrl = "http://localhost:8000/api/";
app.controller('state', function($scope, $http, $filter){
    this.state = {Country_name:'', state_name:'', state_code:'',}
    $scope.save = function(){
        $http({
            url: baseUrl+'state_name',
            method: "POST",
            data: this.state_name,
            contenttype: 'application/json'
        }).then((Response)=> {
            $scope.info = response.data.message
        }, function(error) {
            $scope.error = error.data.message
        })
    }
})