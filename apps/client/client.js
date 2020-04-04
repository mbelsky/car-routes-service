var zmq = require('zeromq'),
  producer = zmq.socket('push')

producer.bindSync('tcp://127.0.0.1:3000')
console.log('Producer bound to port 3000')

let i = 0
while (i++ < 3) {
  setTimeout(function (i) {
    const msg = i + '. some work'
    console.log(msg)
    producer.send(msg)
  }, i * 500, i)
}
