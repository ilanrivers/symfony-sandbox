// Initialize Angular
var MyAngularApp = angular.module("MyAngularApp", []);

// Change default open/end symbols for for twig curly brace conflict.
MyAngularApp.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    }
);

// Add the ApplicationService as a service so it can be injected by the application.
MyAngularApp.factory('ApplicationService', ['$http', 'SymfonyRouting', function ($http, routing) {
    return new ApplicationService($http, routing);
}]);

// Add the symfony routing as a service so it can be injected by the application.
MyAngularApp.factory('SymfonyRouting', function() {
    return Routing;
});




