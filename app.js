var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function getRoom(socket, obj) {
  socket.get('room', function(err, $room) {
    obj.room = $room;
  });
  return obj;
}

app.get('/', function(req, res){
  var items = []; 
  if (req.query.items) {
    items = req.query.items.split(',');
  }
  res.render('demo.ejs', { items: items });
});

app.get('/src/rouletteWheel.js', function(req, res){
  res.sendFile(__dirname + '/src/rouletteWheel.js');
});

app.get('/jquery-ui.min.js', function(req, res){
  res.sendFile(__dirname + '/jquery-ui.min.js');
});

app.get('/img/:filename', function(req, res){
  res.sendFile(__dirname + '/img/' + req.params.filename);
});

io.on('connection', function(socket){
  socket.on('command', function(msg){
    io.emit('command', msg);
  });
  socket.on('init', function(msg){
    var room = 'my room';
    socket.join(room);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

