var $ = function (id) {
    return document.getElementById(id);
}

var seconds = 0;
var clockId;
			
var runClock = function() {
	seconds++;
	$("quizclock").value = seconds;
}
var startClock = function() {
	showQuiz();
	clockId = setInterval("runClock()",1000);
}
var stopClock = function() {
	clearInterval(clockId);
	var correctAns = gradeQuiz();
	alert ("You have " + correctAns + " correct of 5 in " + $("quizclock").value + " seconds.");
			
}

var resetQuiz =function() {
   $("quizclock").value = 0;
   for (i=0; i<$("quiz").elements.length; i++) $("quiz").elements[i].disabled=false;
   $("stop").disabled = true;
}

var showQuiz = function() {
   $("quiztable").style.visibility="visible";
   $("start").disabled = true;
   $("stop").disabled = false;
}

var hideQuiz =function() {
   $("quiztable").style.visibility="hidden";
}

var gradeQuiz = function() {
   correct=0;
   if ($("quiz").q1[1].checked) correct++;
   if ($("quiz").q2[3].checked) correct++;
   if ($("quiz").q3[0].checked) correct++;
   if ($("quiz").q4[3].checked) correct++;
   if ($("quiz").q5[2].checked) correct++;
   
   $("cor1").style.backgroundColor="yellow";
   $("cor2").style.backgroundColor="yellow";
   $("cor3").style.backgroundColor="yellow";
   $("cor4").style.backgroundColor="yellow";
   $("cor5").style.backgroundColor="yellow";

   for (i=0; i<$("quiz").elements.length; i++) $("quiz").elements[i].disabled=true;

   return correct;
}
window.onload = function () {
    $("quiz").reset(); 
	resetQuiz();
	$("start").onclick = startClock;
	$("stop").onclick = stopClock;
}