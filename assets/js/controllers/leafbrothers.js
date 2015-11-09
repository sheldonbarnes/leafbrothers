/**
 * Created by sheldonbarnes on 11/2/15.
 */


(function() {


    var app = angular.module('LeafBrothers', []);
/*
    var MongoClient = require('mongodb').MongoClient
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;

    var url = 'mongodb://localhost:27017/leaf';


    var insertDocument = function(db, callback) {
        db.collection('restaurants').insertOne( {
            "address" : {
                "street" : "2 Avenue",
                "zipcode" : "10075",
                "building" : "1480",
                "coord" : [ -73.9557413, 40.7720266 ]
            },
            "borough" : "Manhattan",
            "cuisine" : "Italian",
            "grades" : [
                {
                    "date" : new Date("2014-10-01T00:00:00Z"),
                    "grade" : "A",
                    "score" : 11
                },
                {
                    "date" : new Date("2014-01-16T00:00:00Z"),
                    "grade" : "B",
                    "score" : 17
                }
            ],
            "name" : "Vella",
            "restaurant_id" : "41704620"
        }, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            callback(result);
        });
    };

    MongoClient.connect(url, function(err, db) {

        db.authenticate('admin','aM4LiNdDa971', function(err, result) {

        });

        assert.equal(null, err);
        insertDocument(db, function() {
            db.close();
        });
    });*/

    var MainController = function ($scope, $http) {

        $scope.clickNext1 = function(div1) {
            $scope.subdivision = div1;
            console.log(div1);

        }

        $scope.lookUpZipCode = function() {
            if ($scope.zipcode.length == 5) {
                console.log($scope.zipcode);
                $scope.getZipCodes($scope.zipcode);
            }
        }

        // This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

        var placeSearch, autocomplete;
        componentForm = {/*
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'*/
        };

        $scope.initAutocomplete = function () {
            // Create the autocomplete object, restricting the search to geographical
            // location types.

            console.log('initAutoComplete');
            autocomplete = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById('address1')),
                {types: ['geocode']});

            // When the user selects an address from the dropdown, populate the address
            // fields in the form.
            autocomplete.addListener('place_changed', $scope.fillInAddress);
        }

        $scope.fillInAddress = function () {
            console.log('fillInAddress');
            // Get the place details from the autocomplete object.
            var place = autocomplete.getPlace();

            for (var component in componentForm) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
            }

            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place.address_components[i][componentForm[addressType]];
                    console.log(place.address_components[i]);
                    document.getElementById(addressType).value = val;
                }
            }
        }

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
        $scope.geolocate = function () {

            console.log('geoLocate');

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var geolocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var circle = new google.maps.Circle({
                        center: geolocation,
                        radius: position.coords.accuracy
                    });
                    autocomplete.setBounds(circle.getBounds());
                });
            }
        }

        $scope.clickNext = function() {
            console.log('Another hello world');
            console.log($scope.name);
            console.log($scope.subdivision);



            $http({
                method: 'POST',
                url: 'http://localhost:3000/api/Customers',
                data: { "name" : $scope.name, "address" : { "streetaddress" : $scope.address, "city" : $scope.city, "state" : $scope.state, "zipcode" : $scope.zipcode }, "phonenumber" : $scope.phonenumber, "email" : $scope.email, "subdivision" : $scope.subdivision}
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


        }

        $scope.getZipCodes = function(zipcode) {

                $http({
                    method: 'get',
                    url: 'http://ziptasticapi.com/' + zipcode
                }).then(function successCallback(response) {
                    console.log(response.data.city);

                    $scope.city = response.data.city;
                    $scope.state = response.data.state;

                }, function errorCallback(response) {
                    console.log(response);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
        $scope.getSubdivisions = function() {
            $http({
                method: 'get',
                url: 'http://api1-lb001.rhcloud.com/api/Subdivisions'
            }).then(function successCallback(response) {
                $scope.subdivisions = response.data;
                console.log('Getting subdivisions ' + response.data);
            }, function errorCallback(response) {

                $scope.subdivisions = [{"name":"Test1"},{"name":"Test2"}];
                console.log(response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }



        //$scope.subdivisions = [{"name":"Brookstone Park"},{"name":"Kingsborough"}, {"name":"Other"}]

        $scope.initAutocomplete();
        $scope.getSubdivisions();


        console.log('The application started');

    }


    app.controller("LeafBrothersController", MainController);

}());
