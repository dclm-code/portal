var baseUrl = "http://192.168.43.196:8000/api/";

app.controller('gradeLevelController', function($scope, $http, $filter) {
    this.grade_level = {grade_level_name:'', grade_level_code:''}
    
    $scope.save = function(){
        $http({
            url: baseUrl+'grade_levels',
            method: "POST",
            data: this.grade_level,
            contentType: 'application/json'
        })  .then((response) =>{
            console.log(response);
            $scope.info = response.data.message;
        }, function(error) {
            console.log(error); 
            $scope.error = error
        })

    }

    $scope.deletegrdel = function(id) {
        $http({
            url: baseUrl + "grade_levels/" + id,
            method: "DELETE",
            contentType: 'application/json'
        }).then((data) => {
            $scope.info = data.data.messge;
            setTimeout(window.location.reload(), 1000);
        },  (error) =>{
            $scope.uerror = error
        })
    }
})

app.controller('grade_level_list', function($scope, $http){
    $http.get(baseUrl + "grade_levels")
    .then((data) => {
        $scope.grade_levels = data.data;
    },(err) => {
        $scope.error = err
    })
    
})


app.controller('viewGrade_LevelController', function($scope, $http, $routeParams)  {
    var id = $routeParams.grade_level;
    $http.get(baseUrl + "grade_levels/" + id)
    .then((data) => {
        $scope.grade_level = data.data;
       }, (err) => {
        $scope.error = err;
    })
    
})

app.controller('editGrade_LevelController', function($scope, $http, $routeParams){
    var id = $routeParams.grade_level;
    this.grade_level = {grade_level_name:'', grade_level_code:''} 
    $http.get(baseUrl + "grade_levels/" + id)
    .then((data) => {
        $scope.grade_level = data.data;
        $scope.edit = 1;
       },(err) => {
        $scope.ederror = err;
       })

       $scope.update = function(){
       $http({
           url: baseUrl+"grade_levels/"+id,
           method: "PUT",
           data: this.grade_level,
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
