
function randomInt(start, end){
  return Math.floor(Math.random() * (end) + start);
}

// https://stackoverflow.com/questions/3156765/javascript-function-to-get-the-difference-between-two-numbers
function diff(a,b){return Math.abs(a-b);}

function startTimer(){
  hSeconds = 0;
  var timerId = setInterval(clock, 10);
  return timerId;
}

// Clock Function
function clock(){
  var values = convertHSeconds();
  $("#timer").html(pad(values[0], 2) + ":" + pad(values[1], 2) + ":"  + pad(values[2], 2));
  hSeconds = hSeconds + 1;
}

function convertHSeconds(){
  var minutes = Math.floor(hSeconds / 6000);
  var clockSeconds = Math.floor(hSeconds / 100) - 60 * minutes;
  var seconds = Math.floor(hSeconds / 100);
  var clockTSeconds = Math.floor(hSeconds / 10);
  var clockHSeconds = hSeconds % 100;
  return [minutes, clockSeconds, clockHSeconds, seconds];
}

// https://stackoverflow.com/a/6466243
// Create padding for clock numbers
function pad(number, max){
  number = number.toString();
  return number.length < max ? pad("0" + number, max) : number;
}

// This function uses regex to check if a string is a number
function checkField(number){
  // Check if there are any non-number characters (0-9 and ./-)
  var re = new RegExp("[^0-9\.\-]", "g");
                        // Make sure there are numbers
  if (re.test(number) || number.length <= 0 || (number == "-") || (number == "+") || (number == ".")){
    return false;
  } else {
    // Check decimal count
    var reDecimal = new RegExp("[\.]", "g");
    // Check dash count
    var reNeg = new RegExp("[\-]","g");
    // Check if dash is not first
    var reNegFirst = new RegExp(".+\-.*", "g");
    decMatch = number.match(reDecimal);
    negMatch = number.match(reNeg);
    negFirstMatch = number.match(reNegFirst);
    if ((decMatch == null || decMatch.length <= 1) &&
        (negMatch == null || negMatch.length <= 1) &&
        (negFirstMatch == null || negFirstMatch.length == 0)){
      return true;
    } else {
      return false;
    }

  }
}

// Flash red
function incorrectField(fieldId){
  var currentField = $(fieldId);
  currentField.css({backgroundColor: "red"});
  setTimeout(function (){
    currentField.css({backgroundColor: "white"});
  }, 1500);
}
