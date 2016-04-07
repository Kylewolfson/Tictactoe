//Business Logic

function Square (playerMark, xcoordinate, ycoordinate, clickable) {
  this.playerMark = playerMark;
  this.xcoordinate = xcoordinate;
  this.ycoordinate = ycoordinate;
  this.clickable = clickable;
}

function Board () {
  this.spaces = [];
}

function Game (aiLevel, turnCounter, spaceLocation, player) {
var aiLevel = aiLevel;
var turnCounter = turnCounter;
var spaceLocation = spaceLocation;
var player = player;
}

var newGame = new Game(false, 0);

playerPicker = function() {
  if (newGame.turnCounter % 2 === 0) {
    return("Player X")
  } else
    return("Player O")
  }

var newBoard = new Board();

//pushes new Squares into array spaces with playerMark = false, both coordinates, & clickable = true
Board.prototype.reset = function() {
  newBoard.spaces = [];
  for (var y = 1; y <= 3; y++) {
    for (var x = 1; x <= 3; x++) {
      var newSquare = new Square (false, x, y, true);
      newBoard.spaces.push(newSquare);
    }
  }
};

newBoard.reset();

Board.prototype.bestAvailable = function() {
  if (newBoard.spaces[4].playerMark === false) {return 4}
  if (newBoard.spaces[0].playerMark === false) {return 0}
  if (newBoard.spaces[2].playerMark === false) {return 2}
  if (newBoard.spaces[6].playerMark === false) {return 6}
  if (newBoard.spaces[8].playerMark === false) {return 8}
}

Board.prototype.preventFork = function() {
  if (newGame.turnCounter === 3) {
    if (newBoard.spaces[1].playerMark === false) {return 1}
    if (newBoard.spaces[3].playerMark === false) {return 3}
  }
}

Board.prototype.canIWin = function() {
  var winningArrays =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var i = 0; i < winningArrays.length; i++) {
    var winningSpaces = 0;
    var emptySpaces = 0;
    space1 = winningArrays[i][0];
    space2 = winningArrays[i][1];
    space3 = winningArrays[i][2];
    emptySpace = false;
    if (newBoard.spaces[space1].playerMark === "Player O") {winningSpaces++;}
    if (newBoard.spaces[space2].playerMark === "Player O") {winningSpaces++;}
    if (newBoard.spaces[space3].playerMark === "Player O") {winningSpaces++;}
    if (newBoard.spaces[space1].playerMark === false) {emptySpaces++; emptySpace = space1;}
    if (newBoard.spaces[space2].playerMark === false) {emptySpaces++; emptySpace = space2;}
    if (newBoard.spaces[space3].playerMark === false) {emptySpaces++; emptySpace = space3;}
    if ((winningSpaces === 2) && (emptySpaces === 1)) {return emptySpace+1}
  }
}

Board.prototype.canIBlock = function() {
  var winningArrays =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var i = 0; i < winningArrays.length; i++) {
    var winningSpaces = 0;
    var emptySpaces = 0;
    space1 = winningArrays[i][0];
    space2 = winningArrays[i][1];
    space3 = winningArrays[i][2];
    emptySpace = false;
    if (newBoard.spaces[space1].playerMark === "Player X") {winningSpaces++;}
    if (newBoard.spaces[space2].playerMark === "Player X") {winningSpaces++;}
    if (newBoard.spaces[space3].playerMark === "Player X") {winningSpaces++;}
    if (newBoard.spaces[space1].playerMark === false) {emptySpaces++; emptySpace = space1;}
    if (newBoard.spaces[space2].playerMark === false) {emptySpaces++; emptySpace = space2;}
    if (newBoard.spaces[space3].playerMark === false) {emptySpaces++; emptySpace = space3;}
    if ((winningSpaces === 2) && (emptySpaces === 1)) {return emptySpace+1}
  }
}

Board.prototype.gameOver = function() {
  var winningArrays =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var i = 0; i < winningArrays.length; i++) {
    space1 = winningArrays[i][0];
    space2 = winningArrays[i][1];
    space3 = winningArrays[i][2];
    if ((newBoard.spaces[space1].playerMark) && (newBoard.spaces[space1].playerMark) === (newBoard.spaces[space2].playerMark) && (newBoard.spaces[space1].playerMark) === (newBoard.spaces[space3].playerMark)) {
      return true;
    }
  }
  if (newGame.turnCounter === 9) {
    return "Cats Game!";
  } else {
    return false;
  }
}

//User Interface
$(function() {
  $('.background').click(function() {
    newGame.spaceLocation = $(this).attr("id");
    newGame.player = playerPicker();
    if (newBoard.spaces[newGame.spaceLocation].clickable) {
      newBoard.spaces[newGame.spaceLocation].clickable = false;
      $(this).removeClass("background");
      $(this).children("img").remove();

      if (newGame.player === "Player X") {
        newBoard.spaces[newGame.spaceLocation].playerMark = ('Player X');
        $(this).append("<img src='img/red-x.png'>");
      } else {
        newBoard.spaces[newGame.spaceLocation].playerMark = ('Player O');
        $(this).append("<img src='img/blue-circle.png'>");
      }
      newGame.turnCounter += 1

      if (newBoard.gameOver() === "Cats Game!") {
        alert("Cat's Game!");
      } else if (newBoard.gameOver()) {
        alert(newGame.player + " wins!");
      }
      if ((newGame.aiLevel) && (newGame.turnCounter % 2 === 1) && (newBoard.gameOver() == false)) {
        var randomPick = Math.floor((Math.random() * 9));
        while (newBoard.spaces[randomPick].clickable != true) {
          randomPick = Math.floor((Math.random() * 9));
        }
        if ((newGame.aiLevel === "hard") && (newGame.turnCounter % 2 === 1) && (newBoard.gameOver() == false)) {
            randomPick = newBoard.bestAvailable();
          if (newBoard.preventFork()) {
            randomPick = newBoard.preventFork();
          }
          if (newBoard.canIBlock()) {
            randomPick = newBoard.canIBlock()-1;
          }

            if (newBoard.canIWin()) {
              randomPick = newBoard.canIWin()-1;
            }
        }
        $('#' + randomPick).trigger("click");
      }

    };
  });

  $('#easy').click(function() {
    newGame.aiLevel = "easy";
  });

  $('#hard').click(function() {
    newGame.aiLevel = "hard";
  });

  $('#resetAI').click(function() {
    newGame.aiLevel = false;
  });

  $('#reset').click(function() {
    newBoard.reset();
    for (var i = 0; i < 9; i++) {
      $("#" + i).children("img").remove();
      $("#" + i).append("<img src='img/background.gif'>")
      $("#" + i).addClass("background");
      newGame.turnCounter = 0;
    }
  });
});
