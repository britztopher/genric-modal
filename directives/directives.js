"use strict";

var module = angular.module('brilliantDirectives', ['ui.bootstrap'])

var templateDir = 'templates/';

/*
 custom directive to use as a generic modal window.

 Usage:

 <div>
 <my-modal instance_template='butterflies' use_ctrl="ButterFliesCtrl"></my-modal>
 </div>

 Attributes:
 instance_template: the tempalate name minus the .tpl.html extension.  This assumes the template is in the
 /js/templates/ folder/

 use_ctrl: this is the controller you want to be passed to be used in your modal instance if its located outside of this
 directive then you will need to inject the module it belongs in so this can find it

 The above example decalares a modal window where the template is found at js/templates/modal_instance.html and uses the
 controller MyModalInstanceCtrl
 */

module.directive('myModal', function($modal){

    return {
        transclude: true,
        restrict: 'EA',
        template: '<a ng-click="open()" ng-transclude>{{name}}</a>',
        scope: {
            useCtrl: "@",
            email: "@"
        },
        link: function(scope, element, attrs) {

            console.log('Attrs: ', attrs);
//            console.log('SCOPE: ', scope);Z

            scope.open = function(){


                var modalInstance = $modal.open({
                    templateUrl: templateDir+attrs.instanceTemplate +'.tpl.html',
                    controller:  scope.useCtrl,
                    size: 'lg',
                    windowClass: 'app-modal-window',
                    backdrop: true,
                    resolve: {
                        custEmail: function(){
                            return {email: scope.email};
                        }
                    }

                });

                modalInstance.result.then(function(){
                    console.log('Finished');
                }, function(){
                    console.log('Modal dismissed at : ' + new Date());
                });
            };
        }
    };
});

module.controller('RedBullCtrl', function($scope, $modalInstance, custEmail){
    //add the scop
    $scope.custEmail = custEmail;

    $scope.ok = function(){
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});