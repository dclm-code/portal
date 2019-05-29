var app = angular.module('dclm-app', []);

var baseUrl = "http://localhost:8000/api";
app.controller('country', function($scope, $http, $filter){
    this.country = {country_code:'', country_name:''}
    $scope.save = function() {
       $http({
           url: baseUrl+'countries',
           method "POST",
           data: this.country; 
           contenttype: 'application/json'
           .then(response) =>{
               $scope.info = response.data.message;
               function(error){
               $scope.error = error.data.message
       })
