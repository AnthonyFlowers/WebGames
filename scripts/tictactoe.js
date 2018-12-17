var winner;
$(document).ready(function(){
  currentTurn = 'x';
  createBoard();
  $(".tttSpot").click(function (){
    if ($(this).html() == ""){
      // console.log(getTdId($(this)));
      $("#" + getTdId($(this))).html(currentTurn);
      if (checkWin()){
        setTimeout(function (){
          alert(currentTurn + " wins.");
          $(".tttSpot").html("");
        }, 400);

      } else {
        if (checkBoardFull()){
          alert("Tie");
          $(".tttSpot").html("");
        } else {
          if (currentTurn == 'x'){
            currentTurn = 'o';
          } else { currentTurn = 'x'; }
        }
      }
    }
  });
});

function checkWin(){
  for (var x = 1; x < 4; x++){ // Vertical
    // console.log(getTdValue(x, 1));
    if ((getTdValue(x, 1) == getTdValue(x, 2)) &&
        (getTdValue(x, 2) == getTdValue(x, 3)) &&
        (getTdValue(x, 3) != "")){
      // console.log("yes");
      return true;
    }
  }
  for (var y = 1; y < 4; y++){ // Horizontal
    // console.log(getTdValue(x, 1));
    if ((getTdValue(1, y) == getTdValue(2, y)) &&
        (getTdValue(2, y) == getTdValue(3, y)) &&
        (getTdValue(3, y) != "")){
      // console.log("yes");
      return true;
    }
  }
  // Diag 1
  if ((getTdValue(1, 1) == getTdValue(2, 2)) &&
      (getTdValue(2, 2) == getTdValue(3, 3)) &&
      (getTdValue(3, 3) != "")){
    // console.log("yes");
    return true;
  }
  if ((getTdValue(1, 3) == getTdValue(2, 2)) &&
      (getTdValue(2, 2) == getTdValue(3, 1)) &&
      (getTdValue(1, 3) != "")){
    // console.log("yes");
    return true;
  }
  return false;
}

function checkBoardFull(){
  console.log($("td").length)
  for (var i = 0; i < getSpots().length; i++) {
    if (getSpots()[i] == ""){
      return false;
    }
  }
  return true;
}

function getSpots(){
  var spots = [];
  $(".tttSpot").each(function(){
    spots.push($(this).html());
  });
  return spots;
}


function getTdId(tableData){
  var td = $(tableData);
  return td.attr("id");
}

function getTdValue(x, y){
  return $("#td" + x + "_" + y).html();
}

function createBoard(){
  var tttBoard = $("<table id=\"tttBoard\"></table>");
  var row = $("<tr></tr>");
  row.append("<td id=\"td1_1\" class=\"tttSpot\"></td>");
  row.append("<td id=\"td2_1\" class=\"tttSpot\"></td>");
  row.append("<td id=\"td3_1\" class=\"tttSpot\"></td>");
  tttBoard.append(row);

  row = $("<tr></tr>");
  row.append("<td id=\"td1_2\" class=\"tttSpot\"></td>");
  row.append("<td id=\"td2_2\" class=\"tttSpot\"></td>");
  row.append("<td id=\"td3_2\" class=\"tttSpot\"></td>");
  tttBoard.append(row);

  row = $("<tr></tr>");
  row.append("<td id=\"td1_3\" class=\"tttSpot\"></td>");
  row.append("<td id=\"td2_3\" class=\"tttSpot\"></td>");
  row.append("<td id=\"td3_3\" class=\"tttSpot\"></td>");
  tttBoard.append(row);

  $("#gameDiv").append(tttBoard);
}
