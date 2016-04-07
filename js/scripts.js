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

var aiLevel = "hard";
var playerCounter = 0
playerPicker = function() {
  if (playerCounter%2 === 0) {
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

// Board.prototype.checkBoard = function() {
//   for (var i = 0; i < newBoard.spaces.length; i++) {
//     for (var c = 0; c < winningArrays.length; c++) {
//       if ()
//         if ((newBoard.spaces[i] === winningArrays[c][0]) || (newBoard.spaces[i] === winningArrays[c][0]) || (newBoard.spaces[i] === winningArrays[c][0])) {
//           if ()
//           computerStrategy = winningArrays[i];
//       }
//     }
//   }
// }

Board.prototype.bestAvailable = function() {
  if (newBoard.spaces[4].playerMark === false) {return 4}
  if (newBoard.spaces[0].playerMark === false) {return 0}
  if (newBoard.spaces[2].playerMark === false) {return 2}
  if (newBoard.spaces[6].playerMark === false) {return 6}
  if (newBoard.spaces[8].playerMark === false) {return 8}

}
Board.prototype.preventFork = function() {
  if (playerCounter === 3) {
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
    if ((winningSpaces === 2) && (emptySpaces === 1)) {return emptySpace}
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
    if ((winningSpaces === 2) && (emptySpaces === 1)) {return emptySpace}
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
  if (playerCounter === 9) {
    return "Cats Game!";
  } else {
    return false;
  }
}



// var xcoordinate = [1, 2, 3];
// var ycoordinate = [1, 2, 3];

// Square.prototype.markX = function() {
//   this.boardSquare
// }

// Square.prototype.markO = function() {
// }


//User Interface
$(function() {
  $('.background').click(function() {
    var spaceLocation = $(this).attr("id");
    var player = playerPicker();
    if (newBoard.spaces[spaceLocation].clickable) {
      newBoard.spaces[spaceLocation].clickable = false;
      $(this).removeClass("background");
      $(this).children("img").remove();

      if (player === "Player X") {
        newBoard.spaces[spaceLocation].playerMark = ('Player X');
        $(this).append("<img src='img/red-x.png'>");
      } else {
        newBoard.spaces[spaceLocation].playerMark = ('Player O');
        $(this).append("<img src='img/blue-circle.png'>");
      }
      playerCounter += 1

      if (newBoard.gameOver() === "Cats Game!") {
        alert("Cat's Game!");
      } else if (newBoard.gameOver()) {
        alert(player + " wins!");
      }
      if ((aiLevel) && (playerCounter % 2 === 1) && (newBoard.gameOver() == false)) {
        var randomPick = Math.floor((Math.random() * 9));
        while (newBoard.spaces[randomPick].clickable != true) {
          randomPick = Math.floor((Math.random() * 9));
        }
        if ((aiLevel === "hard") && (playerCounter % 2 === 1) && (newBoard.gameOver() == false)) {
          debugger;
            randomPick = newBoard.bestAvailable();
          if (newBoard.preventFork()) {
            randomPick = newBoard.preventFork();
          }
          if (newBoard.canIBlock()) {
            randomPick = newBoard.canIBlock();
          }

            if (newBoard.canIWin()) {
              randomPick = newBoard.canIWin();
            }
        }
        $('#' + randomPick).trigger("click");
      }

    };
  });

  $('#easy').click(function() {
    aiLevel = "easy";
  });

  $('#resetAI').click(function() {
    aiLevel = false;
  });

  $('#reset').click(function() {
    newBoard.reset();
    for (var i = 0; i < 9; i++) {
      $("#" + i).children("img").remove();
      $("#" + i).append("<img src='img/background.gif'>")
      $("#" + i).addClass("background");
      playerCounter = 0;
    }
  });
});
