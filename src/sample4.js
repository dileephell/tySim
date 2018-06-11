var Table = require('./table');
var ToyRobot = require('./robot');
var ReadInstruct = require('./readFile.js');

var table = new Table();
var toyRobot = new ToyRobot();
var ReadInstruct = new ReadInstruct();
ReadInstruct.readInstruction(table, toyRobot, "instructionRead4", function(err, instructions) {
    ReadInstruct.readCommand(table, toyRobot, instructions)
});
