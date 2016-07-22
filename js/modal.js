angular.module('app', ['ui.bootstrap'])

.controller('modal.alert', ['$scope', '$uibModalInstance', 'data', function($scope, $uibModalInstance, data) {
    $scope.data = data;

    $scope.ok = function() {
        $uibModalInstance.close();
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
}])

.controller('modal.confirm', ['$scope', '$uibModalInstance', 'data', function($scope, $uibModalInstance, data) {
    $scope.data = data;

    $scope.ok = function() {
        $uibModalInstance.close();
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}])


.service('appAlert', ['$uibModal', '$http', function($uibModal, $http) {
    this.alert = function(data, callback) {
        /*begin modal*/
        var modalInstance = $uibModal.open({
            templateUrl: 'https://sangnguyenplus.github.io/angular-modal/views/alert.html',
            controller: 'modal.alert',
            backdrop: 'static',
            resolve: {
                data: function() {
                    return data;
                }
            }
        });
    };

    this.confirm = function(data, callback) {
        /*begin modal*/
        var modalInstance = $uibModal.open({
            templateUrl: 'https://sangnguyenplus.github.io/angular-modal/views/confirm.html',
            controller: 'modal.confirm',
            backdrop: 'static',
            resolve: {
                data: function() {
                    return data;
                }
            }
        });

        modalInstance.result.then(function() {
            return callback(true);
        }, function() {
            return callback(false);
        });
        /*end modal*/
    };
}])

.controller('MainController', ['$scope', '$uibModal', 'appAlert', function($scope, $uibModal, appAlert) {
    $scope.showModal = function(type) {
        if (type == 'alert') {
            appAlert.alert({
                title: 'Title',
                message: 'This is alert message!',
                type: 'danger'
            });
        } else {
            appAlert.confirm({
                title: 'Confirm delete!',
                message: 'Do you want to delete this record ?'
            }, function(isOk) {
                if (isOk) {
                    appAlert.alert({
                        title: 'Success',
                        message: 'Delete record successfully!',
                        type: 'success'
                    });
                }
            });
        }
    };
}]);
