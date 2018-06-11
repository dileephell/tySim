function ToyRobot() {}
ToyRobot.prototype = function() {
    var readCurrentCommand = function(command) {
        return command.split(' ').shift();
    };

    var changePlace = function(table, toyRobot, newPlace) {
        return table.RobotChangePlace(toyRobot, newPlace);
    };

    var move = function(table, toyRobot, proposedPlace) {
        return table.moveRobot(toyRobot, proposedPlace);
    };

    var rotate = function(table, rotation) {
        return table.rotateRobot(rotation);
    };

    var reportCurrentPlace = function(table) {
        return table.reportCurrentRobotPlace();
    };

    return {
        readCurrentCommand: readCurrentCommand,
        changePlace: changePlace,
        move: move,
        rotate: rotate,
        reportCurrentPlace: reportCurrentPlace
        
    };
}();

module.exports = ToyRobot;