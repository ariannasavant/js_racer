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

  watch = new StopWatch();

  function updatePlayerPosition(player) {
    var oldPosition = $(player).find('.active');
    var currentPosition = oldPosition.next().addClass('active');
    oldPosition.removeClass('active');
  }

  function checkGameStatus() {
    var player1Position = $('#player1_track td');
    var player2Position = $('#player2_track td');
    var roundId = window.location.pathname.split("/")[2];

    if (player1Position.last().hasClass('active')) {
      $.post('/game/' + roundId, function(data) {
        watch.stop();
        $('.results').replaceWith(data);
        $('.container #time').append('<p>' + watch.time() + 's </p>');
        console.log(watch.time());
      });
      alert('player1 wins');
      $(document).unbind('keyup');
      // location.reload();
    } else if (player2Position.last().hasClass('active')) {
      $.post('/game/' + roundId, function(data) {
        watch.stop();
        $('.results').replaceWith(data);
        $('.container #time').append('<p>' + watch.time() + 's </p>');
        console.log(watch.time());
      });
      alert('player2 wins');
      $(document).unbind('keyup');
      // location.reload();
    }
  }

  function onKeyup(event) {
    if (event.keyCode === "P".charCodeAt(0)) {
      // var stopwatch1 = Stopwatch.new
      updatePlayerPosition('#player1_track');
    } else if (event.keyCode === "Q".charCodeAt(0)) {
      // var stopwatch2 = Stopwatch.new
      updatePlayerPosition('#player2_track');
    }
    checkGameStatus();
  }

  $(document).ready(function() {
    watch.start()
    $(document).on('keyup', onKeyup);
  });


})();
