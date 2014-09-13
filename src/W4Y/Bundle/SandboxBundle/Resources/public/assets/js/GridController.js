/**
 * Angular Grid Controller
 *
 * @param $scope
 * @param $http
 * @param routing
 * @constructor
 */
var GridController = function ($scope, $http, routing) {
    this.scope = $scope;
    this.http = $http;
    this.routing = routing;

    this.init();
};

// Inject services by annotation so javascript minification will not break code.
// These services will be injected to the controllers constructor arguments.
GridController.$inject = ['$scope', '$http', 'SymfonyRouting'];

// GridController functions
GridController.prototype.init = function () {

    this.resultsPerPage = 24;
    this.lastOffset = 0;

    this.scope.gridData = [];
    this.scope.currentLimit = this.resultsPerPage;

    // Fetch data
    this.fetchGridData();

    // Preload the grid data for when get more is clicked so more results
    // can be displayed instantly.
    setTimeout(function () {
        this.prefetchGridData();
    }.bind(this), 1500);

    // Expose the getMore function to the application scope.
    this.scope.getMore = this.getMore.bind(this);
};

/**
 * Get More
 *
 * When clicked, more results will be displayed on the page.
 */
GridController.prototype.getMore = function () {

    // Update the current limit so preloaded data will be displayed.
    this.scope.currentLimit += this.resultsPerPage;

    // Fetch more data.
    this.prefetchGridData();
};

/**
 * Fetch grid data
 *
 * Fetch the data to display in the grid.
 *
 * @param offset
 */
GridController.prototype.fetchGridData =  function (offset) {

    offset = offset ? offset : 0;

    // Build the request url.
    var dataUrl = this.routing.generate('w4y_sandbox_rest_car_data', {
        limit: this.resultsPerPage,
        offset: offset
    });

    // Do the request.
    this.http.get(dataUrl).success(this.handleGridDataResponse.bind(this));
};

/**
 * Prefetch grid data
 *
 * Prefetches the grid data so more results can be displayed instantly.
 */
GridController.prototype.prefetchGridData =  function () {
    var offset = this.lastOffset + this.resultsPerPage;
    this.lastOffset = offset;

    this.fetchGridData(offset);
};

/**
 * Handle grid data response
 *
 * Update the grid data with the new results from our backend.
 *
 * @param response
 */
GridController.prototype.handleGridDataResponse = function (response) {
    this.scope.gridData.push.apply(this.scope.gridData, response );
};