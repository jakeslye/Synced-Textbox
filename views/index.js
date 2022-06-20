var socket = io();

socket.emit('get');

$('#text').on('change keyup paste', function() {
  socket.emit('write', $("#text").val()); 
});


socket.on('update', function(msg) {
  $("#text").val(msg);
});
