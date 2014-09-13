// Initialize Angular
var app = angular.module("myApp", []);

// Change default open/end symbols for for twig curly brace conflict.
app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    }
);

// Add the ApplicationService as a service so it can be injected by the application.
app.factory('ApplicationService', ['$http', 'SymfonyRouting', function ($http, routing) {
    return new ApplicationService($http, routing);
}]);

// Add the symfony routing as a service so it can be injected by the application.
app.factory('SymfonyRouting', function() {
    return Routing;
});

// Register Grid Controller
app.controller('GridController', GridController);