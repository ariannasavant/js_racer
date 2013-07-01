function updatePlayerPosition(player) {
 var oldPosition = $(player).find('.active');
 var currentPosition = oldPosition.next().addClass('active');
 oldPosition.removeClass('active');
}

function checkGameStatus() {
  var player1Position = $('#player1_track td');
  var player2Position = $('#player2_track td');

  if (player1Position.last().hasClass('active')) {
    alert('player1 wins');
    location.reload();
  }
  else if (player2Position.last().hasClass('active')) {
    alert('player2 wins');
    location.reload();
  }
}

// handle the keyup event
function onKeyup(event) {
  // 1. check to see if game is over

  // 2. if it is, do whatever happens when it's over (display a message, etc.)
  // 3. if it's not, update the board with the current player positions
  // 4. blah blah 

  // if event.keyCode === 81 >>> q >>> player 1
  // if event.keyCode === 80 >>> p >>> player 2
  if (event.keyCode === "P".charCodeAt(0)) {
    updatePlayerPosition('#player1_track');
  }
  else if (event.keyCode === "Q".charCodeAt(0)){
    updatePlayerPosition('#player2_track');
  }    
  checkGameStatus();
  // Detect which key was pressed and call the appropriate function
  // Google "jquery keyup what key was pressed" if you don't know how
}

$(document).ready(function() {
  $(document).on('keyup', onKeyup);
});

