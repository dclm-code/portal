var app = angular.module("dclm-app", ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    //country routes
        .when('/country', {
            templateUrl: 'countries/index.html',
            controller: 'countryController'
        })
        .when('/countryform', {
            templateUrl: 'countries/country.html',
            controller: 'countryController'
        })
        .when('/view_country/:country', {
            templateUrl: "countries/view.html",
            controller: "viewCountryController"
        })
        .when('/edit_country/:country', {
            templateUrl: "countries/edit.html",
            controller: "editCountryController"
        })

    //state routes
    .when('/state', {
            templateUrl: 'states/index.html',
            controller: 'stateController'
        })
        .when("/stateform", {
            templateUrl: "states/state.html",
            controller: "stateController"
        })
        .when('/view_state/:state', {
            templateUrl: 'states/view.html',
            controller: 'viewStateController'
        })
        .when('/edit_state/:state', {
            templateUrl: 'states/edit.html',
            controller: "editStateController"
        })

    //Group/Local Govt routes
    .when('/group_lga', {
            templateUrl: 'group_lgas/index.html',
            controller: 'groupLgaController'
        })
        .when(`/group_lgaform`, {
            templateUrl: 'group_lgas/group_lga.html',
            controller: 'group_lgaController'
        })
        .when(`/view_group_lga/:group_lga`, {
            templateUrl: 'group_lgas/view.html',
            controller: 'viewGroupLgaController'
        })
        .when(`/edit_group_lga/:group_lga`, {
            templateUrl: 'group_lgas/edit.html',
            controller: 'editGroupLgaController'
        })

    //department routes
    .when('/department', {
            templateUrl: 'departments/index.html',
            controller: 'departmentController'
        })
        .when("/departmentform", {
            templateUrl: "departments/department.html",
            controller: "departmentController"
        })
        .when('/view_department/:department', {
            templateUrl: 'departments/view.html',
            controller: 'viewDepartmentController'

        })
        .when('/edit_department/:department', {
            templateUrl: 'departments/edit.html',
            controller: 'editDepartmentController'
        })

    //Qualification routes
    .when('/qualification', {
            templateUrl: 'qualifications/index.html',
            controller: 'qualificationController'
        })
        .when('/qualificationform', {
            templateUrl: 'qualifications/qualification.html',
            controller: 'qualificationController'
        })
        .when('/view_qualification/:qualification', {
            templateUrl: 'qualifications/view.html',
            controller: 'viewQualificationController'
        })
        .when('/edit_qualification/:qualification', {
            templateUrl: 'qualifications/edit.html',
            controller: 'editQualificationController'
        })

    //Grade level routes
    .when('/grade_level', {
            templateUrl: 'grade_levels/index.html',
            controller: 'gradeLevelController'
        })
        .when('/grade_levelform', {
            templateUrl: 'grade_levels/grade_level.html',
            controller: 'grade_level_list'
        })
        .when('/view_grade_level/:grade_level', {
            templateUrl: 'grade_levels/view.html',
            controller: 'viewGrade_LevelController'
        })
        .when('/edit_grade_level/:grade_level', {
            templateUrl: 'grade_levels/edit.html',
            controller: 'editGrade_LevelController'
        })

    //staff/users routes
    .when('/staff', {
            templateUrl: 'users/index.html',
            controller: 'userController'
        })
        .when('/userform', {
            templateUrl: 'users/user.html',
            controller: 'userController'
        })
        .when('/view_user/:user', {
            templateUrl: 'users/view.html',
            controller: 'viewUserController'
        })
        .when('/edit_user/:user', {
            templateUrl: 'users/edit.html',
            controller: 'editUserController'
        })
        .when('/remark/:user', {
            templateUrl: 'users/remark.html',
            controller: 'remarkUserController'
        })

    //Messaging/Intra Office memo routes
    .when('/message', {
        templateUrl: 'messages/index.html',
        controller: 'messageController'
    })

    //region routes
    .when('/region', {
        templateUrl: 'regions/index.html',
        controller: 'regionController'
    })

    //section routes
    .when('/section', {
        templateUrl: 'sections/index.html',
        controller: 'sectionController'
    })
});