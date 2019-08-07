//var baseUrl = "http://127.0.0.1:8000/api/";
user = local_store({}, "dclm-user", "get");
app.controller('messageController', function($scope, $http, $filter) {
    this.Message = { receiver: '', subject: '', message: '', filename: '' }
    $scope.save = function() {
        console.log(this.Message);
        $http({
            url: baseUrl + 'messages',
            method: "POST",
            data: this.Message,
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((response) => {
            info = response.data.message;
            makeToast(info, { type: "is-success", duration: 2 });
        }, function(error) {
            merror = error.data.message;
            makeToast(merror, { type: "is-danger", duration: 2 });
        })
    }

    $scope.filechange = function(e) {
        this.Message.filename = e.target.files[0].name;
    }
})

app.controller('messageList', function($scope, $http) {
$http({
    url: baseUrl + "messages",
    method: "GET",
    //send authorization token with request.
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    contentType: 'application/json'
}).then((data) => {
    $scope.messages = data.data;
}, (error) => {
    let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
});

})

app.controller('readMessageController', function($scope, $http, $routeParams) {
    var id = $routeParams.message;
    $http({
        url: baseUrl + "messages/"+ id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
        $scope.message = data.data;
    }, (error) => {
        let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
    });

})

app.controller('replyMessageController', function($scope, $http, $routeParams) {
    var id = $routeParams.message;
    $http({
        url: baseUrl + "messages/"+ id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
            data.data.subject = "Re: " + data.data.subject
            data.data.message = "Type your reply below the senders message \n" + "Senders message: " + data.data.message + "\n\n Type reply here"
            $scope.message = data.data;
        }, (error) => {
            let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
        })
})

app.controller('forwardMessageController', function($scope, $http, $routeParams) {
    var id = $routeParams.message;
    $http({
        url: baseUrl + "messages/"+ id,
        method: "GET",
        //send authorization token with request.
        headers: {
            Authorization: `Bearer ${user.token}`
        },
        contentType: 'application/json'
    }).then((data) => {
            data.data.subject = "Fwd: " + data.data.subject
            data.data.message = "Forwarded Message\n" + data.data.message
            $scope.message = data.data;
        }, (error) => {
            let msg = "<b>" + error.statusText + "</b>: <i>" + error.data.info + "</i>";
            makeToast(msg, { "type": "is-warning", "duration": 2000 });
        })
})