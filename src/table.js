var Place = require('./place');
var grid = require('../utils/grid');

function Table() {
    this.isRobotPlaced = false;
    this.currentRobotPlace = new Place("","","");
    this.historyOfRobotPlaces = [];
    this.units = grid.positionFacingGrid();
}

Table.prototype = function() {
   var RobotFirstPlace = function() {
       return this.isRobotPlaced;
   };

   var RobotChangePlace = function(toyRobot, newPlace) {
       if (toyRobot && newPlace) {
           this.units[[this.currentRobotPlace.xPosition, this.currentRobotPlace.yPosition]] = "";
           this.units[[newPlace.xPosition, newPlace.yPosition]] = newPlace.faceDirection;
           this.currentRobotPlace = newPlace;
           this.historyOfRobotPlaces.push(newPlace);
           this.isRobotPlaced = true;
           return true;
       }
       return false;
   };

   var getPositionOfPlaceToMoveTo = function(proposedPlace) {
       var moveBy = {xMove: 0, yMove: 0};
       if (proposedPlace.isValidToMove()) {
           if (this.currentRobotPlace.faceDirection == "NORTH") {
               moveBy.yMove += 1;
           } else if (this.currentRobotPlace.faceDirection == "SOUTH") {
               moveBy.yMove -= 1;
           } else if (this.currentRobotPlace.faceDirection == "EAST") {
               moveBy.xMove += 1;
           } else if (this.currentRobotPlace.faceDirection == "WEST") {
               moveBy.xMove -= 1;
           }
       }
       return moveBy;
   };

   var moveRobot = function(toyRobot, proposedPlace) {
       if (toyRobot && proposedPlace) {
           this.units[[this.currentRobotPlace.xPosition, this.currentRobotPlace.yPosition]] = "";

           var moveBy = this.getPositionOfPlaceToMoveTo(proposedPlace);
           this.units[[this.currentRobotPlace.xPosition + moveBy.xMove,
               this.currentRobotPlace.yPosition + moveBy.yMove]] = this.currentRobotPlace.faceDirection;
           this.currentRobotPlace.xPosition = parseInt(this.currentRobotPlace.xPosition) + moveBy.xMove;
           this.currentRobotPlace.yPosition = parseInt(this.currentRobotPlace.yPosition) + moveBy.yMove;
           this.historyOfRobotPlaces.pop();
           this.historyOfRobotPlaces.push(this.currentRobotPlace);

           return true;
       } else {
           return false;
       }
   };

   var getRotateDirection = function(rotation) {
       var currentPlace = this.currentRobotPlace;

       var newDirecton;

       if (rotation == "LEFT") {
           if (this.currentRobotPlace.faceDirection == "NORTH") {
               newDirecton = "WEST";
           } else if (this.currentRobotPlace.faceDirection == "SOUTH") {
               newDirecton = "EAST";
           } else if (this.currentRobotPlace.faceDirection == "EAST") {
               newDirecton = "NORTH";
           } else if (this.currentRobotPlace.faceDirection == "WEST") {
               newDirecton = "SOUTH";
           }
       } else if (rotation == "RIGHT") {
           if (this.currentRobotPlace.faceDirection == "NORTH") {
               newDirecton = "EAST";
           } else if (this.currentRobotPlace.faceDirection == "SOUTH") {
               newDirecton = "WEST";
           } else if (this.currentRobotPlace.faceDirection == "EAST") {
               newDirecton = "SOUTH";
           } else if (this.currentRobotPlace.faceDirection == "WEST") {
               newDirecton = "NORTH";
           }
       }
       return newDirecton;
   };

   var rotateRobot = function(rotation) {
       var newDirection = this.getRotateDirection(rotation);
       this.units[[this.currentRobotPlace.xPosition, this.currentRobotPlace.yPosition]] = newDirection;
       this.currentRobotPlace.faceDirection = newDirection;
       this.historyOfRobotPlaces.pop();
       this.historyOfRobotPlaces.push(this.currentRobotPlace);

       return true;
   };

   var reportCurrentRobotPlace = function() {
       if (!this.RobotFirstPlace) { return ""; }
       return this.currentRobotPlace.choosePlace();
   };

   return {
       RobotFirstPlace: RobotFirstPlace,
       RobotChangePlace: RobotChangePlace,
       getPositionOfPlaceToMoveTo: getPositionOfPlaceToMoveTo,
       moveRobot: moveRobot,
       getRotateDirection: getRotateDirection,
       rotateRobot: rotateRobot,
       reportCurrentRobotPlace: reportCurrentRobotPlace
   };
}();

module.exports = Table;