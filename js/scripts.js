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
      if ((playerCounter % 2 === 1) && (newBoard.gameOver() == false)){
        var randomPick = Math.floor((Math.random() * 9));
        while (newBoard.spaces[randomPick].clickable != true) {
          randomPick = Math.floor((Math.random() * 9));
        }
        $('#' + randomPick).trigger("click");
      }
    };
  });



  $('.btn').click(function() {
    newBoard.reset();
    for (var i = 0; i < 9; i++) {
      $("#" + i).children("img").remove();
      $("#" + i).append("<img src='img/background.gif'>")
      $("#" + i).addClass("background");
      playerCounter = 0;
    }

  });
});
