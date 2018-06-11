function Place(newPlace) {
    this.xPosition = newPlace[0];
    this.yPosition = newPlace[1];
    this.faceDirection = newPlace[2];
    this.validFaceDirections = ["NORTH", "SOUTH", "WEST", "EAST"];
}

Place.prototype = function() {
    var choosePlace = function() {
        return [this.xPosition, this.yPosition, this.faceDirection].join();
    };

    var isSameAsCurrentPlace = function(table) {
        if (table.isRobotPlaced == false) {
            return false;
        } else if (this.xPosition == table.currentRobotPlace.xPosition &&
            this.yPosition == table.currentRobotPlace.yPosition &&
            this.faceDirection == table.currentRobotPlace.faceDirection) {
            return true;
        }
        return false;
    };

    var isValidPlace = function() {
        if (!isNaN(parseInt(this.xPosition)) && !isNaN(parseInt(this.xPosition)) &&
            !isNaN(this.yPosition) && !isNaN(this.yPosition) &&
            this.xPosition >= 0 && this.xPosition <= 4 &&
            this.yPosition >= 0 && this.yPosition <= 4 &&
            this.validFaceDirections.indexOf(this.faceDirection) != -1) {
            return true;
        }
        return false;
    };

    var isValidToMove = function() {
        if (this.yPosition == 0 && this.faceDirection == "SOUTH") {
            return false;
        } else if (this.yPosition == 4 && this.faceDirection == "NORTH") {
            return false;
        } else if (this.xPosition == 0 && this.faceDirection == "WEST") {
            return false;
        } else if (this.xPosition == 4 && this.faceDirection == "EAST") {
            return false;
        } else if (!this.isValidPlace()) {
            return false;
        } else {
            return true;
        }
    };

    return {
        choosePlace: choosePlace,
        isSameAsCurrentPlace: isSameAsCurrentPlace,
        isValidPlace: isValidPlace,
        isValidToMove: isValidToMove
    };
}();

module.exports = Place;