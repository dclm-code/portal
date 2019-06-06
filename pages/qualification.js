var baseUrl = "http://10.10.11.185:8000/api/";

app.controller('qualificationController', function($scope, $http, $filter){
    this.qualification = {qualification_code:'', qualification_name:'' }

    $scope.save = function(){
        $http({
            url: baseUrl+'qualifications',
            method: "POST",
            data: this.qualifications,
            contentType: 'application/json'
        }).then((response)=> {
            console.log(response);
            $scope.info = response.data.message;
        }, function(error) {
            console.log(error);
            $scope.error = error.data.message;
        })
        
   }

   $scope.deletequalification = function(id){
       $http({
           url: baseUrl + "qualifications/"+id,
           method: "DELETE",
           contentType: 'application/json'
       }).then((data) => {
           $scope.info = data.data.message;
           setTimeout(window.location.reload(), 1000);
        },   (error) => {
               $scope.uerror = error
           })
   }
})

app.controller('qualificationlist', function($scope, $http){
        $http.get(baseUrl + "qualifications")
        .then((data) => {
            $scope.qualification = data.data; 
        }, (err) => {
            $scope.error = err;
        });
    })


    app.controller('viewQualificationController', function($scope, $http, $routeParams){
        var id = $routeParams.qualification;
        $http.get(baseUrl + "qualifications/" + id)
        .then((data) => {
            $scope.qualification = data.data; 
        }, (err) => {
            $scope.verror = err;
        });
    })

    app.controller('editQualificationController', function($scope, $http, $routeParams){
        this.qualification = {qualification_code:'', qualification_name:'' }
        var id = $routeParams.qualification;
        $http.get(baseUrl + "qualifications/" + id)
        .then((data) => {
            $scope.qualification = data.data;
            $scope.edit = 1;
        }, (err) => {
            $scope.ederror = err;
        });

        $scope.update = function(){
            $http({
                url: baseUrl+"qualifications/"+id,
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
