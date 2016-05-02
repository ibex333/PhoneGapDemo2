/*
   
   stringReverse
      Used to reverse the order of characters in a text string

*/


function stringReverse(textString) {
   if (!textString) return '';
   var revString='';
   for (i = textString.length-1; i>=0; i--)
       revString+=textString.charAt(i)
   return revString;
}