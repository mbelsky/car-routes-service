module.exports = {
  moving: {
    name: 'Moving',
    requestInterval: parseInt(process.env.MOVING_REQUEST_INTERVAL, 10) || 5000,
  },
  parking: {
    name: 'Parking',
    requestInterval:
      parseInt(process.env.PARKING_REQUEST_INTERVAL, 10) || 30000,
  },
}
