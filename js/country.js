var baseUrl = "http://10.10.11.185:8000/api/";

app.controller('countryController', function($scope, $http, $filter){
   
     $scope.save = function() {
       $http({
           url: baseUrl+'countries',
           method: "POST",
           data: this.country, 
           contentType: 'application/json'
        }) .then((response) => {
            console.log(response)
            $scope.info = response.data.message;
        }, function(error){
            console.log(error)
            $scope.error = error.data.message;
        })
    }

    
    $scope.deletecountry = function(id){
        $http({
            url: baseUrl + "countries/"+id,
            method: "DELETE",
            contentType: 'application/json'
        }).then((data) => {
            $scope.info = data.data.message;
            setTimeout(window.location.reload(), 1000);
        }, (error) => {
            $scope.uerror = error
        })
    }
        
})

app.controller('country', function($scope, $http) {
    $http.get(baseUrl + "countries")
    .then((data) => {
        $scope.countries = data.data;
    }, (err) => {
        $scope.error = err;
    });
   
})
app.controller('viewCountryController', function($scope, $http, $routeParams) {
    var id = $routeParams.country;
    $http.get(baseUrl + "countries/" + id)
    .then((data) => {
        $scope.country = data.data;
    }, (err) => {
        $scope.verror = err;
    });
})

    app.controller('editCountryController', function($scope, $http, $routeParams) {
        this.country = {country_code:'', country_name:''}
        var id = $routeParams.country;
        $http.get(baseUrl + "countries/" + id)
        .then((data) => {
            $scope.country = data.data;
            $scope.edit = 1
        }, (err) => {
            $scope.ederror = err;
    });

    $scope.update = function(){
       $http({
           url: baseUrl+"countries/"+id,
           method: "PUT",
           data: this.country,
           contentType: "application/json"
       }).then((data) => {
           $scope.info = data.data.message
           console.log(data);
       }, (error) => {
           $scope.ederror = error
           console.log(error)
       })
    }

})
