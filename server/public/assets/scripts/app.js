var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when("/home", {
            templateUrl: "/views/routes/home.html"
        }).
        when("/add", {
            templateUrl: "/views/routes/add.html",
            controller: "AddController"
        }).
        when("/view", {
            templateUrl: "/views/routes/view.html",
            controller: "ShowController"
        }).
        otherwise({
            redirectTo: "/home"
        });
}]);
