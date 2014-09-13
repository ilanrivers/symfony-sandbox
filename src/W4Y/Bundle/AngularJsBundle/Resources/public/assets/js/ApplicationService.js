/**
 * ApplicationService
 *
 * @param $scope
 * @param $http
 * @param routing
 * @constructor
 */
var ApplicationService = function ($http, routing) {
    this.http = $http;
    this.routing = routing;
    this.scope = null;
};

ApplicationService.prototype.getRouting = function () {
    return this.routing;
};

ApplicationService.prototype.getHttp = function () {
    return this.http;
};

ApplicationService.prototype.setScope = function ($scope) {
    this.scope = $scope;
};

ApplicationService.prototype.expose = function (functionsToExpose) {

    if (!this.scope) {
        throw('Scope is not set in ApplicationService');
    }

    for (object in functionsToExpose) {
        var current = functionsToExpose[object];
        this.scope[current.name] = current.function;
    };

};