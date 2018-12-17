letterFrequencyList = [];
selectedLetters = [];
selectedLettersPos = [];
foundWords = [];
currentWords = [];

var columns = 20;
var rows = 20;
$(document).ready(function(){
  $("#gameDiv").append("<button id=\"btnClearSelection\">Clear Selection</button>");
  $("#gameDiv").append("<button id=\"btnRestart\">Restart</button>");
  $("#gameDiv").append("<button id=\"btnHelp\">Help</button>");

  $("#btnClearSelection").click(function (){
    clearSelection();
  });
  $("#btnRestart").click(function (){
    clearPage();
    createPage();
    currentWords = selectWords();
    addWordsToTable();
    fillInTable();
    addCurrentWordsTable();
    $(".crosswordLetter").click(function(){
      getSelectedLetter($(this));
      colorSelection();
    });
  });
  $("#btnHelp").click(function (){
    var helpText = "";
    helpText += "To clear currently selected text click the \"Clear Selection\" button.\n";
    helpText += "To reset the game and start a new one click the \"Restart\" button.\n";
    helpText += "Clicking the Help button shows this help text.";
    alert(helpText);
  });
  // if (doesWordFit("this", [1, 5], 4)){ addWord("this", [1, 5], 4); } // test
  createPage();
  currentWords = selectWords();
  addWordsToTable();
  fillInTable();
  addCurrentWordsTable();

  $(".crosswordLetter").click(function(){
    // $(this).css({color:"red"});
    getSelectedLetter($(this));
    colorSelection();
    updateFoundWordlist();
  });

});

function createPage(){
  var table = $("<table id=\"crosswordGame\" class=\"btnOption\"></table>");
  createTableValues(table);
  $("#gameDiv").append(table);
  var table = $("<table id=\"tblWordList\" class=\"btnOption\"></table>");
  $("#gameDiv").append(table);
  // var table = $("<table id=\"crosswordWords\"></table>");
}

function clearPage(){
  $("#crosswordGame").remove();
  $("#tblWordList").remove();
  selectedLetters = [];
  selectedLettersPos = [];
  foundWords = [];
}

function clearSelection(){
  // console.log("Clearing selection");
  for (var i = 0; i < selectedLettersPos.length; i++) {
    $("#td" + selectedLettersPos[i].join("_")).css({color:"black"});
  }
  selectedLettersPos = [];
  selectedLetters = [];
}

function colorSelection(){
  for (var i = 0; i < selectedLettersPos.length; i++) {
    $("#td" + selectedLettersPos[i].join("_")).css({color:"red"});
  }
}

function selectionGood(){
  // console.log("Clearing selection");
  for (var i = 0; i < selectedLettersPos.length; i++) {
    var selectedLetter = $("#td" + selectedLettersPos[i].join("_"));
    selectedLetter.css({color:"green",
                        fontWeight:"bold",
                        fontSize:"+=3px"});
    selectedLetter.off("click"); // Removes click handler
  }
  for (var x = 0; x < foundWords.length; x++) {
    if ($("#tdWords" + foundWords[x])){
      $("#tdWords" + foundWords[x]).css({color:"green",
                                         fontWeight:"bold"});
    }
  }
  selectedLettersPos = [];
  selectedLetters = [];
}

function addCurrentWordsTable(){
  var table = $("#tblWordList");
  var tbRow = $("<tr></tr>");
  var tdList = [];
  for (var x = 0; x < currentWords.length; x++) {
    tdList.push("<td id=\"tdWords"+ currentWords[x] +"\" class=\"wordListWord\">"+ currentWords[x] +"</td>");
  }
  for (var y = 1; y < tdList.length + 1; y++) {
    tbRow.append(tdList[y - 1]);
    if ((y % 4 == 0 && y != 0) || y == tdList.length){
      table.append(tbRow);
      tbRow = $("<tr></tr>");
    }
  }
  $("#gameDiv").append(table);
}

function updateFoundWordlist(word){
  var table = $("#tblWordList");
  var tbRow = $("<tr></tr>");
  var tdList = [];
  if (currentWords.indexOf(word) > -1){
    foundWords.push(word);
    var table = $("#tblWordList");
    table.html("");// Clear word table
    var tbRow = $("<tr></tr>");
    var tdList = [];
    for (var x = 0; x < currentWords.length; x++) {
      tdList.push("<td id=\"tdWords"+ currentWords[x] +"\" class=\"wordListWord\">"+ currentWords[x] +"</td>")
    }
    for (var y = 0; y < tdList.length; y++) {
      if ((y % 4 == 0 && y != 0) || y == tdList.length - 1){
        table.append(tbRow);
        tbRow = $("<tr></tr>");
      }
      tbRow.append(tdList[y]);
    }
    if (currentWords.indexOf(word) > -1){
      $("#tbWords" + word).css({color:"green"});
    }
    $("#tblWordList").html(table.html());
    selectionGood();

  }
}

// https://en.wikipedia.org/wiki/letterFrequency
function randomLetter(){
  letterFrequency = {
    'a':816,
    'b':149,
    'c':278,
    'd':425,
    'e':1070, //edited
    'f':222,
    'g':201,
    'h':609,
    'i':696,
    'j':65, //edited
    'k':387,
    'l':402,
    'm':240,
    'n':674,
    'o':750,
    'p':192,
    'q':50, //edited
    'r':598,
    's':632,
    't':925,
    'u':275,
    'v':97,
    'w':537,
    'x':65, //edited
    'y':397,
    'z':50 //edited
  }
  if (letterFrequencyList.length == 0){
    for (var letter in letterFrequency){
      // console.log(String(letter) + ":" + letterFrequency[letter]);
      var current_letter = []
      for (var x = 0; x < letterFrequency[letter]; x++){
        letterFrequencyList.push(letter);
      }
    }
  }
  return letterFrequencyList[randomInt(0, letterFrequencyList.length - 1)];
}

function createTableValues(table){
  for (var y = 0; y < rows; y++){
    var tableRow = $("<tr></tr>");
    for (var x = 0; x < columns; x++){
      tableRow.append("<td id=\"td" + (x+1) + "_" + (y+1) + "\" class=\"crosswordLetter\"></td>");
    }
    // $(tableRow).css({border:"1px"})
    table.append(tableRow);
  }
}
function createTableLetters(){
  var lettersX = [];
  for (var x = 0; x < columns; x++){
    var lettersY = [];
    for (var y = 0; y < rows; y++){
      lettersY.push(letterFrequencyList[randomInt(0, letterFrequencyList.length)]);
    }
    lettersX.push(lettersY);
  }
  // console.log(lettersX);
  return lettersX;
}

function selectWords(){
  var wordList = [
    "minimize","expectation","brick","mold",
    "pig","reward","delivery","cooperate",
    "central","slab","quaint","hostility",
    "new","explicit","Sunday","butterfly",
    "rare","circle", "night","core","summary","capture",
    "seminar","scramble","welcome","enhance",
    "empire","technology","healthy",
    "magnetic","leadership","depart","disk",
    "band","candy","person","realize",
    "wave","border","mean","pen",
    "shortage","last","auditor","enjoy",
    "squash","bond"
  ];
  var randomList = []
  for (var i = 0; i < 7; i++) {
    var randomNumber = randomInt(1, wordList.length);
    while(randomList.indexOf(wordList[randomNumber - 1]) > -1){
      randomNumber = randomInt(1, wordList.length);
    }
    randomList.push(wordList[randomNumber - 1]);
  }
  // return ["minimize","expectation","brick","mold","pig","reward"];
  return randomList;
}

function addWordsToTable(){
  // console.log(currentWords);
  for (var x = 0; x < currentWords.length; x++){
    var angle = randomInt(1, 4);
    var currentWord = currentWords[x];
    if (randomInt(1, 3) == 1){ // 30% chance of flipping
      currentWord = currentWord.split('').reverse().join('');
    }
    var xUpperLimit = rows;
    var yUpperLimit = columns;
    var xLowerLimit = 1;
    var yLowerLimit = 1;
    var pos = [randomInt(xLowerLimit, xUpperLimit), randomInt(yLowerLimit, yUpperLimit)];
    while(!doesWordFit(currentWord, pos, angle)){
      pos = [randomInt(xLowerLimit, xUpperLimit), randomInt(yLowerLimit, yUpperLimit)];
    }
    addWord(currentWord, pos, angle);
  }
}

function fillInTable(){
  // console.log("filling in table");
  for (var x = 1; x <= rows; x++){
    for (var y = 1; y <= columns; y++){
      if($("#td" + x + "_" + y).html() == ""){
        $("#td" + x + "_" + y).html(randomLetter());
      }
    }
  }
}

function doesWordFit(word, pos, angle){
  // console.log("checking if word will fit");
  var xPos = pos[0];
  var yPos = pos[1];
  if (angle == 1){ // Horizontal
    if (xPos + word.length > columns || yPos > rows){ return false; }
    for (var x = 1; x <= word.length; x++){
      if (isPositionUsed([xPos + x, yPos])){ return false; }
    }
  } else if (angle == 2){ // Vertical
    if (yPos + word.length > rows || xPos > rows){ return false; }
    for (var y = 1; y <= word.length; y++){
      if (isPositionUsed([xPos, yPos + y])){ return false; }
    }
  } else if (angle == 3){ // Angle-Down
    if (yPos + word.length > rows || xPos + word.length > rows){ return false; }
    for (var z = 1; z <= word.length; z++){
      if (isPositionUsed([xPos + z, yPos + z])){ return false; }
    }
  } else if (angle == 4){ // Angle-Up
    if (yPos - word.length > rows || xPos + word.length > rows){ return false; }
    for (var z = 1; z <= word.length; z++){
      if (isPositionUsed([xPos + z, yPos - z])){ return false; }
    }
  } else {
    // alert("Error, invalid angle used");
    return false;
  }
  return true;
}

function addWord(wordToAdd, pos, angle){
  var word = wordToAdd.split("");
  var xPos = pos[0];
  var yPos = pos[1];
  if (angle == 1){ // Horizontal
    for (var x = 0; x < word.length; x++){
      $("#td" + (xPos + x) + "_" + yPos).html(word[x])
    }
  } else if (angle == 2){ //Vertical
    for (var y = 0; y < word.length; y++){
      $("#td" + xPos + "_" + (yPos + y)).html(word[y]);
    }
  } else if (angle == 3){ // Angle-Down
    for (var z = 0; z < word.length; z++){
      $("#td" + (xPos + z) + "_" + (yPos + z)).html(word[z]);
    }
  } else if (angle == 4){ // Angle-up
    for (var z = 0; z < word.length; z++){
      $("#td" + (xPos + z) + "_" + (yPos - z)).html(word[z]);
    }
  }
}

function isPositionUsed(position){
  var xPos = position[0];
  var yPos = position[1];
  if ($("#td" + xPos + "_" + yPos).html() == ""){
    return false;
  } else { return true; }
}



// Using reverse changes my selectedLetters list
// At the end of this function I reverse it back
function getSelectedLetter(letter){
  var letterId = $(letter).attr("id");
  letterId = letterId.replace("td", "");
  var pos = letterId.split("_");
  // console.log(pos);
  if (isValidLetterSelection(pos, $(letter).html())){
    var normal = selectedLetters.join("");
    var reversed = selectedLetters.reverse().join("");
    if ((currentWords.indexOf(normal) > -1) ||
        (currentWords.indexOf(reversed) > -1)){
      // console.log(selectedLetters.join("") + " is in wordlist.");
      selectedLetters.reverse(); // Fix reversed selection
      if (currentWords.indexOf(selectedLetters.join("")) > -1){
        updateFoundWordlist(selectedLetters.join(""));
        // foundWords.push(selectedLetters.join(""));
      } else if (currentWords.indexOf(selectedLetters.join("")) > -1){
        // foundWords.push(selectedLetters.reverse().join(""));
        updateFoundWordlist(selectedLetters.reverse().join(""))
      } else {
        selectedLetters.reverse(); // Reverse seleciton back
      }
      return true;
    } else {
      // console.log(selectedLetters.join("") + " is not in wordlist.");
      selectedLetters.reverse(); // Fix reversed selection
      return false;
    }
    return true;
  }
  return false;

}

// Checks if newly selected position is a valid selection based on previous selections
function isValidLetterSelection(position, letterHtml){
  var pos = position;
  var letterChar = letterHtml;
  if (selectedPosContains(pos)){
    return false;
  }
  if (selectedLetters.length == 0){
    addLetterToBeginningOfList(pos, letterChar);
    return true;
  } else if (selectedLetters.length == 1 && areLettersTogether(pos, selectedLettersPos[0])){
    addLetterToEndOfList(pos, letterChar);
    return true;
  } else if (selectedLetters.length > 1){
    if (!isCorrectAngle(pos)){
      // console.log("incorrect angle");
      return false;
    }
    if (areLettersTogether(selectedLettersPos[0], pos)){
      // console.log("letter is next to first selection");
      addLetterToBeginningOfList(pos, letterChar);
      return true;
    } else if (areLettersTogether(selectedLettersPos[selectedLettersPos.length - 1], pos)){
      // console.log("letter is next to last selection");
      addLetterToEndOfList(pos, letterChar);
      return true;
    }
  }
  // console.log("Invalid letter choice");

  return false;
}

function isLetterSelected(pos){
  // console.log(pos);
  if (selectedLettersPos.indexOf(pos) > -1){
    // console.log("letter is already selected");
    return true;
  } else { return false; }
}

function areLettersTogether(position1, position2){
  var pos1 = position1;
  var pos2 = position2;
  var xDiff = diff(pos1[0], pos2[0]);
  var yDiff = diff(pos1[1], pos2[1]);
  if (xDiff <= 1 && yDiff <= 1){
    return true;
  } else { return false; }
}

function isWordAngled(){
  var firstCharPos = selectedLettersPos[0];
  var lastCharPos = selectedLettersPos[selectedLettersPos.length - 1];
  var xDiff = diff(firstCharPos[0], lastCharPos[0]);
  var yDiff = diff(firstCharPos[1], lastCharPos[1]);
  if (xDiff == 0 || yDiff == 0){
    return false;
  } else {
    return true;
  }
}

function isCorrectAngle(pos){
  var firstCharPos = selectedLettersPos[0];
  var secondCharPos = selectedLettersPos[1];
  var lastCharPos = selectedLettersPos[selectedLettersPos.length - 1];
  var secondLastCharPos = selectedLettersPos[selectedLettersPos.length - 2];
  var currentCharPos = pos;
  if (diff(pos[0], firstCharPos[0]) <= diff(pos[0], lastCharPos[0]) &&
      diff(pos[1], firstCharPos[1]) <= diff(pos[1], lastCharPos[1])){ // Is closer to first char
    // console.log("Closer to first char");
    if ((secondCharPos[0] - firstCharPos[0] == firstCharPos[0] - currentCharPos[0]) &&
        (secondCharPos[1] - firstCharPos[1] == firstCharPos[1] - currentCharPos[1])){
      return true;
    } else {
      return false;
    }
  } else { // Is closer to last char
    // console.log("Closer to last char");
    if ((secondLastCharPos[0] - lastCharPos[0] == lastCharPos[0] - currentCharPos[0]) &&
        (secondLastCharPos[1] - lastCharPos[1] == lastCharPos[1] - currentCharPos[1])){
      return true;
    } else {
      return false;
    }
  }
}

function addLetterToEndOfList(pos, letter){
  // console.log("added to end of list");
  selectedLettersPos.push(pos);
  selectedLetters.push(letter);
}

function addLetterToBeginningOfList(pos, letter){
  // console.log("added to beginning of list");
  selectedLettersPos.unshift(pos);
  selectedLetters.unshift(letter);
}

// Check if newly selected position has already been selected
function selectedPosContains(pos){
  for (var x = 0; x < selectedLettersPos.length; x++){
    if ((selectedLettersPos[x][0] == pos[0]) &&
        (selectedLettersPos[x][1] == pos[1])){
      return true;
    }
  }
}
