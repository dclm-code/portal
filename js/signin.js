//var app = angular.module("dclm-app", []);
app.controller('dSignIn', ($scope, $http, $filter) => {
    $scope.signin = () => {
        $("#btnLogin").addClass("is-loading");
        dsignin = $("#frmSignIn").serializeToJSON();
        $http({
            url: baseUrl + "login",
            method: "POST",
            data: dsignin,
            contentType: "application/json"
        }).then((user) => {
            local_store(user.data.data, "dclm-user", "add");
            let msg = user.data.info;
            makeToast(msg, { type: "is-success", duration: 2000 });
            setTimeout("window.location.href = 'pages/dashboard.html'", 2000);
        }, (error) => {
            let msg = error.data.info;
            makeToast(msg, { type: "is-danger", duration: 2000 });
            setTimeout("window.location.href = 'signin.html'", 5000);
        })
    }
})