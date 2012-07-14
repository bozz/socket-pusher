var socket = io.connect('http://localhost:8080');
socket.on('time', function (data) {
  $('#berlin-time').html(data.berlin);
  // console.log(data.berlin);
  // socket.emit('my other event', { my: 'data' });
});
