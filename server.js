
'use strict'

var fs = require('fs')
var http = require('http')
var socketIo = require('socket.io')

var attachSocketIo = function(server) {
  var ioServer = socketIo.listen(server)

  ioServer.sockets.on('connection', function(socket) {
    console.log('new socket.io connection')
    
    var writeStream = null
    var getWriteStream = function() {
      if(writeStream) return writeStream

      var filepath = 'upload/' + new Date() + '.raw'
      console.log('saving to', filepath)
      writeStream = fs.createWriteStream(filepath)
      return writeStream
    }

    var endWriteStream = function() {
      if(!writeStream) return

      writeStream.end()
      writeStream = null
    }

    socket.on('data', function(floatArray) {
      var writeStream = getWriteStream()

      var arrayLength = Object.keys(floatArray).length

      var buffer = new Buffer(8*arrayLength)
      for(var i=0; i<arrayLength; i++) {
        buffer.writeDoubleLE(floatArray[i], i*8)
      }
      writeStream.write(buffer)
    })

    socket.on('end', function() {
      console.log('upload ended')
      endWriteStream()
    })

    socket.on('error', function(err) {
      console.log('socket error:', err)
      endWriteStream()
    })
  })
}

var handler = function(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })

  fs.createReadStream('page.html').pipe(response)
}

var server = http.createServer(handler)
attachSocketIo(server)

server.listen(8080)