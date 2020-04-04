require('dotenv').config()

var zmq = require('zeromq'),
  worker = zmq.socket('pull')

worker.connect(process.env.OMQ_ADDRESS)
console.log('Worker connected to ' + process.env.OMQ_ADDRESS)

worker.on('message', function (msg) {
  console.log('work: %s', msg.toString())
})
