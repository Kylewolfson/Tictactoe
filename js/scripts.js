//Business Logic
function Square (playerMark, xcoordinate, ycoordinate, clickable) {
  this.playerMark = playerMark;
  this.xcoordinate = xcoordinate;
  this.ycoordinate = ycoordinate;
  this.clickable = clickable;
}

var playerCounter = 0
playerPicker = function() {
  if (playerCounter%2 === 0) {
    return("playerX")
  } else
    return("playerO")
  }


function Board () {
  this.spaces = [];
}
var newBoard = new Board();

var xcoordinate = [1, 2, 3];
var ycoordinate = [1, 2, 3];

var board = new Board();

//Pushes new Squares into array spaces with playerMark = false and both coordinates
Board.prototype.reset = function() {
  newBoard.spaces = [];
  for (var y = 1; y <= 3; y++) {
    for (var x = 1; x <= 3; x++) {
      var newSquare = new Square (false, x, y, true);
      newBoard.spaces.push(newSquare);
    }
  }
};

Board.prototype.gameOver = function() {
  if ((newBoard.spaces[0].playerMark) && (newBoard.spaces[0].playerMark) === (newBoard.spaces[1].playerMark) && (newBoard.spaces[0].playerMark) === (newBoard.spaces[2].playerMark)) {
    return true;
  } else if ((newBoard.spaces[3].playerMark) && (newBoard.spaces[3].playerMark) === (newBoard.spaces[4].playerMark) && (newBoard.spaces[3].playerMark) === (newBoard.spaces[5].playerMark)) {
    return true;
  } else if ((newBoard.spaces[6].playerMark) && (newBoard.spaces[6].playerMark) === (newBoard.spaces[7].playerMark) && (newBoard.spaces[6].playerMark) === (newBoard.spaces[8].playerMark)) {
    return true;
  } else if ((newBoard.spaces[0].playerMark) && (newBoard.spaces[0].playerMark) === (newBoard.spaces[3].playerMark) && (newBoard.spaces[0].playerMark) === (newBoard.spaces[6].playerMark)) {
    return true;
  } else if ((newBoard.spaces[1].playerMark) && (newBoard.spaces[1].playerMark) === (newBoard.spaces[4].playerMark) && (newBoard.spaces[1].playerMark) === (newBoard.spaces[7].playerMark)) {
    return true;
  } else if ((newBoard.spaces[2].playerMark) && (newBoard.spaces[2].playerMark) === (newBoard.spaces[5].playerMark) && (newBoard.spaces[2].playerMark) === (newBoard.spaces[8].playerMark)) {
    return true;
  } else if ((newBoard.spaces[0].playerMark) && (newBoard.spaces[0].playerMark) === (newBoard.spaces[4].playerMark) && (newBoard.spaces[0].playerMark) === (newBoard.spaces[8].playerMark)) {
    return true;
  } else if ((newBoard.spaces[2].playerMark) && (newBoard.spaces[2].playerMark) === (newBoard.spaces[4].playerMark) && (newBoard.spaces[2].playerMark) === (newBoard.spaces[6].playerMark)) {
    return true;
  } else if (playerCounter === 9) {
    return "Cats Game!";
  } else {
    return false;
  }
}

newBoard.reset();

Square.prototype.markX = function() {
  this.boardSquare
}

Square.prototype.markO = function() {
}

//User Interface
$(function() {
  $('.background').click(function() {
    // if (newBoard.spaces.clickable === true) {
      var spaceLocation = $(this).attr("id");
      $(this).removeClass("background");
      $(this).children("img").remove();
      var player = playerPicker();
      if (player === "playerX") {
        newBoard.spaces[spaceLocation].playerMark = ('playerX');
        $(this).append("<img src='img/red-x.png'>");
      } else {
        newBoard.spaces[spaceLocation].playerMark = ('playerO');
        $(this).append("<img src='img/blue-circle.png'>");
      }

      console.log(newBoard.spaces[spaceLocation].playerMark)

      playerCounter += 1
      if (newBoard.gameOver() === "Cats Game!") {
        alert("Cat's Game!");
      } else if (newBoard.gameOver()) {
        alert(player + " wins!");
      }

      console.log(newBoard.spaces[spaceLocation].playerMark)

      console.log(newBoard.gameOver());
    // }
  });
});