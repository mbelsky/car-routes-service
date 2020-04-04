require('dotenv').config()

var zmq = require('zeromq'),
  producer = zmq.socket('push')

producer.bindSync(process.env.OMQ_ADDRESS)
console.log('Producer bound to ' + process.env.OMQ_ADDRESS)

let i = 0
while (i++ < 3) {
  setTimeout(
    function (i) {
      const msg = i + '. some work'
      console.log(msg)
      producer.send(msg)
    },
    i * 500,
    i,
  )
}
