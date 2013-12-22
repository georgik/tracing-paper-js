angular.module('app', [])
    .controller('TracingController', function($scope, $locale) {
        $scope.imageUrl = "http://georgik.sinusgear.com/wp-content/uploads/y-soft-quest.jpg";

        $scope.originX = 0;
        $scope.originY = 0;

        $scope.isOriginSetMode = false;
        $scope.isRecordMode = true;

        $scope.lastX = 0;
        $scope.lastY = 0;

        $scope.crosshairStyle = {position:"absolute", left: 0, top: 0};

        $scope.stack = [];

        $scope.setOrigin = function(x, y) {
            $scope.originX = x;
            $scope.originY = y;

            $scope.crosshairStyle = {position:"absolute", left: x + "px", top: y + "px"};
        };

        $scope.onImageClick = function(event) {
            if ($scope.isOriginSetMode) {
                $scope.isOriginSetMode = false;
                $scope.setOrigin(event.offsetX, event.offsetY);

            } else {
                $scope.lastX = event.offsetX - $scope.originX;
                $scope.lastY = event.offsetY - $scope.originY;

                if ($scope.isRecordMode) {
                    var item = {
                        x: $scope.lastX,
                        y: $scope.lastY
                    };
                    $scope.stack.push(item);
                }
            }
        };

        $scope.originButtonClick = function() {
            $scope.isOriginSetMode = true;
        };

        $scope.originResetClick = function() {
            $scope.setOrigin(0,0);
        }
    }
);