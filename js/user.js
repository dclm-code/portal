var app = angular.module('dclm-app', []);
var baseUrl = "http://localhost:8000/api/";
app.controller('users', function($scope, $http, $filter){
    this.user = {staff_id:'', first_name:'', middle_name:'' , surname:'', email:'', password:'',gender:'', phone_number:'', date_of_birth:'', section:'', department:'',area_of_work:'', lga_of_origin:'', qual:'',date_of_empl:'', grade_level:'', next_of_kin:'', marital_status:'', home_address:'', check:'',  }
    $scope.save = function(){
        $http({
            url: baseUrl+'users',
            method: "POST",
            data: this.user,
            contenttype: 'application/json'
        }).then((response) => {
             $scope.info = response.data.message;
        }, function(error) {
            $scope.error = error.data.message
        })
        }
        })