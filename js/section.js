//var baseUrl = "http://127.0.0.1:8000/api/";
app.controller('sectionController', function($scope, $http, $filter) {
    this.section = { section_name: '', section_code: '' }

    $scope.save = function() {
        $http({
            url: baseUrl + 'sections',
            method: "POST",
            data: this.section,
            contentType: 'application/json'
        }).then((response) => {
            $scope.info = response.data.message;
        }, function(error) {
            $scope.error = error.data.message
        });
    }

    $scope.deletesection = function(id) {
        $http({
            url: baseUrl + "sections/" + id,
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

app.controller('Sectionlist', function($scope, $http) {
    $http.get(baseUrl + 'sections')
        .then((data) => {
            $scope.sections = data.data;
        }, (err) => {
            let msg = "There is an error retrieving sections.";
            makeToast(msg, { "type": "is-danger", "duration": 2000 });
        });
})

app.controller('viewsectionController', function($scope, $http, $routeParams) {
    var id = $routeParams.section;
    $http.get(baseUrl + "sections/" + id)
        .then((data) => {
            console.log('data:', data.data)
            $scope.section = data.data;
        }, (err) => {
            $scope.verror = err;
            console.log(err)
        })

})
app.controller('editsectionController', function($scope, $http, $routeParams) {
    this.section = { section_name: '', section_code: '' }
    var id = $routeParams.section;
    $http.get(baseUrl + "sections/" + id)
        .then((data) => {
            $scope.section = data.data;
            $scope.edit = 1;
        }, (err) => {
            $scope.ederror = err;
        })

    $scope.update = function() {

        $http({
            url: baseUrl + "sections/" + id,
            method: "PUT",
            data: this.section,
            contentType: 'application/json'
        }).then((data) => {
            $scope.info = data.data.message
            console.log(data.data.messsage)
        }, (error) => {
            $scope.ederror = error
            console.log(error)
        })
    }
})