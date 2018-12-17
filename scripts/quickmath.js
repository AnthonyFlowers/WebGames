problems = [];
currentProblem = 0;
$(document).ready(function() {
  // https://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
  $(document).keypress(function(e) {
    if(e.which == 13) {
      if (problems.length > 0){
        if (currentProblem < problems.length){
          // console.log(currentProblem);
          // console.log(problems.length);
          if (checkAnswer(currentProblem)){
            // console.log("correct");
            currentProblem++;
            if (currentProblem < problems.length){
              updateProblem();
            } else {
              clearInterval(timerId);
              winGame();
              problems = [];
              currentProblem = 0;
            }
          } else {
            incorrectField("#problemAnswer");
          }
        }
      }
    }
  });

  $("#btnStart").click(function() {
    if ($(this).html() == "Click To Start" && getProblemCount() > 0){
      problems = [];
      currentProblem = 0;
      for (var x = 0; x < getProblemCount(); x++){
        problems.push(createProblem());
      }
      $(this).html("..."); // Removes ability to start multiple timers
      $("#intro").slideUp(500);
      startGame();
    } else if ($(this).html() == "Stop") {
      stopGame();
      $("#intro").slideDown(500);
    }
  })
});

function createGame(){
  var gameDiv = $("<div id=\"quickMathGame\"></div>")
  gameDiv.css({width:"45vw",
            height:"40vh",
            margin:"auto",
            background_color:"grey"
          });
  $("#gameDiv").append(gameDiv);
  $("#gameDiv").children().css({position:"relative",
                                padding:"5px"})
}

function startGame(){
  if (getProblemCount() != 0 && getProblemCount() > 0){
    setTimeout(function(){
      timerId = startTimer();
      $("#btnStart").html("Stop");
      $("#quickMath").append(createProblemElement(problems[0]));
      $("#problemAnswer").focus();
    }, 2000);
  }
}

function stopGame(){
  clearInterval(timerId);
  $("#btnStart").html("Click To Start");
  clearProblem();
}

function updateProblem(){
  $("#problemElement").remove();
  $("#quickMath").append(createProblemElement(problems[currentProblem]));
  $("#problemAnswer").focus();
}

function getProblemCount(){
  var problemCount = $("#txtProblemCount").val();
  // console.log(problemCount);
  if (checkField(problemCount) && problemCount != ""){
    return problemCount;
  } else {
    incorrectField("#txtProblemCount");
    return 0;
  }
}

function createProblemElement(problem){
  var operator = problem["operator"];
  if (operator == '*'){
    operator = 'x';
  }
  if (operator == "/"){
    operator = '÷';
  }
  var num1 = problem["num1"];
  var num2 = problem["num2"];
  // console.log([num1, num2, operator]);
  // var problemElement = createProblem();

  var problemEl = $("<table id=\"problemElement\"></table>");
  $("#problemElement").remove();
  var row = $("<tr></tr>");
  row.append("<td class=\"tdProblem\"></td><td class=\"tdProblem\">" + num2 + "</td><td class=\"tdProblem\"></td>");
  problemEl.append(row);
  row = $("<tr id=\"problemBottom\"></tr>");
  row.append($("<td class=\"tdProblem\">" + operator + "</td><td class=\"tdProblem\">" + num1 + "</td><td class=\"tdProblem\"></td>"));
  problemEl.append(row);
  row = $("<tr ><td colspan=\"3\"><hr /></tr>");
  // row.append($("<td class=\"tdProblem\" ></td><td class=\"tdProblem\"></td><td class=\"tdProblem\"></td>"));
  problemEl.append(row);
  row = $("<tr ></tr>");
  row.append($("<td class=\"tdProblem\" ></td><td class=\"tdProblem\"><input type=\"text\" id=\"problemAnswer\"></td><td class=\"tdProblem\"></td>"));
  problemEl.append(row);
  return problemEl;
}

function createProblem(){
  var operator = randomOperator();
  var num1 = randomInt(0, 20);
  var num2
  if (operator == '/'){ // Doesn't allow fractional answers for division
    num2 = num1 * randomInt(0, 10);
  } else { num2 = randomInt(0, 20);}
  var problem = {
    "operator": operator,
    "num1": num1,
    "num2": num2,
  }
  return problem;
}

function checkAnswer(){
  var problem = problems[currentProblem];
  var num1 = problem["num1"];
  var num2 = problem["num2"];
  if (checkField($("#problemAnswer").val())){
    switch (problem["operator"]) {
      case "+":
        if (num2 + num1 == $("#problemAnswer").val()){
          return true;
        } else { return false; }
        break;
      case "-":
        if (num2 - num1 == $("#problemAnswer").val()){
          return true;
        } else { return false; }
        break;
      case "/":
        if (num2 / num1 == $("#problemAnswer").val()){
          return true;
        } else { return false; }
        break;
      case "*":
        if (num2 * num1 == $("#problemAnswer").val()){
          return true;
        } else { return false; }
        break;
    }
  } else {
    incorrectField("#problemAnswer");
  }
}

function clearProblem(){
  var problem = $("#problemElement").remove();
}

function randomOperator(){
  var operators = ['+', '-', '*', '/'];
  var randomNum = randomInt(0, 3);
  // console.log(randomNum);
  return operators[randomNum];
}

function winGame(){
  var winString = "";
  winString += "You completed " + problems.length + " problem(s).\n";
  winString += "Your time: " + $("#timer").html() + "\n";
  var seconds = convertHSeconds()[3];
  var timePerProblem = Math.round(seconds / problems.length * 100) / 100;
  winString += "You averaged 1 problem every " + timePerProblem + " seconds.";


  alert(winString);
}
