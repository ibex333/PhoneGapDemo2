var $ = function (id) {
    return document.getElementById(id);
}
var lowest = 1;
var size = 100;
var randNum;
var guess;

function checkEndGame() {
	if (randNum == guess)  {
	   alert("Congratulations!");
	} 
	else if ($("guesses").value == 0) {
	   alert("Game over. The number was: " + randNum);
	}
}
		 
var generateRandom = function() {
	randNum = Math.floor((Math.random()*size)+lowest);
}

var reportResult = function() {
	guess = parseFloat($("guess").value);
	if (isNaN(guess)) {
		alert("Guess must be a valid number");
	}
	else if ((guess > 100) || (guess < 1)) {
		alert("Number should be between 1 and 100");
	}
	else {
		var result;
		if (guess == randNum) {
			result = "right!";
		}
		else if (guess > randNum) {
			result = "high";
		}
		else {
			result = "low";
		}
		$("guesses").value--;
		$("result").value = result;
		checkEndGame();
	}
}

var resetGame = function() {
	$("guesses").value = 10;
	$("guess").value = "";
	$("result").value ="";
	generateRandom();
}

window.onload = function () {
	generateRandom();
	$("guesses").value = 10;
	$("guess").value ="";
	$("result").value ="";
    $("gbutton").onclick = reportResult;
    $("guess").focus();
	$("restart").onclick = resetGame;
}
