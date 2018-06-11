// Load filesystem module
var fs = require('fs');
var Place = require('./place');

function ReadInstruct() {}

ReadInstruct.prototype = function() {
    var proposedPlace;

    var getPlaceArgumentsFromPlaceCommand = function(command) {
        return command.split(" ").slice(-1).join().split(",");
    };

    var PlacePosition = function(command, table, toyRobot) {
        proposedPlace = new Place(getPlaceArgumentsFromPlaceCommand(command));
        if (proposedPlace.isValidPlace() && !proposedPlace.isSameAsCurrentPlace(table)) { toyRobot.changePlace(table, toyRobot, proposedPlace); }
    };

    var RotatePosition = function(command, table, toyRobot) {
        if (typeof proposedPlace !== "undefined" && table.isRobotPlaced) {
            if(proposedPlace.isValidPlace()) { toyRobot.rotate(table, command); }
        }
    };

    var MovePosition = function(table, toyRobot) {
        if (typeof proposedPlace !== "undefined" && table.isRobotPlaced) {
            if(proposedPlace.isValidToMove()) { toyRobot.move(table, toyRobot, proposedPlace); }
        }
    };

    var ReportPosition = function(table, toyRobot) {
        if (typeof proposedPlace !== "undefined" && table.isRobotPlaced) {
            var currentPlace = toyRobot.reportCurrentPlace(table);
            if (currentPlace != ",,") { process.stdout.write(currentPlace + "\n"); }
        }
    };

    var readCommand = function(table, toyRobot, instructions) {
        var commands = instructions.split('\n');
        for (var element = 0, totalLength = commands.length; element < totalLength; element++) {
            if (commands[element].match(/PLACE/gi) != null) {
                this.PlacePosition(commands[element], table, toyRobot);
            }
            if (commands[element].match(/LEFT|RIGHT/gi) != null) {
                this.RotatePosition(commands[element], table, toyRobot);
            }
            if (commands[element].match(/MOVE/gi) != null) {
                this.MovePosition(table, toyRobot);
            }
            if (commands[element].match(/REPORT/gi) != null) {
                this.ReportPosition(table, toyRobot);
            }
        }
        return true;
    };

    var readInstruction = function(table, toyRobot, filename, callback) {
        var fileLocation = (process.cwd().split("/").pop() == "src") ?
            '../data/' + filename.toString() : './data/' + filename.toString();
        fs.readFile(fileLocation, 'utf8', function (err, instructionBuffer) {
            if (err) { return callback(err); }

            try {
                var instructions = instructionBuffer.toString().trim();
            } catch(err) {
                return callback(err);
            }
            callback(null, instructions);
        });
    };

    return {
        getPlaceArgumentsFromPlaceCommand: getPlaceArgumentsFromPlaceCommand,
        readInstruction: readInstruction,
        readCommand: readCommand,
        PlacePosition: PlacePosition,
        RotatePosition: RotatePosition,
        MovePosition: MovePosition,
        ReportPosition: ReportPosition
    };
}();

module.exports = ReadInstruct;