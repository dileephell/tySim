<h1>ToyRobot</h1>

ToyRobot is a project that simulates movements of the robot on a grid (5x5).
What can the ToyRobot project do?
1. able to place the toy robot anywhere on the grid as well as where it is facing.
2. able to move the toy robot around the grid depending on where it is facing.
3. able to issue comands to rotate left or rotate right; each turn is a 90deg turn.
4. able to report the current coordinate where the toy robot is staging.

<h1>Constraints</h1>
   1. any movement issued to the ToyRobot should not make it fall off the grid

<h1>Understanding the perspective of the tabletop</h1>
<ol>
  <li>North would be the top side of the table.</li>
  <li>South is the bottom side of the table.</li>
  <li>West is the left side of the table.</li>
  <li>East is the right side of the table.</li>
  <li>Origin 0,0 is found at the South West (Lower Left) most part of the table</li>
</ol>

<table>
<tbody>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>(0,0)</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>


<h1>How the App works</h1>
The app will take an input file which is specified in `instruction_reader.js` and will be consumed by the `readInstructionFilet` async function.

String data will be returned from the `readFileInput` function and it will be consumed by the `interpretCommandsFromInstructions` function. The evaluate function reads a command for the robot for every line found in the data.

The `evaluate` function can also be called directly with a hard-coded string separated by a newline carriage return to separate every command.

The `place` function will be called when the `PLACE` command is called for the robot. Without a place command, any commands before it will be ignored by the robot.

Calling the place command more than once will simply re-assign the position of the robot to the more recent coordinate and facing direction.

The `plac`e command also validates if the placement is `invalid`. The robot cannot fall off the tabletop and the command will be ignored.

The robot will be able to `MOVE` using the `move` function which takes the robot's current coordinate and moves one unit towards the direction it is facing. This movement of the robot will also be validated and if the robot will fall off the tabletop, the move command will be ignored.

The robot can change its `direction` by rotating 90 degrees to its LEFT or RIGHT with respect to its current facing direction. This can be achieved using the `rotate` function which takes the `robot's current coordinates`, `facing direction` and its` rotating direction (i.e. LEFT or RIGHT)`.

The robot can `REPORT` its current status using the `report` function which takes the robot's `current coordinates` and `facing direction`. Like every other command, this command can be executed more than once.

If the robot was never placed, the REPORT command will not show anything as every command is ignored.

<h1>Setup</h1>

Clone the repository using  git clone https://github.com/dileephell/toy_robo.git 

Install `Node.js` (includes NPM)
Run `npm install`, it will download all the necessary files from the npmjs.


<h1>How to run the code</h1>
Input : `node src/sample1.js`
Output : 0,1,NORTH

Input: `node src/sample2.js`
Output : 0,0,WEST

Input: `node src/sample3.js`
Output : 3,3,NORTH
 4,3,NORTH

Input: `node src/sample4.js`
Output:
4,0,EAST
4,0,EAST
4,1,NORTH
4,2,NORTH
4,2,NORTH
4,2,NORTH
4,2,NORTH
4,2,NORTH
4,0,EAST
4,0,EAST
4,1,NORTH

<h1>Start the Server</h1>
Start the server using `node server.js` and then check in browser  `http://localhost:3000`

<h1>Offline Functionality.</h1>
Implemented the offline functionality using cache manifest where I have defined all the list of files to be cached and then save the file as offline.manifest,later linked it to hmtl tag.
<html manifest =”offline.manifest”>
Go to dev tools in google incognito window, enter the positions and then click save. The Data will be stored locally rather than being posted to the server. Refresh the page and the values you entered will reappear.

<h1>In Progress Scenario's</h1>
1. Test Cases(Non Functional requirement). 
