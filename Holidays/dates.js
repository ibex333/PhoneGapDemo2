/*
     

   Function List:
   showDateTime(time)
      Returns the date in a text string formatted as:
      mm/dd/yyyy at hh:mm:ss am

   changeYear(today, holiday)
      Changes the year value of the holiday object to point to the
      next year if it has already occurred in the present year

   countdown(stop, start)
      Displays the time between the stop and start date objects in the
      text format:
      dd days, hh hrs, mm mins, ss secs
*/

function showDateTime(time) {
   date = time.getDate();
   month = time.getMonth()+1;
   year = time.getFullYear();

   second = time.getSeconds();
   minute = time.getMinutes();
   hour = time.getHours();

   ampm = (hour < 12) ? " a.m." : " p.m.";
   hour = (hour > 12) ? hour - 12 : hour;
   hour = (hour == 0) ? 12 : hour;

   minute = minute < 10 ? "0"+minute : minute;
   second = second < 10 ? "0"+second : second;

   return month + "/" + date + "/" + year + " at " + hour + ":" + minute + ":" + second + ampm;
}


function changeYear(today,holiday)  {
	var year = today.getFullYear();
	holiday.setFullYear(year);
		if(holiday < today) {
		year = year + 1;
		holiday.setFullYear(year);
		}
		
	return year;
}




function countdown(start,stop) {     


var time = stop - start;


// display days rounded to the next lowest integer
var days = (time) / 1000 / 60 / 60 / 24;
days = Math.floor(days);

// calculate the hours left in the current day
var hours = (time) / 1000 / 60 / 60 - (24 * days);
hours = Math.floor(hours);


// calculate the minutes left in the current hour
var minutes = (time) / 1000 /60 - (24 * 60 * days) - (60 * hours);
// display minutes rounded to the next lowest integer
minutes = Math.floor(minutes);
// calculate the seconds left in the current minute
var seconds = (time) / 1000 - (24 * 60 * 60 * days) - (60 * 60 * hours) - (60 * minutes);
// display seconds rounded to the next lowest integer
seconds = Math.floor(seconds);


return days + " days " +  hours + " hours "+ minutes + " minutes "+ seconds + " seconds ";
             
            


}
