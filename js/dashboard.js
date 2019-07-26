const baseUrl = "http://localhost:8000/api/";
const app = angular.module("dclm-app", ['ngRoute']);
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
            controller: 'userlist'
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
            controller: 'messageList'
        })
        .when('/compose', {
            templateUrl: 'messages/message.html',
            controller: 'messageController'
        })
        .when('/read_message/:message', {
            templateUrl: 'messages/read.html',
            controller: 'readMessageController'
        })
        .when('/reply_message/:message', {
            templateUrl: 'messages/reply.html',
            controller: 'replyMessageController'
        })
        .when('/forward_message/:message', {
            templateUrl: 'messages/forward.html',
            controller: 'forwardMessageController'
        })

    //region routes
    .when('/region', {
            templateUrl: 'regions/index.html',
            controller: 'regionController'
        })
        .when('/regionform', {
            templateUrl: 'regions/region.html',
            controller: 'regionController'
        })
        .when('/view_region/:region', {
            templateUrl: 'regions/view.html',
            controller: 'viewregionController'
        })
        .when('/edit_region/:region', {
            templateUrl: 'regions/edit.html',
            controller: 'editregionController'
        })

    //section routes
    .when('/section', {
            templateUrl: 'sections/index.html',
            controller: 'sectionController'
        })
        .when('/sectionform', {
            templateUrl: 'sections/section.html',
            controller: 'sectionController'
        })
        .when('/view_section/:section', {
            templateUrl: 'sections/view.html',
            controller: 'viewSectionController'
        })
        .when('/edit_section/:section', {
            templateUrl: 'sections/edit.html',
            controller: 'editSectionController'
        })

    //leave form
    .when('/applyleave', {
            templateUrl: 'leaveform/index.html',
            controller: 'leaveController'
        })
        .when('/hodview', {
            templateUrl: 'leaveform/hodview.html',
            controller: 'hodView'
        })
        .when('/adminview', {
            templateUrl: 'leaveform/adminview.html',
            controller: 'adminView'
        })
        .when('/csview', {
            templateUrl: 'leaveform/csview.html',
            controller: 'csView'
        })
        .when('/hod/:leaveform', {
            templateUrl: 'leaveform/hod.html',
            controller: 'hodController'
        })
        .when('/admin/:leaveform', {
            templateUrl: 'leaveform/admin.html',
            controller: 'adminController'
        })
        .when('/cs/:leaveform', {
            templateUrl: 'leaveform/csoffice.html',
            controller: 'csController'
        })
        .when('/manageleave', {
            templateUrl: 'leaveform/view.html',
        })
        .when('/status/:leaveform', {
            templateUrl: 'leaveform/status.html',
            controller: 'statusController'
        })
        //fuel request
        .when('/fuel', {
            templateUrl: 'fuel/fuel.html',
            controller: 'fuelController'
        })
        .when('/adminfuel/:fuel', {
            templateUrl: 'fuel/fuel_admin.html',
            controller: 'fuelController'
        })
        .when('/auditfuel/:fuel', {
            templateUrl: 'fuel/fuel_audit.html',
            controller: 'fuelController'
        })
        .when('/storefuel/:fuel', {
            templateUrl: 'fuel/fuel_store.html',
            controller: 'fuelController'
        })
        .when('/despenserfuel/:fuel', {
            templateUrl: 'fuel/dispenser.html',
            controller: 'fuelController'
        })
        .when('/fuelapprove', {
            templateUrl: 'fuel/fuel_view.html',
            controller: 'fuelViewController'
        })
});

app.controller("dashController", ($scope, $http) => {
    $scope.user = local_store({}, "dclm-user", "get");
    //console.log($scope.user);
    $scope.logout = () => {
        let ans = confirm("Are you sure? You want to logout?");
        if (ans) {
            local_store({}, "dclm-user", "remove");
            window.location.href = "../index.html";
        }
    }
});