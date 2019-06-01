var baseUrl = "http://127.0.0.1:8000/api/";



app.controller('MessageController', function($scope, $http, $filter){
    this.Message = {receiver:'', subject:'', message:'', filename:''}
    $scope.save = function(){
        $http({
            url: baseUrl+'messages',
            method: "POST",
            data: this.Message,
            contentType: 'application/json'
        }).then((response) =>{
            $scope.info = response.data.message;
        }, function(error){
            $scope.error = error.data.message;
        })
    }
    
    $scope.filechange= function(e){
        this.Message.filename=e.target.files[0].name;
    }
})

app.controller('messagelist', function($scope, $http){
    $http.get(baseUrl + "messages")
    .then((data) => {
        $scope.messages = data.data;
    }, (err) => {
    $scope.error = err;
    })
})
app.controller('readMessageController', function($scope, $http, $routeParams){
    var id = $routeParams.message;
    $http.get(baseUrl+"messages/"+ id)
        .then((data) => {
        console.log(data)
            $scope.message = data.data;
        }, (err) => {
        console.log(err)
            $scope.verror =err;
        })
    
})

app.controller('replyMessageController', function($scope, $http, $routeParams){
    var id = $routeParams.message;
    $http.get(baseUrl+"messages/"+ id)
        .then((data) => {
        data.data.subject= "Re: "+ data.data.subject
        data.data.message= "Type your reply below the senders message \n"+ "Senders message: "+ data.data.message +"\n\n Type reply here"
            $scope.message = data.data;
        }, (err) => {
            $scope.verror =err;
})
})

app.controller('forwardMessageController', function($scope, $http, $routeParams){
    var id = $routeParams.message;
    $http.get(baseUrl+"messages/"+ id)
        .then((data) => {
        data.data.subject = "Fwd: "+ data.data.subject
        data.data.message = "Forwarded Message\n"+ data.data.message
            $scope.message = data.data;
        }, (err) => {
            $scope.verror =err;
})
})

