(function() {

  function StopWatch() {
    this.startTime = 0;
    this.elapsedTime = 0;
  }

  StopWatch.prototype.start = function() {
    this.startTime = new Date().getTime();
  };

  StopWatch.prototype.stop = function() {
    this.elapsedTime = new Date().getTime() - this.startTime;
  };

  StopWatch.prototype.time = function() {
    return this.elapsedTime / 1000;
  };


  function Player(name, track, keyCode) {
    this.name = name;
    this.track = track;
    this.position = 0;
    this.key = keyCode.charCodeAt(0);
  }

  Player.prototype.isMovedBy = function(keyCode) {
    return this.key === keyCode;
  };

  Player.prototype.moveForward = function() {
    var oldPosition = this.track.find('.active');
    oldPosition.removeClass('active');
    var nextPosition = oldPosition.next();
    nextPosition.addClass('active');
    this.position++;
  };

  Player.prototype.atEndOfTrack = function() {
    return this.position === this.track.find('td').length;
  };

  function Game(players) {
    this.players = players;
  }

  Game.prototype.finished = function() {
    var finished = false;
    var game = this;
    $.each(this.players, function(k, player) {
      if (player.atEndOfTrack()) {
        game.winner = player;
        finished = true;
      }
    });
    return finished;
  };

  Game.prototype.advancePlayer = function(keyCode) {
    if (this.finished()) { return; }
    $.each(this.players, function(k, player){
      if (player.isMovedBy(keyCode)) {
        player.moveForward();
      }
    });
  };

  $(document).ready(function() {
    var player1 = new Player('player1', $('#player1_track'), 'P');
    var player2 = new Player('player2', $('#player2_track'), 'Q');
    var game = new Game([player1, player2]);

    watch = new StopWatch();
    watch.start();

    function onKeyUp(e) {
      game.advancePlayer(e.keyCode);
      if (game.finished()) {
        watch.stop();
        $('.results').show();
        $('#time').text(watch.time());
      }
    }
    $(document).on('keyup', onKeyUp);
  });


})();
