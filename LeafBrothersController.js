/**
 * Created by sheldonbarnes on 11/2/15.
 */
var app;
(function (app) {
    var LeafBrothers;
    (function (LeafBrothers) {
        var customer = (function () {
            function customer() {
            }
            customer.prototype.findCustomerByName = function (nameInput) {
                return new customer;
            };
            customer.prototype.findCustomerByEmail = function (emailInput) {
                return new customer;
            };
            return customer;
        })();
        angular
            .module("LeafBrothers")
            .controller("LeafBrothersController", customer);
    })(LeafBrothers = app.LeafBrothers || (app.LeafBrothers = {}));
})(app || (app = {}));
