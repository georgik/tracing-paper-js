angular.module('app', [])
    .controller('TracingController', function($scope, $locale) {
        $scope.imageUrl = "http://georgik.sinusgear.com/wp-content/uploads/y-soft-quest.jpg";

        $scope.originX = 0;
        $scope.originY = 0;

        $scope.isOriginSetMode = false;
        $scope.isRecordMode = true;
        $scope.newAttributeName = "";

        $scope.lastX = 0;
        $scope.lastY = 0;
        $scope.selectedColor = "black";
        $scope.selectedAttributes = {weight: "2", price:"1"};

        $scope.crosshairStyle = {position:"absolute", left: 0, top: 0};

        $scope.stack = [];

        $scope.colors = ["black", "red", "orange", "yellow", "green", "blue", "indigo", "violet", "white"];
        $scope.pointAttributes = ["weight", "price"];

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
                        y: $scope.lastY,
                        color: $scope.selectedColor
                    };
                    angular.forEach($scope.selectedAttributes, function(value, key){
                        item[key] = value;
                    });
                    $scope.stack.push(item);
                }
            }
        };

        $scope.originButtonClick = function() {
            $scope.isOriginSetMode = true;
        };

        $scope.originResetClick = function() {
            $scope.setOrigin(0,0);
        };

        $scope.removePoint = function(itemIndex) {
            $scope.stack.splice(itemIndex, 1);
        };

        $scope.getStyle = function(item) {
            return {
                position: "absolute",
                left: item.x + $scope.originX + "px",
                top: item.y - 11 + $scope.originY + "px",
                color: item.color
            };
        };

        $scope.getColorStyle = function(item) {
            return {
                width: '10px',
                height: '10px',
                border: 'solid 1px black',
                background: item,
                cursor: 'pointer',
                float: 'left'
            }
        };

        $scope.selectColor = function(color) {
            $scope.selectedColor = color;
        };

        $scope.addNewAttribute = function() {
            $scope.pointAttributes.push($scope.newAttributeName);
            $scope.selectedAttributes[$scope.newAttributeName] = "";
        };

        $scope.removeAttribute = function(pointAttribute, itemIndex) {
            $scope.pointAttributes.splice(itemIndex, 1);
            delete $scope.selectedAttributes[pointAttribute];
        }
    }
);