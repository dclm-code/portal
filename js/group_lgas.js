var app = angular.module('dclm-app', []);
var baseUrl = "http://localhost:8000/api/";
app.controller('group_lgas', function($scope, $http, $filter){
    this.group_lgas = {lga_name:'', lga_code:'' , state_id:'' }
    $scope.group = function(){
        $http({
            url: baseUrl+'group_lgas',
            method: "POST",
            data: this.group_lgas,
            contenttype: 'application/json'
        }).then((response) => {
             $scope.info = response.data.message;
        }, function(error) {
            $scope.error = error.data.message
        })
        }
        })