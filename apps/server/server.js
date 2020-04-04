var zmq = require('zeromq'),
  worker = zmq.socket('pull')

worker.connect('tcp://127.0.0.1:3000')
console.log('Worker connected to port 3000')

worker.on('message', function (msg) {
  console.log('work: %s', msg.toString())
})
